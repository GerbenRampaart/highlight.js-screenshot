import { promises } from "fs";
import { highlightAuto } from "highlight.js";
import { content } from "./puppeteer/content";
import { screenshot } from "./puppeteer/screenshot";
import { getThemeContent } from "./themes/getTheme";
import { getThemes } from "./themes/getThemes";
import { Theme } from "./themes/Theme";

export interface HighlightScreenshotResult {
    buffer?: Buffer;
    result: AutoHighlightResult;
    themeUsed: string;
}

export const highlightScreenshotToBuffer = async (code: string, themeName?: string, languages?: string[]): Promise<HighlightScreenshotResult> => {
    const highlighted = highlightAuto(code, languages);

    const themes = await getThemes();
    const theme = await getThemeContent(themes, themeName || 'default');

    if (!highlighted.language) {
        return {
            result: highlighted,
            buffer: undefined,
            themeUsed: theme,
        };
    }

    const htmlString = content(highlighted.value, theme, highlighted.language);
    const buffer = await screenshot(htmlString);

    return {
        result: highlighted,
        buffer: buffer,
        themeUsed: theme,
    }
}

export const highlightScreenshotToPath = async (code: string, path: string, themeName?: string, languages?: string[]): Promise<HighlightScreenshotResult> => {
    const result = await highlightScreenshotToBuffer(code, themeName, languages);

    if (result.buffer) {
        await promises.writeFile(path, result.buffer, "utf-8");
    }
    
    return result;
}
