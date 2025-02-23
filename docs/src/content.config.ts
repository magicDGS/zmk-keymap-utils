import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const definitionTableSchema = z.object({
	code: z.string(),
	description: z.string(),
	L: z.enum(['supported', 'unsupported', 'unknown']),
	W: z.enum(['supported', 'unsupported', 'unknown']),
	M: z.enum(['supported', 'unsupported', 'unknown']),
})

const behaviorTableSchema = z.object({
	behavior: z.string(),
	description: z.string()
})

const definitionsLoader = (name: string) => file(`src/data/definitions/${name}.yml`);
const behaviorsLoader = (name: string) => file(`src/data/behaviors/${name}.yml`);

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	shortcuts: defineCollection({ loader: definitionsLoader('shortcuts'), schema: definitionTableSchema }),
	modifiers: defineCollection({ loader: definitionsLoader('modifiers'), schema: definitionTableSchema }),
	select_word: defineCollection ({ loader: behaviorsLoader('select_word'), schema: behaviorTableSchema }),
};
