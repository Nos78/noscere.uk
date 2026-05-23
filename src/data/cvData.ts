// src/data/cvData.ts

export interface Skill {
    name: string;
    category: 'backend' | 'systems' | 'frontend' | 'automation';
    level: 'Expert' | 'Advanced' | 'Proficient';
}

export const categories = ["all", "backend", "systems", "frontend", "automation"] as const;

export const skills: Skill[] = [
    { name: "C# / .NET", category: "backend", level: "Expert" },
    { name: "Linux / Sysadmin", category: "systems", level: "Expert" },
    { name: "Docker & K3s", category: "systems", level: "Advanced" },
    { name: "Embedded Systems", category: "backend", level: "Advanced" },
    { name: "Astro / Node.js", category: "frontend", level: "Proficient" },
    { name: "Tailwind CSS", category: "frontend", level: "Proficient" },
    { name: "CI/CD Pipelines", category: "automation", level: "Advanced" },
];
