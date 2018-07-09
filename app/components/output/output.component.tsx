import * as React from 'react';
import { MarkdownOutputContainer } from '../../containers/output/markdown-output.container';
import { TypescriptOutputContainer } from '../../containers/output/typescript-output.container';
import Frame from 'react-frame-component';

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

    switchOutput(mode: string, executeFlag?: string) {
        switch(true) {
            case mode === 'markdown' && executeFlag === 'processed': {
                return (
                    <Frame className={styles.OutputFrame}>
                        <MarkdownOutputContainer index={this.props.index} />
                    </Frame>
                )
            }
            case mode === 'typescript' && executeFlag === 'processed': {
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
        const elements = this.switchOutput(this.props.mode, this.props.executeFlag);

        return (
            <>
                {elements}
            </>
        );
    }
}