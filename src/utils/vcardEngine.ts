// src/utils/vcardEngine.ts
import type { ProfileData } from "../data/profileData";

/**
 * Converts profile data into a standard vCard 3.0 string compliant with mobile address books
 * Accepts a dynamic site origin string to prevent hardcoded URL drift across test/prod stages.
 */
export function generateVCardString(
  profile: ProfileData,
  siteOrigin: string
): string {
  const primaryEmail =
    profile.emails.find((e) => e.primary)?.address ||
    profile.emails[0]?.address ||
    "";
  const githubLink =
    profile.links.find((l) => l.platform.toLowerCase() === "github")?.url || "";

  // Format the primary site URL cleanly, stripping trailing slashes if present
  const cleanSiteUrl = siteOrigin.replace(/\/$/, "");

  // Map structured fields carefully to ensure pristine mobile sorting index alignment
  const {
    lastName,
    firstName,
    middleName = "",
    prefix = "",
    suffix = "",
  } = profile.structuredName;

  // vCard 3.0 spec format for N: Family;Given;Additional/Middle;Prefix;Suffix
  const structuredNameValue = `${lastName};${firstName};${middleName};${prefix};${suffix}`;

  // vCard text requires specific line endings (\r\n) and escaping
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${structuredNameValue}`, // Behind-the-scenes breakdown for machine sorting/filtering
    `FN:${profile.name}`, // The human-friendly display string
    `ORG:${profile.pseudonym || ""}`,
    `TITLE:${profile.tagline}`,
    `EMAIL;TYPE=INTERNET,PREF:${primaryEmail}`,
    `URL;TYPE=WORK:${cleanSiteUrl}`, // portfolio hub is now the flagship asset link
    githubLink ? `URL;TYPE=PROFILE:${githubLink}` : "", // Append GitHub as a secondary profile asset if defined
    `NOTE:${profile.bioSynopsis.replace(/\n/g, " ")}`, // Keep notes to a single line block
    "END:VCARD",
  ];
  // Clean out any empty rows (e.g., if githubLink was missing) and join with vCard standard line endings
  return lines.filter((line) => line.trim() !== "").join("\r\n");
}
