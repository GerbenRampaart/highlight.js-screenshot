import { promises } from 'fs';
import { Theme } from './Theme';

export const loadThemeContent = async (theme: Theme): Promise<Theme> => {
    theme.css = await promises.readFile(theme.cssPath, {
        encoding: 'utf-8',
    });

    return theme;
};
