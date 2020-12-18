export const content = (code: string, css: string, lang: string, includeHeader: boolean) => {
    const msg = `${lang} ${new Date().toLocaleString()}`;
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
                }
                ${css}
            </style>
            <body>
                <div id='code_block' style='display:inline-block;'>
                    ${ includeHeader ? '<p class=\'topbar\'>' + msg +'</p>' : '' }
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
}