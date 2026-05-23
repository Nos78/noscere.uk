// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders'; // <-- The definitive home for the file system glob loader
import { z } from 'astro/zod';         // <-- Upgraded Zod v4 integration path for Astro 6

const blogCollection = defineCollection({
    // Refactored pattern to look specifically for any markdown file inside the base folder
    loader: glob({
        pattern: '**/*.md',
        base: './src/content/blog'
    }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        tags: z.array(z.string()),
        draft: z.boolean().default(false),
    }),
});

export const collections = {
    'blog': blogCollection,
};
