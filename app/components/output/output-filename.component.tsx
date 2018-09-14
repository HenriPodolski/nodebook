import * as React from 'react';
import { ValidationErrorsContainer } from '../../containers/shared/validation-errors.container';

interface IComponentProps {
    name: string;
    mode: string;
    short: string;
    index: number;
    validationErrors: any[];
    changeName: (payload: string) => {type: string, payload: string};
}

export class OutputFilenameComponent extends React.Component<IComponentProps> {

    constructor(props: IComponentProps, context?: any) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        const newName = evt.target.value;
        this.props.changeName(newName);
    }

    render() {
        return (
            <div>
                <input type="text" value={this.props.name} onChange={this.handleChange} />.{this.props.short}
                <ValidationErrorsContainer
                    index={this.props.index}
                    validate="inputs"
                    validateKey="filename"
                />
            </div>
        );
    }
}