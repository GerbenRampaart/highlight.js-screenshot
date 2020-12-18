import { launch } from 'puppeteer';

export const screenshot = async (html: string): Promise<Buffer> => {
    const browser = await launch({
        headless: true,
    });

    const page = await browser.newPage();

    await page.setContent(html);

    // The resolution of the screenshot corresponds to the pixel count in the viewport
    // so make it 4K so we get lots of pixels when the font upscales with the viewport.
    // https://github.com/puppeteer/puppeteer/issues/1329
    // deviceScaleFactor: 3 gives a reasonable resolution for the font.
    // With '1', images are around 30kb but get blurry quick when zoomed.
    // With '3' images are about 100-150kb but have good resolution.
    await page.setViewport({
        height: 3840,
        width: 2160,
        deviceScaleFactor: 3, // 3 gives a reasonable resolution for the font.
    });

    // Base the screenshot on a element otherwise you get a lot of whitespace.
    const element = await page.waitForSelector('#code_block');
    const buffer = await element.screenshot({
        type: 'png',
    });

    await browser.close();

    return buffer;
};
