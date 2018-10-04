import * as React from 'react';
import { MarkdownOutputContainer } from '../../containers/output/markdown-output.container';
import { TypescriptOutputContainer } from '../../containers/output/typescript-output.container';
import Frame from 'react-frame-component';
import { JavascriptClientOutputContainer } from '../../containers/output/javascript-client-output.container';
import { LogsOutputContainer } from '../../containers/output/logs-output.container';
import { ContextEnums } from '../../enums/contexts.enums';
import { ModeEnums } from '../../enums/mode.enums';

let styles = require('./output.component.scss');

interface IComponentProps {
    mode: string;
    context: string;
    value: string;
    index: number;
    executeFlag: string;
    changeExecuteFlag: (payload: string) => {type: string, payload: string};
}

export class OutputComponent extends React.Component<IComponentProps> {

    constructor(props: IComponentProps, context?: any) {
        super(props, context);
    }

    switchOutput(mode: string, context: string) {

    	console.log('switchOutput', mode, context);

        switch(true) {
            case (mode === ModeEnums.md.value): {
                return (
                    <Frame className={styles.OutputFrame}>
                        <MarkdownOutputContainer index={this.props.index} />
                    </Frame>
                )
            }

            case (mode === ModeEnums.js.value && context === ContextEnums.js.client): {
                return (
                    <>
						<JavascriptClientOutputContainer index={this.props.index} />
                        <LogsOutputContainer index={this.props.index} />
                    </>
                )
            }

			case (mode === ModeEnums.js.value && context === ContextEnums.js.server): {
				return (
                    <>
						<LogsOutputContainer index={this.props.index} />
                    </>
				)
			}

			case (mode === ModeEnums.ts.value && context === ContextEnums.ts.client): {
				return (
					<>
						<Frame className={styles.OutputFrame}>
							<TypescriptOutputContainer index={this.props.index} />
						</Frame>
						<LogsOutputContainer index={this.props.index} />
					</>
				)
			}

			case (mode === ModeEnums.ts.value && context === ContextEnums.ts.server): {
				return (
					<>
						<LogsOutputContainer index={this.props.index} />
					</>
				)
			}

            default: {
                return (
                    <></>
                )
            }
        }
    }

    render() {
        const elements = this.switchOutput(
            this.props.mode, this.props.context
        );

        return (
            <>
                {elements}
            </>
        );
    }
}