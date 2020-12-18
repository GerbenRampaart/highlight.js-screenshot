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

export const highlightScreenshotToBuffer = async (code: string, includeHeader = true, themeName: string = 'default', languages?: string[]): Promise<HighlightScreenshotResult> => {
    const highlighted = highlightAuto(code, languages);

    const themes = await getThemes();
    const theme = await getThemeContent(themes, themeName);

    if (!highlighted.language) {
        return {
            result: highlighted,
            buffer: undefined,
            themeUsed: theme,
        };
    }

    const htmlString = content(highlighted.value, theme, highlighted.language, includeHeader);
    const buffer = await screenshot(htmlString);

    return {
        result: highlighted,
        buffer: buffer,
        themeUsed: theme,
    }
}

export const highlightScreenshotToPath = async (code: string, path: string, includeHeader = true, themeName: string = 'default', languages?: string[]): Promise<HighlightScreenshotResult> => {
    const result = await highlightScreenshotToBuffer(code, includeHeader, themeName, languages);

    if (result.buffer) {
        await promises.writeFile(path, result.buffer, "utf-8");
    }
    
    return result;
}
