import * as React from 'react';
import Frame from 'react-frame-component';
import { ModeEnums } from '../../enums/mode.enums';
let outputStyles = require('./output.component.scss');

interface IComponentProps {
    outputs: {
        value: string;
        name: string;
		mode: string;
		index: number;
		file: string;
        compiledFile?: string;
    }[];
    changeExecuteFlag: (payload: string) => {type: string, payload: string};
}

export class ClientOutputComponent extends React.Component<IComponentProps> {

    constructor(props: IComponentProps) {
        super(props);
    }

    render() {
        let scripts = '';
		let typeScripts = '';
		let dataSources = '';

        let html = '';
        let css = '';

        this.props.outputs.forEach(output => {
            switch(true) {
                case (output.mode === ModeEnums.json.value): {
                    dataSources += `<script>
                        nodebook.data.${output.name} = ${JSON.parse(JSON.stringify(output.value))};
                    </script>`;
                    break;
                }
                case (output.mode === ModeEnums.js.value): {
					scripts += `<script src=".${output.file}"></script>`;
                    break;
                }
				case (output.mode === ModeEnums.ts.value): {
					typeScripts += `<script src=".${output.compiledFile}"></script>`;
					break;
				}
				case (output.mode === ModeEnums.css.value): {
					css += `<link rel="stylesheet" href=".${output.file}" />`;
					break;
				}
				case (output.mode === ModeEnums.html.value): {
					// todo: Make selectors available here, to make it possible to specify html placement
					html += output.value;
					break;
				}
            }

        });


        let tpl = `<!DOCTYPE html>
            <html>
                <head>
                    <title>Client Output</title>
                    ${css}
                    <script>
                        // data namespace
                        var nodebook = {
                            data: {}
                        };
                    </script>
                </head>
                <body>
                    <div id="mount"></div>
                    ${dataSources}
                    ${typeScripts}
                    ${scripts}
                </body>
            </html>
        `;

        return (
			<Frame  initialContent={tpl.toString()}
				    mountTarget='#mount'
                    className={outputStyles.OutputFrame}>
                <div dangerouslySetInnerHTML={{__html: html}}></div>
            </Frame>
        );
    }
}