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

- fill the about section of settings
- drag and drop to change positions (currently entires are displaying in the order they were added)
- support for search engines management
- probably switch to hierarсhical structure for folders
- try image with `crossorigin="anonymous"` and Canvas as clientside loader and base64 converter to reduce traffic from Vercel Functions
- network-based backup and restore with clientside encryption via something like free key-value storages 

## Build as regular page

To build as regular page:

```sh
npm run build
```

This depends on `/api/check` path, which contains an endpoint for [Vercel Functions](https://vercel.com/docs/functions). If you're using another platform, check if there are relevant features.

This is being used, because in case of direct GET requests to external URLs there would be CORS issue in almost each case.

## Use as browser extension

To build and add minimal web extension data:

```sh
npm run build
cp -r extension/* dist/
```

Now:

1. Go to `chrome://extensions`
2. Enable "Developer mode"
3. Press "Load unpacked"
4. Navigate to `dist` folder, which should include `manifest.json` already

In this way there's used extension's permission `<all_urls>`, which allow to reach any URL without CORS issues, so `/api/check` endpoint is not necessary.
