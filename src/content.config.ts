import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const routes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/routes' }),
  schema: z.object({
    route: z.string(),
    rating: z.union([z.string(), z.number()]),
    area: z.string().optional(),
    order: z.union([z.number().nonnegative(), z.string().min(1)]),
  }),
});

export const collections = {
  routes,
};
