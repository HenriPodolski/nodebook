import * as React from 'react';
import AceEditor, { AceOptions, EditorProps } from 'react-ace';
import { environment } from '../../../environments/environment';
import '../../../shared/imports/brace';
import * as ace from 'brace';

const Range = ace.acequire('ace/range').Range;

interface IComponentProps {

}

export class HtmlMapComponent extends React.Component<IComponentProps> {

  state;

  editorRef;

  constructor(props) {
    super(props);

    this.handleEditorClick = this.handleEditorClick.bind(this);

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
        const isSameOrigin = window.location.origin === evt.origin;
        const isStringData = typeof evt.data === 'string';

        if (!isSameOrigin || !isStringData) {
          return;
        }

        try {
          const data = JSON.parse(evt.data);

          if (data.type && data.type === 'htmlStringData') {
            this.setState(data);
          }
        } catch (e) {
          console.log(evt.data);
          throw new Error(e);
        }
      });

      window.opener.postMessage('ready', window.location.origin);
    }
  }

  handleClearClick() {
    console.log('handleClearClick');
  }

  handleCancelClick() {
    console.log('handleCancelClick');
    window.close();
  }

  handleSaveClick() {
    console.log('handleSaveClick');
    window.close();
  }

  handleEditorChange(newValue, evt) {
    this.setState((prevState: any, props) => ({
      ...prevState,
      height: this.getHeight(),
      payload: {
        ...prevState.payload,
        document: newValue
      }
    }));
  }

  handleEditorClick() {
    const editor = this.editorRef.current.editor;
    const editSession = editor.getSession();
    const cursorPosition = editor.getCursorPosition();

    // docs: https://ace.c9.io/#nav=api&api=edit_session

    console.log('click',
      Range,
      JSON.stringify(editSession.getTokens(cursorPosition.row), null, 4),
      editor.getCursorPosition(),
      editSession.getTokenAt(cursorPosition.row, cursorPosition.column));
  }

  getHeight() {
    const editor = this.editorRef.current.editor;
    let height = this.state.height;

    if (editor) {
      let newHeight = editor.getSession().getScreenLength() *
        (editor.renderer.lineHeight + editor.renderer.scrollBar.getWidth());

      height = `${newHeight}px`;
    }

    return height;
  }

  componentDidUpdate() {
    const editor = this.editorRef.current.editor;
    editor.container.style.lineHeight = 3;
    editor.renderer.$cursorLayer.element.style.display = 'none';
    editor.setShowFoldWidgets(false);
    editor.setShowPrintMargin(false);
    editor.renderer.setStyle('disabled', true);
    editor.renderer.updateFontSize();
    editor.container.style.height = this.getHeight();
    editor.session.setOption('useWorker', false);
    editor.renderer.setStyle('disabled', true);
    editor.resize();
  }

  render() {
    const aceConfig = Object.assign({},
      environment.config.input.editableConfig, {
        showLineNumbers: true,
        displayIndentGuides: false,
        highlightGutterLine: true,
        highlightActiveLine: true,
        autoScrollEditorIntoView: true,
        wrap: false,
      });
    const optionProps = Object.assign({},{
      selectionStyle: 'line',
      behavioursEnabled: false,
      wrapBehavioursEnabled: false
    }) as AceOptions;

    return (
      <>
        <form>
          <fieldset>
            <label>Placement mode</label>
            <select defaultValue="after">
              <option value="before">Insert before</option>
              <option value="replace">Replace</option>
              <option value="after">Insert after</option>
            </select>
            <button onClick={this.handleClearClick} type="button">Clear</button>
            <button onClick={this.handleCancelClick} type="button">Cancel</button>
            <button onClick={this.handleSaveClick} type="button">Save</button>
          </fieldset>
        </form>
        <div onClick={this.handleEditorClick}>
          <AceEditor
            ref={this.editorRef}
            className="app-html-map-editor"
            enableBasicAutocompletion={false}
            enableLiveAutocompletion={false}
            highlightActiveLine={true}
            wrapEnabled={false}
            markers={[
              { startRow: 0, startCol: 2, endRow: 1, endCol: 20, className: 'selection-marker', type: 'background' }
              ]}
            value={this.state.payload.document}
            onChange={(newValue, evt) => this.handleEditorChange(newValue, evt)}
            theme={aceConfig.theme}
            mode="html"
            height={aceConfig.height}
            width={aceConfig.width}
            editorProps={aceConfig.editor as EditorProps}
            setOptions={optionProps}
            readOnly={true}
          />
       </div>
      </>
    );
  }
}