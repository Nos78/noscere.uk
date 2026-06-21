// src/pages/contacts/profile.vcf.ts
import type { APIRoute } from "astro";
import { profileData } from "../../data/profileData";
import { generateVCardString } from "../../utils/vcardEngine";

export const GET: APIRoute = (context) => {
  // Grab the dynamic runtime server URL (handles local test, preview pipelines, or production domains effortlessly)
  const siteOrigin = context.url.origin;
  const vCardContent = generateVCardString(profileData, siteOrigin);

  return new Response(vCardContent, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="profile.vcf"',
    },
  });
};
