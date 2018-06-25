import AceEditor from 'react-ace';
import * as brace from 'brace';
import * as React from 'react';

import 'brace/mode/typescript';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/mode/css';
import 'brace/mode/html';
import 'brace/mode/plain_text';
import 'brace/mode/markdown';

import 'brace/theme/monokai';
import 'brace/theme/github';

interface ICodeInputComponentProps {}
interface ICodeInputComponentState {
    mode: string;
    theme: string;
    height: string;
    width: string;
    editor: any;
}

export class CodeInputComponent extends React.Component<ICodeInputComponentProps, ICodeInputComponentState> {

    constructor(props: ICodeInputComponentProps) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            mode: 'plain_text',
            theme: 'github',
            height: '100%',
            width: '100%',
            editor: {
                maxLines: Infinity,
                autoScrollEditorIntoView: true,
                wrap: true,
                minLines: 1
            }
        };
    }

    getHeight() {
        const editor = this.refs.editor && this.refs.editor['editor'];
        let height = this.state.height;

        if(editor){
            let newHeight = editor.getSession().getScreenLength() *
                (editor.renderer.lineHeight + editor.renderer.scrollBar.getWidth());

            height = `${newHeight}px`;
        }

        return height;
    }

    handleChange(newValue, evt) {
        console.log(newValue, evt);
        this.refs.editor['editor'].container.style.height = this.getHeight();
        this.refs.editor['editor'].resize();
    }

    componentDidMount() {
        this.setState({
            mode: 'javascript',
            theme: 'github',
        });

        this.setState({ height: this.getHeight() });
        this.refs.editor['editor'].resize();
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <AceEditor
                ref="editor"
                onChange={(newValue, evt) => this.handleChange(newValue, evt)}
                theme={this.state.theme}
                mode={this.state.mode}
                height={this.state.height}
                width={this.state.width}
                editorProps={this.state.editor}
            />
        );
    }
}