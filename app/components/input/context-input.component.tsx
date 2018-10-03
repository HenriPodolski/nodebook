import * as React from 'react';
import { environment } from '../../environments/environment';

interface IComponentProps {
    ctx: string,
    ctxs: {mode: string, values: {label: string, value: string}[]};
    changeContext: (payload: string) => {type: string, payload: string, id: number};
}

export class ContextInputComponent extends React.Component<IComponentProps> {

    statics = {
        contexts: [...environment.config.input.contexts]
    };

    constructor(props: IComponentProps) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.changeContext(evt.target.value);
    }

    changeContext(newContext: string) {
        console.log(newContext);
        this.props.changeContext(newContext);
    }

    render() {
        const ctx = this.props.ctxs;
        return (
            <>
                {(ctx && ctx.values && ctx.values[0] && ctx.values[0].value) &&
                <div>
                    <select value={this.props.ctx} ref="select" onChange={this.handleChange}>
                        {ctx.values.map((contextObj, i) => {
                            return (
                                <option key={i} value={contextObj.value}>
                                    {contextObj.label}
                                </option>
                            )
                        })}
                    </select>
                </div>}
            </>
        );
    }
}