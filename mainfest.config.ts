import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  manifest_version: 3,
  name: 'SimpleNewTab',
  short_name: 'NewTab',
  description: 'Custom new tab page for Chromium browsers',
  version: '1.0.0',
  default_locale: 'en',
  permissions: [
    'storage',
  ],
  host_permissions: [
    '<all_urls>',
  ],
  action: {
    default_icon: 'public/icons/icon48.png',
    default_title: 'Simple New Tab'
  },
  chrome_url_overrides: {
    newtab: 'index.html'
  },
  icons: {
    "16": "public/icons/icon16.png",
    "48": "public/icons/icon48.png",
    "128": "public/icons/icon128.png"
  },
})
