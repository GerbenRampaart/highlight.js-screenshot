export const content = (code: string, css: string, lang: string) => {
    return `
        <html>
            <style>
                div.topbar {
                    height: 20px;
                    width: 100%;
                    background-color: #749fb8;
                    margin: 0px;
                    padding: 0px;
                    text-align:center;
                }
                ${css}
            </style>
            <body>
                <div id='code_block' style='display:inline-block;'>
                    <div class='topbar'>test</div>
                    <div class='hljs ${lang}' style='display:inline-block;padding:3em;'>
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