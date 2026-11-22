---
title: Your Post Title
description: One or two sentences shown on the blog list, in search results and in link previews.
date: 2026-11-22
updated: 2026-11-23
tags: [Next.js, AWS, System Design]
keywords: [search phrases people type, another phrase]
about: [Main topic, Product or technology, CVE-2026-12345]
featured: false
cover: /blog/your-cover-image.jpg
draft: true
---

<!--
  How to add a post:
  1. Copy this file into src/components/blogdata/ and rename it, e.g. `aws-rds-migration.md`.
     The file name becomes the URL: /blog/aws-rds-migration
  2. Fill in the frontmatter above. Only `title`, `description` and `date` (YYYY-MM-DD) are required.
     `updated`, `tags`, `keywords` and `cover` are optional. Put cover images in /public/blog/.
     Tags show on the post; keywords are only used for search engines. `about` lists the
     things the post is about for search engines (CVE ids link to their official record).
     `featured: true` pins a post to the top of the blog, the home page and llms.txt.
  3. Remove `draft: true` (or set it to false) when the post is ready to go live.

  Every `##` heading gets a link and appears in the "On this page" box (shown when there are 3+).
  A `## Frequently asked questions` section with `###` questions (see the bottom of this file) is
  also published as FAQ structured data, which helps Google and AI assistants quote your answers.

  Files that start with `_`, like this one, are never published.
-->

Write the post in normal Markdown below the frontmatter.

## A section heading

Regular paragraphs, **bold**, _italic_, `inline code` and [links](https://example.com) all work.

- Bullet lists
- work too

1. So do
2. numbered lists

> Blockquotes for callouts.

```js
// Fenced code blocks
console.log("hello");
```

| Tables | are | supported |
| ------ | --- | --------- |
| a      | b   | c         |

![Image alt text](/blog/your-image.jpg)

## Frequently asked questions

### Write each question as a heading?

Yes. Put the answer in plain sentences right below it.
