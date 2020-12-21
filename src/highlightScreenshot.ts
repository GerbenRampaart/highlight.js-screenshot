import { promises } from 'fs';
import { highlightAuto } from 'highlight.js';
import { content } from './puppeteer/content';
import { screenshot } from './puppeteer/screenshot';
import { getThemes } from './themes/getThemes';
import { loadThemeContent } from './themes/loadThemeContent';
import { Theme } from './themes/Theme';

export interface HighlightScreenshotResult {
    buffer: Buffer;
    result: AutoHighlightResult;
    themeUsed: Theme;
}

export const highlightScreenshotToBuffer = async (
    code: string,
    includeHeader = false,
    themeName = 'default',
    languages?: string[],
): Promise<HighlightScreenshotResult> => {
    const highlighted = highlightAuto(code, languages);
    const themes = await getThemes();
    const theme = themes.find((t: Theme) => t.name === themeName);

    if (!theme) {
        const themeStrings = themes.map((t: Theme) => t.name);
        throw new Error(`Theme '${themeName}' not found. Available themes: ${themeStrings.join(', ')}`);
    }

    if (!highlighted.language) {
        throw new Error('Could not determine language');
    }

    await loadThemeContent(theme);

    const htmlString = content(highlighted.value, theme, highlighted.language, includeHeader);
    const buffer = await screenshot(htmlString);

    return {
        result: highlighted,
        buffer: buffer,
        themeUsed: theme,
    };
};

export const highlightScreenshotToPath = async (
    code: string,
    path: string,
    includeHeader = false,
    themeName = 'default',
    languages?: string[],
): Promise<HighlightScreenshotResult> => {
    const result = await highlightScreenshotToBuffer(code, includeHeader, themeName, languages);
    await promises.writeFile(path, result.buffer, 'utf-8');
    return result;
};
