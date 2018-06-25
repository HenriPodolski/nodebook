import * as React from 'react';

export class ModeInputComponent extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        console.log(evt.target.value);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <select ref="select" onChange={this.handleChange}>
                    <option value="markdown">Markdown</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="javascript">JavaScript</option>
                </select>
            </div>
        );
    }
}