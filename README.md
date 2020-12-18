# highlight.js-screenshot

## What does this do?
Takes screenshots from a piece of code formatted by highlight.js using puppeteer

## How?

```typescript
const result = await highlightScreenshotToPath(
    `console.log('test');`,         // The code you wish to stylize
    join(cwd(), 'javascript.png'),  // The path to write the image to
    true,                           // include the header with some metadata
    'default',                      // Any theme from the 'node_modules/highlight.js/styles' dir
                                    // (defaults to 'default' is not supplied)
    ['javascript'],                 // An array of languages you force the library to use 
                                    // (default to autodetect if not supplied)
);
```

Here are some examples from different languages with different themes:

![Alt text](README.md_images/javascript.png?raw=true "Javascript")

![Alt text](README.md_images/csharp.png?raw=true "CSharp")

![Alt text](README.md_images/json.png?raw=true "JSON")

![Alt text](README.md_images/xml.png?raw=true "Xml")

You can also use highlightScreenshotToBuffer. Which just returns the buffer of the image and does not write it to disk.

## What languages can I supply?
If you don't supply any it autodetects, but if you want to force a language you can supply all languages listed here:
https://highlightjs.org/static/demo/

## What themes can I select?
All themes listed here:
https://highlightjs.org/static/demo/

Note that after you installed this npm package in your project you can check the directory:
```shell
node_modules/highlight.js/styles/
```
The name of the style you can supply is the filename without extension. For example 'atelier-cave-dark' (so without '.css')

## Supported
This package needs at least nodejs 8.10.x or higher
https://stackoverflow.com/questions/48378495/recommended-typescript-config-for-node-8
