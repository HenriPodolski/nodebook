import * as React from 'react';
import AceEditor, { AceOptions, EditorProps } from 'react-ace';
import { environment } from '../../../environments/environment';
import '../../../shared/imports/brace';
// import * as ace from 'brace';
import { XmlMarkerService } from '../services/xml-marker.service';
import { IMarkerType } from '../interfaces/marker.interface';
import { PlacementEnums } from '../enums/placement.enums';

// const Range = ace.acequire('ace/range').Range;

interface IComponentProps {

}

export class HtmlMapComponent extends React.Component<IComponentProps> {

  state;

  editorRef;

  constructor(props) {
    super(props);

    this.handleOpenerMessage = this.handleOpenerMessage.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
    this.handleEditorClick = this.handleEditorClick.bind(this);

    const defaultMode = Object.keys(PlacementEnums.modes)
      .find(key => PlacementEnums.modes[key] === PlacementEnums.modes.after);

    this.state = {
      height: environment.config.input.editableConfig.height,
      mode: defaultMode,
      markerSelected: false,
      type: '',
      payload: {
        document: '',
        markerQuery: 'body > *',
        markers: []
      }
    };

    console.log(PlacementEnums.modes);

    this.editorRef = React.createRef();

    this.listenToOpenerMessages();
  }

  listenToOpenerMessages() {
    if (window.opener) {
      window.addEventListener('message', this.handleOpenerMessage);
      window.opener.postMessage('ready', window.location.origin);
    }
  }

  handleOpenerMessage(evt) {
    const isSameOrigin = window.location.origin === evt.origin;
    const isStringData = typeof evt.data === 'string';

    if (!isSameOrigin || !isStringData) {
      return;
    }

    try {
      const data = JSON.parse(evt.data);

      if (data.type && data.type === 'htmlStringData') {
        data.payload.markers = data.payload.markers || [];
        this.setState({type: data.type});
        this.setState({payload: {...data.payload}});
      }
    } catch (e) {
      console.log(evt.data);
      throw new Error(e);
    }
  }

  handleClearClick() {
    this.setState({markers: []});
    this.setState({markerSelected: false});
  }

  handleCancelClick() {
    window.close();
  }

  handleSaveClick() {
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
    this.setState({markerSelected: true}, this.handleMarkerValuesChange);
  }

  handleMarkerValuesChange() {
    const editor = this.editorRef.current.editor;
    // const editSession = editor.getSession();
    const cursorPosition = editor.getCursorPosition();
    const xmlMarkerService = new XmlMarkerService();
    
    const markers: IMarkerType[] = xmlMarkerService.mark(
      this.state.payload.document,
      cursorPosition,
      this.state.mode
    );

    this.setState(
      {
        ...this.state,
        payload: {
        ...this.state.payload,
        markers
    }});


    // docs: https://ace.c9.io/#nav=api&api=edit_session

    // get number of lines
    // getToken for all lines and concat array
    // get cursor position
    // get token at cursor position row and col
    // find out if start tag, end tag or somewhere
    // if start or end tag find corresponding tag and replace mark everthing including the tags
    // if start or end tag and insert
    // if somewhere and replace mode find parent start tag and end tag and mark all space in between
    // if somewhere and insert before or after add 3 spaces into the document before or after cursor and mark

    // console.log(
    //   Range,
    //   JSON.stringify(this.state, null, 4),
    //   this.state.payload.document,
    //   editSession.getLength(),
    //   JSON.stringify(editSession.getTokens(cursorPosition.row), null, 4),
    //   editor.getCursorPosition(),
    //   editSession.getTokenAt(cursorPosition.row, cursorPosition.column));
  }

  handleModeChange(event) {
    console.log('handleModeChange', this.state);
    this.setState({mode: event.target.value}, () => {
      if (this.state.markerSelected) {
        this.handleMarkerValuesChange();
      }
    });
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

  componentWillUnmount() {
    this.setState({markerSelected: false});
    window.removeEventListener('message', this.handleOpenerMessage);
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
    const markers = this.state.payload.markers
      .map((markerVals) => Object.assign(markerVals, {
        className: 'selection-marker', type: 'background'
      }));

    return (
      <>
        <form>
          <fieldset>
            <label>Placement mode</label>
            <select value={this.state.mode} onChange={this.handleModeChange}>
              {Object.keys(PlacementEnums.modes)
                .map((mode, i) => {
                  return (
                    <option key={i} value={mode}>{PlacementEnums.modes[mode]}</option>
                  );
                })}
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
            markers={markers}
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