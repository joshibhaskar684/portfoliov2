import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

// Icon for each entry in `socialProfiles` (src/components/data/siteData.js), keyed by id.
export const socialIcons = {
  linkedin: FaLinkedin,
  github: FaGithub,
  leetcode: SiLeetcode,
  twitter: FaXTwitter,
  instagram: FaInstagram,
};

// "https://www.linkedin.com/in/name/" -> "linkedin.com/in/name"
export const displayUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
