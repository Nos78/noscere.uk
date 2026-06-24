// src/content.config.ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders"; // <-- The definitive home for the file system glob loader
import { z } from "astro/zod"; // <-- Upgraded Zod v4 integration path for Astro 6

// 1. Blog collection
const blogCollection = defineCollection({
    // Refactored pattern to look specifically for any markdown file inside the base folder
    loader: glob({
        pattern: "**/*.md",
        base: "./src/content/blog",
    }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        tags: z.array(z.string()),
        draft: z.boolean().default(false),
    }),
});
// 2. Projects/Case Studies Collection
const projectsCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        completionDate: z.coerce.date(),
        technologies: z.array(z.string()),
        githubUrl: z.string().url().optional(),
        liveUrl: z.string().url().optional(),
        featured: z.boolean().default(false),
        role: z.string().default("Lead Engineer"),
    }),
});

// 3. Notes Collection using v5 Content Layer API
const notesCollection = defineCollection({
    loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/notes" }),
    schema: z.object({
        title: z.string(),
        category: z.enum([
            "linux",
            "kubernetes",
            "devops",
            "security",
            "development",
        ]),
        updatedDate: z.coerce.date(),
        tags: z.array(z.string()).default(["Unsorted"]),
        pinned: z.boolean().default(false),
    }),
});

export const collections = {
    blog: blogCollection,
    projects: projectsCollection,
    notes: notesCollection,
};
