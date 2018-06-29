import * as React from 'react';
import { environment } from '../environments/environment';

interface IComponentProps {
    mode?: string;
    changeMode?: (payload: string) => {type: string, payload: string};
}

interface IComponentState {
    mode?: string;
    modes: {value: string, title: string}[];
    changeMode?: (payload: string) => {type: string, payload: string};
}

export class ModeInputComponent extends React.Component<IComponentProps, IComponentState> {

    statics = {
        modes: [...environment.config.editor.modes]
    };

    constructor(props: IComponentProps) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.changeMode('markdown');
    }

    handleChange(evt) {
        this.changeMode(evt.target.value);
    }

    changeMode(newMode: string) {
        console.log(newMode);
        this.props.changeMode(newMode);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <select ref="select" onChange={this.handleChange}>
                    {this.statics.modes.map((modeObj, i) => {
                        return (
                            <option key={i} value={modeObj.value}>
                                {modeObj.title}
                            </option>
                        )
                    })}
                </select>
            </div>
        );
    }
}