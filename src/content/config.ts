// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
    type: 'content', // Tells Astro to look for Markdown (.md) or MDX files
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        tags: z.array(z.string()),
        draft: z.boolean().default(false),
    }),
});

// Export the collection name to wire it into the engine
export const collections = {
    'blog': blogCollection,
};
