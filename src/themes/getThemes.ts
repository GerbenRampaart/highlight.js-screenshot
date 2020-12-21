import { path } from 'app-root-path';
import { promises } from 'fs';
import { join, parse } from 'path';
import { Theme } from './Theme';

export const getThemes = async (): Promise<Theme[]> => {
    const stylesDir = join(path, 'node_modules', 'highlight.js', 'styles');
    const files = await promises.readdir(stylesDir);

    return (
        files
            // probably no other files in that directory but just in case
            .filter((f: string) => f.toLowerCase().endsWith('.css'))
            .map((f: string) => {
                const name = parse(f).name;
                return {
                    name: name,
                    cssPath: join(stylesDir, f),
                };
            })
    );
};
