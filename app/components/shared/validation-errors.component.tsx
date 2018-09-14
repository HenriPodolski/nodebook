import * as React from 'react';

interface IComponentProps {
    validationErrors: any[];
    cssClasses: '';
}

export class ValidationErrorsComponent extends React.Component<IComponentProps> {

    constructor(props: IComponentProps, context?: any) {
        super(props, context);
    }

    render() {
        return (
            <>
            {this.props.validationErrors.length ?
                <ul className={this.props.cssClasses}>
                    {this.props.validationErrors.map((validationError, i) => {
                        return (
                            <li key={i}>
                                {validationError.message}
                            </li>
                        )
                    })}
                </ul> :
                <></>
            }
            </>
        );
    }
}