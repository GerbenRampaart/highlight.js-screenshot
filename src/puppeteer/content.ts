import { Theme } from '../themes/Theme';

export const content = (code: string, theme: Theme, lang: string, includeHeader: boolean) => {
    const msg = `language <b>${lang}</b>. theme <b>${theme.name}</b>. generated </b>${new Date().toLocaleString()}</b>`;
    return `
        <html>
            <style>
                p.topbar {
                    width: 100%;
                    background-color: #749fb8;
                    margin: 0px;
                    padding: 5px;
                    text-align:center;
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 6px;
                }
                ${theme.css}
            </style>
            <body>
                <div id='code_block' style='display:inline-block;'>
                    ${includeHeader ? "<p class='topbar'>" + msg + '</p>' : ''}
                    <div class='hljs ${lang}' style='padding:1em;'>
                        <pre>
                            <code>
${code}
                            </code>
                        </pre>
                    </div>
                </div>
            </body>
        </html>
    `;
};
