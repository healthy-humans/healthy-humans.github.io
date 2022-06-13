import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { transformSync } from 'esbuild';
import type { Processed } from '@sveltejs/vite-plugin-svelte';

export default defineConfig(
    {
        plugins: [
            svelte(
                {
                    preprocess: [
                        {
                            script: ({ attributes, content }): Processed => {
                                if (attributes.lang !== 'ts') {
                                    return { code: content };
                                }
                                const { code } = transformSync(content, { loader: 'ts' });
                                return { code };
                            }
                        }
                    ]
                }
            )
        ]
    }
);
