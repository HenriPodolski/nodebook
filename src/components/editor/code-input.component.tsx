import AceEditor from 'react-ace';
import * as React from 'react';

import '../../shared/imports/brace';

interface IComponentProps {
    mode: string;
    theme: string;
    height: string;
    width: string;
    editor: any;
    value: string;
    readOnly: boolean;
    changeValue: (payload: string) => {type: string, payload: string};
    changeHeight: (payload: string) => {type: string, payload: string};
    changeTheme: (payload: string) => {type: string, payload: string};
}

export class CodeInputComponent extends React.Component<IComponentProps> {

    constructor(props: IComponentProps) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    getHeight() {
        const editor = this.refs.editor && this.refs.editor['editor'];
        let height = this.props.height;

        if(editor){
            let newHeight = editor.getSession().getScreenLength() *
                (editor.renderer.lineHeight + editor.renderer.scrollBar.getWidth());

            height = `${newHeight}px`;
        }

        return height;
    }

    handleChange(newValue, evt) {
        this.props.changeValue(newValue);
        this.refs.editor['editor'].container.style.height = this.getHeight();
        this.refs.editor['editor'].resize();
    }

    componentDidMount() {
        this.props.changeTheme('github');
        this.props.changeHeight(this.getHeight());
        this.refs.editor['editor'].resize();
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <AceEditor
                ref="editor"
                value={this.props.value}
                onChange={(newValue, evt) => this.handleChange(newValue, evt)}
                theme={this.props.theme}
                mode={this.props.mode}
                height={this.props.height}
                width={this.props.width}
                editorProps={this.props.editor}
                readOnly={this.props.readOnly}
            />
        );
    }
}