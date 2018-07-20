import * as React from 'react';
import { environment } from '../../environments/environment';

interface IComponentProps {
    mode: string;
    changeMode: (payload: string) => {type: string, payload: string, id: number};
}

export class ModeInputComponent extends React.Component<IComponentProps> {

    statics = {
        modes: [...environment.config.input.modes]
    };

    constructor(props: IComponentProps) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
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
        console.log('mode', this.props.mode);
        return (
            <div>
                <select value={this.props.mode} ref="select" onChange={this.handleChange}>
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