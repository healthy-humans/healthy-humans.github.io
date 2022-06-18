import { VitePWA } from 'vite-plugin-pwa';
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
            ),
            VitePWA(
                {
                    includeAssets: [
                        'apple-touch-icon.png', 'favicon.ico', 'favicon.svg', 'robots.txt'
                    ],
                    manifest: {
                        name: 'Healthy Humans',
                        short_name: 'Healthy Humans',
                        description: 'Health application',
                        theme_color: '#2a303c',
                        icons: [
                            {
                                src: 'pwa-192x192.png',
                                sizes: '192x192',
                                type: 'image/png',
                            },
                            {
                                src: 'pwa-512x512.png',
                                sizes: '512x512',
                                type: 'image/png',
                            },
                            {
                                src: 'pwa-512x512.png',
                                sizes: '512x512',
                                type: 'image/png',
                                purpose: 'any maskable',
                            }
                        ]
                    }
                }
            )
        ]
    }
);
