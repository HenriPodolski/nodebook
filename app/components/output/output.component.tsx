import * as React from 'react';
import { MarkdownOutputContainer } from '../../containers/output/markdown-output.container';
import { TypescriptOutputContainer } from '../../containers/output/typescript-output.container';
import Frame from 'react-frame-component';
import { JavascriptOutputContainer } from '../../containers/output/javascript-output.container';
import { LogsOutputContainer } from '../../containers/output/logs-output.container';

let styles = require('./output.component.scss');

interface IComponentProps {
    mode: string;
    value: string;
    index: number;
    executeFlag: string;
    changeExecuteFlag: (payload: string) => {type: string, payload: string};
}

export class OutputComponent extends React.Component<IComponentProps> {

    constructor(props: IComponentProps, context?: any) {
        super(props, context);
    }

    switchOutput(mode: string) {
        switch(true) {
            case mode === 'markdown': {
                return (
                    <Frame className={styles.OutputFrame}>
                        <MarkdownOutputContainer index={this.props.index} />
                    </Frame>
                )
            }
            case mode === 'javascript': {
                return (
                    <>
                        <Frame className={styles.OutputFrame}>
                            <JavascriptOutputContainer index={this.props.index} />
                        </Frame>
                        <LogsOutputContainer index={this.props.index} />
                    </>
                )
            }
            case mode === 'typescript': {
                return (
                    <Frame className={styles.OutputFrame}>
                        <TypescriptOutputContainer index={this.props.index} />
                    </Frame>
                )
            }
            default: {
                return (
                    <Frame className={styles.OutputFrameHidden}>
                        <MarkdownOutputContainer index={this.props.index} />
                    </Frame>
                )
            }
        }
    }

    render() {
        const elements = this.switchOutput(this.props.mode);

        return (
            <>
                {elements}
            </>
        );
    }
}