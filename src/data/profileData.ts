// src/data/profileData.ts

// 1. structural blueprints
export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  category: "professional" | "creative" | "hidden";
  iconName: string;
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
  name: "Your Name",
  pseudonym: "noscere",
  tagline: "Software Engineer & Multi-Disciplinary Developer",
  bioSynopsis:
    "Professional software engineer with a career spanning telephony, embedded systems, and mobile device architectures, currently operating as a freelance full-stack developer.",
  vCardPath: "/contacts/profile.vcf",
  emails: [
    {
      address: "your.professional.email@example.com",
      displayName: "Professional Inquiries",
      primary: true, // The engine will grab this one for your Gravatar avatar!
    },
  ],
  links: [
    {
      platform: "GitHub",
      label: "Source Code & Repositories",
      url: "https://github.com/yourusername",
      category: "professional",
      iconName: "github",
    },
    {
      platform: "LinkedIn",
      label: "Professional Network",
      url: "https://linkedin.com/in/yourusername",
      category: "professional",
      iconName: "linkedin",
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
