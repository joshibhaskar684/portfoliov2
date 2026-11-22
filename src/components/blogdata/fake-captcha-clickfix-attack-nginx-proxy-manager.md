---
title: Fake CAPTCHA on Our Website: Tracing a ClickFix Attack to an Nginx CVE
description: Our staging site suddenly showed a fake CAPTCHA. Here's how we traced the ClickFix attack to an unpatched Nginx Proxy Manager (CVE-2026-123007) and fixed it.
date: 2026-11-22
tags: [Security, Nginx, DevOps, Incident Response]
featured: true
about: [ClickFix, Nginx, Nginx Proxy Manager, OpenResty, HTTP/2, CVE-2026-123007, CVE-2026-123633]
keywords: [ClickFix attack, fake CAPTCHA on website, verify you are human malware, website hacked fake captcha, Nginx Proxy Manager hacked, Nginx Proxy Manager vulnerability, nginx HTTP/2 vulnerability, CVE-2026-123007, CVE-2026-123633, OpenResty vulnerability, malicious script injected into website, reverse proxy compromised, Docker latest tag not updating]
---

> **TL;DR:** One day our staging website started showing a fake "verify you are human" CAPTCHA. It was a **ClickFix attack**, a page that tricks visitors into running malware on their own computer. The app itself was clean: the fake page kept loading even after we stopped the app container. The malicious content was coming from our reverse proxy, an **Nginx Proxy Manager** container running an outdated nginx (OpenResty 1.27.1.2) with HTTP/2 turned on, which is vulnerable to **CVE-2026-123007** and **CVE-2026-123633**. We upgraded the proxy, rotated credentials and changed how we keep it patched. This post covers how we found it and how you can check your own server.

I'm writing this because when it happened to us, most search results about fake CAPTCHA pages were written for the people being tricked, not for the developers whose site was serving the page. If your site is suddenly showing a CAPTCHA you never added, this is for you.

## What happened

We were shipping changes to our staging environment the way we always do. Nothing unusual in the pipeline, nothing new in the code.

Then one day we opened the staging site and, instead of our app, got a CAPTCHA screen asking us to verify that we were human. We had never added a CAPTCHA to that site.

Opening the browser's DevTools made it clear something was wrong:

- The **Network** tab showed our page making requests to domains we didn't own.
- The HTML being rendered wasn't our build output at all.
- The "verification" asked the visitor to press keys on their keyboard instead of clicking images.

That last point is the signature of a ClickFix attack.

## What is a ClickFix attack?

A ClickFix attack is a social-engineering trick that uses a fake CAPTCHA, browser error or "fix this problem" prompt to get visitors to run a malicious command themselves.

It usually works like this:

1. The page shows a convincing "I'm not a robot" check.
2. When you click it, JavaScript on the page silently copies a command to your clipboard.
3. The page then tells you to "verify" by pressing **Windows + R**, then **Ctrl + V**, then **Enter** (on macOS, it asks you to paste into Terminal).
4. The pasted command is usually a PowerShell or `mshta` one-liner that downloads and runs malware. It's often padded with harmless-looking text like "I am not a robot" so it looks safe in the Run box.

The malware is commonly an **infostealer** that grabs saved passwords, browser cookies and session tokens, and crypto wallets. Because the victim runs the command themselves, the browser's download warnings never fire.

**A real CAPTCHA never asks you to open the Run dialog, a terminal or PowerShell.** If you see that on any site, close the tab.

For a site owner, this is about as bad as it gets: your domain, which your users trust, is being used to infect them.

## Step 1: Contain it and save the evidence

The first priority was to stop serving the page to anyone. We stopped the container that runs the staging app, but **saved its logs first**. When you remove a container, its logs go with it, and you lose the trail.

If you're in the same situation, this is roughly what that looks like:

```bash
# Find the app container
docker ps

# Save its logs, with timestamps, before touching anything
docker logs --timestamps <app-container> > app-container.log 2>&1

# Then stop it
docker stop <app-container>
```

We then went through the saved logs to trace what had been requested and when.

## Step 2: The clue that changed everything

After stopping the app container, we reloaded the staging URL expecting a `502 Bad Gateway`.

**The fake CAPTCHA still loaded.**

That one observation told us more than the logs did. If the page is still being served after the app is gone, the malicious HTML isn't coming from the app. It's coming from something in front of it.

Our setup looked like this:

```text
Visitor ──HTTPS──▶ Nginx Proxy Manager (ports 80 / 443) ──▶ App container
                          ▲
                          └── the fake CAPTCHA was being served from here
```

Every request passes through the reverse proxy first. If an attacker controls the proxy, they can inject a script into, or completely replace, any page on any domain behind it, and nothing in your repository, CI pipeline or app container will show it. Redeploying the app does nothing.

> **Quick test you can run:** compare what your app returns directly on the server with what the public URL returns. If the app's own output is clean but the public page isn't, the problem is between the internet and your app.

```bash
# On the server: ask the app directly (use your app's port)
curl -s http://127.0.0.1:3000 | head -40

# From your laptop: ask through the proxy
curl -s https://your-site.com | head -40
```

## Step 3: Inspecting Nginx Proxy Manager

Our proxy is [Nginx Proxy Manager](https://nginxproxymanager.com/) (NPM), running in Docker. This is the `docker-compose.yml` we were using:

```yaml
services:
  npm:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      - '80:80'
      - '443:443'
      - '127.0.0.1:81:81'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
```

One thing we had done right: the admin panel on port `81` was bound to `127.0.0.1`, so it was never reachable from the internet. But ports `80` and `443` are public, which is the whole point of a reverse proxy, and that's where the attack surface was.

We logged into the VPS and checked the proxy container. Our container is called `proxy-npm-1`, because Docker Compose names it after the folder and the service; yours will probably differ.

### Which nginx version is running?

```bash
docker exec proxy-npm-1 nginx -v
# nginx version: openresty/1.27.1.2
```

NPM uses **OpenResty**, which bundles nginx. OpenResty's version number starts with the nginx version it's built on, so `1.27.1.2` means **nginx 1.27.1**. That's well behind the nginx releases that fix the two HTTP/2 bugs below: **1.30.7** (stable) and **1.31.9** (mainline).

### Is HTTP/2 turned on?

Both vulnerabilities need HTTP/2, so this was the next question:

```bash
docker exec proxy-npm-1 nginx -T 2>&1 | grep -i "http2"
```

It was enabled on most of our proxy hosts. To see which domains, print a few lines of context around each match:

```bash
docker exec proxy-npm-1 nginx -T 2>&1 | grep -B 8 -A 8 "http2 on"
```

Each match looked like this (domain replaced):

```nginx
listen 443 ssl;
listen [::]:443 ssl;
server_name staging.example.com;
http2 on;
```

### Which NPM version and image?

```bash
docker exec proxy-npm-1 sh -c 'cat /app/package.json | grep version'
#   "version": "2.14.0",

docker compose images
# CONTAINER     REPOSITORY                 TAG      ...  SIZE    CREATED
# proxy-npm-1   jc21/nginx-proxy-manager   latest   ...  389MB   9 months ago
```

### What we found

| Component    | What we had                                |
| ------------ | ------------------------------------------ |
| Docker image | `jc21/nginx-proxy-manager:latest`          |
| NPM version  | 2.14.0                                     |
| OpenResty    | 1.27.1.2 (nginx 1.27.1)                    |
| HTTP/2       | Enabled on most domains                    |
| HTTPS        | Public on port 443                         |
| Image age    | About 9 months, never pulled again         |

The proxy was the only component still serving traffic while the fake page was live, and it was running an internet-facing nginx with HTTP/2 enabled, in the vulnerable range for two serious bugs. We concluded the attacker got in through the proxy.

## The vulnerabilities: CVE-2026-123007 and CVE-2026-123633

Both bugs are in nginx's HTTP/2 code and were disclosed on November 18, 2026. They're fixed in **nginx 1.30.7** and **1.31.9**.

| CVE                | Type                               | What an attacker needs                                              | Affected nginx      |
| ------------------ | ---------------------------------- | ------------------------------------------------------------------- | ------------------- |
| **CVE-2026-123007** | HTTP/2 memory corruption           | HTTP/2 enabled                                                       | 1.9.5 – 1.31.8      |
| **CVE-2026-123633** | HTTP/2 use-after-free when proxying | HTTP/2 enabled **and** nginx proxying requests to a backend          | 1.19.7 – 1.31.8     |

### CVE-2026-123007: HTTP/2 memory corruption

**In simple terms:** nginx miscalculates how much data it's allowed to receive on an HTTP/2 connection, and a crafted request can make it write past the end of a memory buffer.

1. The attacker sends specially crafted HTTP/2 traffic.
2. nginx processes it incorrectly and corrupts its own memory.
3. At best, the nginx worker crashes. At worst, the attacker gets code running inside the worker. Security researchers have shown that remote code execution is possible.

### CVE-2026-123633: HTTP/2 use-after-free

**In simple terms:** nginx frees a piece of memory and then keeps using it.

1. The attacker sends crafted HTTP/2 traffic to an nginx that is proxying requests to a backend.
2. nginx releases a memory object but later accesses it again.
3. This can crash the worker, corrupt memory, or potentially lead to code execution.

The important part for anyone running **Nginx Proxy Manager, OpenResty, Ingress NGINX on Kubernetes, or any nginx reverse proxy**: a reverse proxy is exactly the configuration both bugs need. If you have HTTP/2 on and an older nginx, treat yourself as exposed.

## Why the `latest` tag didn't keep us safe

We used `jc21/nginx-proxy-manager:latest` and assumed that meant we were up to date. It doesn't.

- `latest` is resolved **once**, when the image is pulled.
- `restart: unless-stopped` restarts the **same old image** after a reboot or crash. It never downloads a new one.
- Nothing updates until someone runs `docker compose pull`.

Our "latest" image was nine months old. The fix had been released, but we were still running code from before it existed.

## Step 4: The fix — upgrade Nginx Proxy Manager

Back up NPM's data first. The `data` folder holds its database and proxy host configs, and `letsencrypt` holds your certificates.

```bash
cd /path/to/your/npm   # the folder with docker-compose.yml

# Back up config and certificates
tar czf npm-backup-$(date +%F).tar.gz data letsencrypt

# Pull the new image and recreate the container from it
docker compose pull
docker compose up -d --force-recreate

# Confirm what's running now
docker exec proxy-npm-1 nginx -v
docker compose images
```

`--force-recreate` throws away the old container's filesystem and starts fresh from the new image. If anything was planted inside the old container, outside the mounted `data` and `letsencrypt` folders, it's gone.

**Check that the new image actually contains the fix.** NPM ships OpenResty, which can take time to pick up upstream nginx fixes. Read the [Nginx Proxy Manager release notes](https://github.com/NginxProxyManager/nginx-proxy-manager/releases) and confirm the release mentions these CVEs or bundles nginx 1.30.7 / 1.31.9 or newer. Also read the notes before a big jump: v2.15, for example, moved to a Debian 13 base image and warned that some DNS plugins might need changes.

### Stopgap if a patched image isn't available yet: turn off HTTP/2

Both CVEs need HTTP/2, so disabling it closes them until you can patch:

1. Open the NPM admin panel and go to **Hosts → Proxy Hosts**.
2. For **every** host, click **Edit** and open the **SSL** tab.
3. Switch off **HTTP/2 Support** and save.

Then confirm nothing has it enabled:

```bash
docker exec proxy-npm-1 nginx -T 2>&1 | grep -c "http2 on"
# should print 0

curl -sI https://your-site.com | head -1
# should show HTTP/1.1, not HTTP/2
```

Your sites will be slightly slower over HTTP/1.1, but they'll keep working.

## Step 5: Clean up and rotate credentials

Patching closes the door, but an attacker who was inside may have left things behind or taken secrets with them. We rotated the site's credentials and went through the server. Here's the checklist we recommend:

**Rotate secrets**

- [ ] Nginx Proxy Manager admin password, and remove any admin users you don't recognise
- [ ] SSH keys and passwords for the server
- [ ] Database passwords
- [ ] API keys, tokens and secrets in `.env` files on that server
- [ ] Any credentials for third-party services the server could reach

**Look for anything the attacker left in the proxy**

```bash
# Search the live nginx config for injected scripts, rewrites or unknown upstreams
docker exec proxy-npm-1 nginx -T 2>&1 | grep -nE "sub_filter|<script|return 200|proxy_pass"

# Files changed inside the container compared with its image
docker diff proxy-npm-1

# Recently modified files in NPM's data folder
find ./data -type f -mtime -14 -ls
```

In the NPM panel, also check every proxy host's **Advanced** tab (custom nginx configuration), plus any **Redirection Hosts** and **Streams** you didn't create.

**Check the server itself**

```bash
last -a | head -20                 # recent logins
cat ~/.ssh/authorized_keys         # unknown SSH keys
crontab -l; ls /etc/cron.*         # unknown scheduled jobs
```

If you find signs the attacker reached the host itself (not just the container), the safest option is to rebuild the server from a clean image and restore only your data.

## Step 6: Verify every site behind the proxy

A reverse proxy usually fronts many sites, and **every domain behind it was exposed**, not just the one you noticed. For each domain:

- Load it in a private window with DevTools open and check the **Network** tab for requests to domains you don't own.
- Compare the HTML against what the app returns directly (the `curl` test from Step 2).
- Search the page source for `<script` tags you didn't write.

## How to check if your server is affected

If you run nginx, OpenResty or Nginx Proxy Manager, these five checks take about two minutes:

1. **Check the version:** `nginx -v`. On NPM, run `docker exec <container> nginx -v`. Anything below nginx 1.30.7 (stable) or 1.31.9 (mainline) is vulnerable. For OpenResty, the first three numbers are the nginx version.
2. **Check HTTP/2:** `nginx -T | grep "http2 on"`. If it matches, you meet the main condition for both CVEs.
3. **Check your image's age:** `docker compose images`. If the image is months old, a `latest` tag isn't protecting you.
4. **Check what your users actually get:** compare the public page with the app's direct output.
5. **Patch or mitigate today:** upgrade to a release with the fix, or turn off HTTP/2 until you can.

## Lessons learned

- **The reverse proxy is part of your application.** We patched our app dependencies regularly and forgot about the component every request goes through first.
- **`latest` is not an update strategy.** Pin a specific version (`jc21/nginx-proxy-manager:<version>`), and update it on purpose. Watch the project's GitHub releases (**Watch → Custom → Releases**) so you hear about security fixes.
- **Stop the app to find the culprit.** Stopping one layer and checking whether the problem survives is the fastest way to locate an injection.
- **Save logs before you tear anything down.** Evidence disappears with the container.
- **Keep admin panels private.** Binding NPM's port 81 to `127.0.0.1` meant one less door for the attacker.
- **Monitor content, not just uptime.** An uptime check said our site was "up" the whole time. A keyword monitor (Uptime Kuma and UptimeRobot both have one) that checks for text only your real page contains would have caught it sooner.

## If you ran the command from a fake CAPTCHA

If you visited a site like this and followed its instructions:

1. Disconnect the computer from the internet.
2. Run a full scan with up-to-date antivirus, such as Microsoft Defender's offline scan.
3. **From a different, clean device,** change your passwords, starting with email, banking and work accounts, and sign out of all sessions.
4. Turn on two-factor authentication wherever you can.
5. If you use crypto wallets on that computer, move funds to a new wallet created on a clean device.
6. If it was a work computer, tell your IT or security team right away.

## Frequently asked questions

### What is a ClickFix attack?

A ClickFix attack is a social-engineering technique where a website shows a fake CAPTCHA or error message, secretly copies a malicious command to the visitor's clipboard, and tells them to paste it into the Windows Run dialog or a terminal. When the visitor does, malware such as an infostealer is downloaded and run on their computer.

### Why is my website suddenly showing a fake "verify you are human" CAPTCHA?

If you never added a CAPTCHA, an attacker has injected content into your site. It may come from your application code, a compromised dependency or plugin, or something in front of your app, such as a reverse proxy or CDN. Stop your app and reload the page: if the fake CAPTCHA still appears, the injection is happening in your proxy, not your app.

### How do I check if my Nginx is vulnerable to CVE-2026-123007?

Run nginx -v (or docker exec with nginx -v for a container) and check whether HTTP/2 is enabled with nginx -T piped to grep for "http2 on". Open-source nginx from 1.9.5 through 1.31.8 is affected when HTTP/2 is on. The fix is in nginx 1.30.7 (stable) and 1.31.9 (mainline).

### Is Nginx Proxy Manager affected by CVE-2026-123007 and CVE-2026-123633?

Nginx Proxy Manager bundles OpenResty, which is built on nginx, so an NPM image with an nginx core older than 1.30.7 or 1.31.9 and HTTP/2 enabled on proxy hosts is exposed to both. A reverse proxy meets the conditions for both bugs. Upgrade to a release that includes the fix, or disable HTTP/2 Support on every proxy host until you can.

### Does disabling HTTP/2 protect against these nginx CVEs?

Yes. Both CVE-2026-123007 and CVE-2026-123633 are in nginx's HTTP/2 code, so turning HTTP/2 off on every server block closes them as a temporary measure. It does not fix other nginx vulnerabilities, so you still need to upgrade.

### Why didn't the Docker latest tag keep Nginx Proxy Manager updated?

The latest tag is resolved only when an image is pulled. Restarting a container, even with restart: unless-stopped, reuses the image already on the server. You need to run docker compose pull and recreate the container to get a newer version.

### My app container is stopped but the malicious page still loads. Why?

Because the page isn't coming from your app. Something in front of it, usually a reverse proxy like Nginx Proxy Manager, Traefik or a CDN, is serving or injecting the content. Inspect that layer's configuration, version and container for changes.

## References

- [nginx security advisories](https://nginx.org/en/security_advisories.html)
- [CVE-2026-123007 record](https://www.cve.org/CVERecord?id=CVE-2026-123007)
- [CVE-2026-123633 record](https://www.cve.org/CVERecord?id=CVE-2026-123633)
- [oss-security announcement (November 18, 2026)](https://www.openwall.com/lists/oss-security/2026/11/18/16)
- [Nginx Proxy Manager releases](https://github.com/NginxProxyManager/nginx-proxy-manager/releases)
