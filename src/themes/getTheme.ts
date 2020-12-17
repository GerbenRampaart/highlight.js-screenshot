import { path } from "app-root-path";
import { promises } from "fs";
import { join } from "path";
import { Theme } from "./Theme";

export const getThemeContent = async (themes: Theme[], name: string): Promise<string> => {
    const theme = themes.find((t: Theme) => t.name === name);

    if (!theme) {
        const themeStrings = themes.map((t: Theme) => t.name);
        throw new Error(`Theme '${name}' not found. Available themes: ${themeStrings.join(', ')}`);
    }

    const styleString = await promises.readFile(theme.cssPath, {
        encoding: 'utf-8'
    });

    return styleString;
}