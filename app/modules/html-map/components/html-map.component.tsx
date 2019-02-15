import * as React from 'react';
import AceEditor, { AceOptions, EditorProps } from 'react-ace';
import { environment } from '../../../environments/environment';
import '../../../shared/imports/brace';

interface IComponentProps {

}

export class HtmlMapComponent extends React.Component<IComponentProps> {

  state;

  editorRef;

  constructor(props) {
    super(props);

    this.state = {
      height: environment.config.input.editableConfig.height,
      type: '',
      payload: {
        document: ''
      }
    };

    this.editorRef = React.createRef();

    if (window.opener) {
      window.addEventListener('message', (evt) => {
        if (window.location.origin !== evt.origin) {
          return;
        }

        try {
          const data = JSON.parse(evt.data);

          if (data.type && data.type === 'htmlStringData') {
            this.setState(data);
          }
        } catch (e) {
          throw new Error(e);
        }
      });

      window.opener.postMessage('ready', window.location.origin);
    }
  }

  handleChange(newValue, evt) {
    this.setState((prevState: any, props) => ({
      ...prevState,
      height: this.getHeight(),
      payload: {
        ...prevState.payload,
        document: newValue
      }
    }));
  }

  getHeight() {
    const editor = this.refs.input && this.refs.input['editor'];
    let height = this.state.height;

    if (editor) {
      let newHeight = editor.getSession().getScreenLength() *
        (editor.renderer.lineHeight + editor.renderer.scrollBar.getWidth());

      height = `${newHeight}px`;
    }

    return height;
  }

  componentDidUpdate() {
    const editor = this.refs.input['editor'];
    editor.container.style.lineHeight = 3;
    editor.renderer.updateFontSize();
    editor.container.style.height = this.getHeight();
    editor.resize();
  }

  render() {
    const aceConfig = environment.config.input.editableConfig;
    const optionProps = Object.assign({},{
      showPrintMargin: true
    }) as AceOptions;

    return (
      <>
        <AceEditor
          ref="input"
          value={this.state.payload.document}
          onChange={(newValue, evt) => this.handleChange(newValue, evt)}
          theme={aceConfig.theme}
          mode="html"
          height={aceConfig.height}
          width={aceConfig.width}
          editorProps={aceConfig.editor as EditorProps}
          setOptions={optionProps}
          readOnly={true}
        />
        <button>Save selection</button>
      </>
    );
  }
}