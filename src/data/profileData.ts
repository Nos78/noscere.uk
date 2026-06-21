// src/data/profileData.ts

// 1. structural blueprints
export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  category: "professional" | "creative" | "hidden";
  iconName: string;
}

export interface StructuredName {
  firstName: string;
  lastName: string;
  middleName?: string;
  prefix?: string;
  suffix?: string;
}

export interface Qualification {
  title: string;
  institution: string;
  year: number;
  type: "academic" | "professional" | "certification";
}

export interface Email {
  address: string;
  displayName: string; // e.g. "Primary Contact" or "Engineering Inquiries"
  primary: boolean; // Tells Gravatar engine which email to hash as default
}

export interface ProfileData {
  name: string;
  structuredName: StructuredName;
  pseudonym?: string;
  tagline: string;
  bioSynopsis: string;
  vCardPath: string;
  emails: Email[];
  links: SocialLink[];
  qualifications: Qualification[];
}

// production content (Data)
export const profileData: ProfileData = {
  name: "Michael Thomas",
  structuredName: {
    firstName: "Michael",
    lastName: "Thomas",
  },
  pseudonym: "noscere",
  tagline: "Software Engineer & Multi-Disciplinary Developer",
  bioSynopsis:
    "Professional software engineer with a career spanning telephony, embedded systems, and mobile device architectures, currently operating as a freelance full-stack developer.",
  vCardPath: "/contacts/profile.vcf",
  emails: [
    {
      address: "noscere1978@gmail.com",
      displayName: "Personal Email address",
      primary: false, // The engine will grab this one for your Gravatar avatar!
    },
    {
      address: "contact@noscere.uk",
      displayName: "Professional Inquiries",
      primary: false,
    },
  ],
  links: [
    {
      platform: "GitHub",
      label: "Source Code & Repositories",
      url: "https://github.com/nos78",
      category: "professional",
      iconName: "github",
    },
    {
      platform: "YouTube",
      label: "Social media platforms",
      url: "https://www.youtube.com/@glasgowbusker",
      category: "creative",
      iconName: "youtube",
    },
    {
      platform: "X",
      label: "Social media platforms",
      url: "https://x.com/noscerevelle",
      category: "professional",
      iconName: "x",
    },
  ],
  qualifications: [
    {
      title: "BSc (Hons) in Computer Science", // Example placeholder
      institution: "University Name",
      year: 2005,
      type: "academic",
    },
  ],
};
