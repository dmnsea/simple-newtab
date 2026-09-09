# simple-newtab

Different browsers has different content for their "new tab". Some are more comfortable, some are less. But almost each browser allows to override it either with URL, or with extensions (desktop).

This project is an attempt to create a simple but universal start page to use in both desktop and mobile browser, without "unwanted" things and so on.

## Status

Ready:

- [x] adding sites
- [x] fetch images for site
- [x] adding folders
- [x] nested folders and sites (single array, referencing to parent by id)
- [x] editing folders and sites (including re-fetching image)
- folder deletion behaviour
  - [x] cascade deletion (default)
  - [x] move childs to parent's folder and remove just folder
- [x] persist in `localStorage` (including images)
- [x] backup and restore with JSON file
- [x] light and dark theme
- [x] very simple search bar

TODO:

- [ ] try image with `crossorigin="anonymous"` and Canvas as clientside loader and base64 converter to avoid using Vercel Functions
- [ ] fill the about section of settings
- [ ] make translation with `react-i18next`
- [ ] support for search engines management
- [ ] drag and drop to change bookmark positions (currently entires are displaying in the order they were added)
- [ ] probably switch to hierarсhical structure for folders
- [ ] network-based backup and restore with clientside encryption via something like free key-value storages

## Build

TODO: update
