import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'

import { useHttpsConfig } from './composables/useHttpsConfig'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  app: {
    head: {
      title: 'Demo Site',
      htmlAttrs: {
        lang: 'zh-Hant',
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: './favicon.ico' }],
      meta: [
        {
          charset: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          'http-equiv': 'X-UA-Compatible',
          content: 'ie=edge',
        },
        {
          property: 'og:title',
          content: 'Demo Site',
        },
        {
          property: 'og:locale',
          content: 'zh_TW',
        },
      ],
    },
  },
  modules: ['@nuxt/eslint', '@pinia/nuxt', 'unplugin-icons/nuxt', '@nuxt/test-utils/module'],
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },
  typescript: {
    typeCheck: true,
  },
  devServer: {
    https: useHttpsConfig(),
  },
  runtimeConfig: {
    public: {
      envName: '',
      apiBaseUrl: '',
    },
  },
  build: {
    transpile: ['vue-i18n'],
  },
  vite: {
    plugins: [
      VueI18nVitePlugin({
        include: [resolve(dirname(fileURLToPath(import.meta.url)), './lang/*.ts')],
      }),
    ],
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'https://jsonplaceholder.typicode.com/posts',
        changeOrigin: true,
      },
    },
  },
})
