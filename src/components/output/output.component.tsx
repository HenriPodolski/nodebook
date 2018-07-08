import * as React from 'react';
import { MarkdownOutputContainer } from '../../containers/output/markdown-output.container';
import { TypescriptOutputContainer } from '../../containers/output/typescript-output.container';
import Frame from 'react-frame-component';

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
            case mode === 'markdown': {
                return (
                    <Frame>
                        <MarkdownOutputContainer index={this.props.index} />
                    </Frame>
                )
            }
            case mode === 'typescript' && executeFlag === 'processed': {
                return (
                    <Frame>
                        <TypescriptOutputContainer index={this.props.index} />
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