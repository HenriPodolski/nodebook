import * as React from 'react';
import { MarkdownOutputContainer } from '../../containers/output/markdown-output.container';
import { TypescriptOutputContainer } from '../../containers/output/typescript-output.container';

interface IComponentProps {
    mode: string;
    value: string;
    index: number;
    executeFlag: string;
    changeExecuteFlag: (payload: string) => {type: string, payload: string};
}

export class OutputComponent extends React.Component<IComponentProps> {

    constructor(props: IComponentProps) {
        super(props);
    }

    switchOutput(mode: string, executeFlag?: string) {
        switch(true) {
            case mode === 'markdown': {
                return <MarkdownOutputContainer index={this.props.index} />
            }
            case mode === 'typescript' && executeFlag === 'processing': {
                return <TypescriptOutputContainer index={this.props.index} />
            }
        }
    }

    render() {
        const elements = this.switchOutput(this.props.mode, this.props.executeFlag);

        return (
            <div>
                {elements}
            </div>
        );
    }
}