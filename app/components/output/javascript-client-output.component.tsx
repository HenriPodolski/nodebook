import * as React from 'react';
import Frame from 'react-frame-component';
let outputStyles = require('./output.component.scss');

interface IComponentProps {
    value: string;
    index: number;
    file: string;
    changeExecuteFlag: (payload: string) => {type: string, payload: string};
}

export class JavascriptClientOutputComponent extends React.Component<IComponentProps> {

    constructor(props: IComponentProps) {
        super(props);
    }

    render() {

        let tpl = `<!DOCTYPE html>
            <html>
                <head></head>
                <body>
                    <div id="mount"></div>
                    <script src=".${this.props.file}"></script>
                </body>
            </html>
        `;

        return (
			<Frame  initialContent={tpl.toString()}
				    mountTarget='#mount'
                    className={outputStyles.OutputFrame}>
                <>
                    {this.props.value}
                </>
            </Frame>
        );
    }
}