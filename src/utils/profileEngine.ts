import crypto from "node:crypto";
import type { SocialLink } from "../data/profileData";
import type { Email } from "../data/profileData";

export interface PartitionedLinks {
  professional: SocialLink[];
  creative: SocialLink[];
}

/**
 * Partitions raw profile links into distinct categories for frontend tabs
 */
export function partitionLinks(links: SocialLink[]): PartitionedLinks {
  return {
    professional: links.filter((link) => link.category === "professional"),
    creative: links.filter((link) => link.category === "creative"),
  };
}

/**
 * Generates a secure, clean Gravatar URL from an email address
 */
export function getGravatarUrl(email: string, size = 200): string {
  const cleanedEmail = email.trim().toLowerCase();
  const hash = crypto.createHash("md5").update(cleanedEmail).digest("hex");

  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=retro`;
}

/**
 * Automatically finds the primary email from the profile dataset and hashes it for Gravatar
 */
/**
 * High-level orchestrator: Safe pipeline extracting the primary email object
 */
export function getProfileGravatar(emails: Email[], size = 300): string {
  const primaryEmail = emails.find((e) => e.primary) || emails[0];

  if (!primaryEmail) {
    // Return standard empty hash default if array is empty
    return `https://www.gravatar.com/avatar/00000000000000000000000000000000?s=${size}&d=retro`;
  }

  // Beautiful reuse of your low-level engine function
  return getGravatarUrl(primaryEmail.address, size);
}
