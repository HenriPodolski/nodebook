import * as React from 'react';
import { CodeInputContainer } from '../containers/input/code-input.container';
import { ModeInputContainer } from '../containers/input/mode-input.container';
import { OutputContainer } from '../containers/output/output.container';
import { DebugContainer } from '../containers/debug.container';
import { OutputFilenameContainer } from '../containers/output/output-filename.container';
import { OutputEnums } from '../enums/output.enums';
import { ContextInputContainer } from '../containers/input/context-input.container';
import { DeleteEntryContainer } from '../containers/controls/delete-entry.container';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ModeEnums } from '../enums/mode.enums';

interface IComponentProps {
  inputs: any[];
  outputs: any[];
  debug: boolean;
  reorder: (payload: {sourceId: number, targetId: number}) => {
    type: string, payload: {sourceId: number, targetId: number}
  };
}

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  background: isDragging ? 'lightgreen' : 'inherit',
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'inherit'
});

export class InputsComponent extends React.Component<IComponentProps> {

  constructor(props: IComponentProps) {
    super(props);

    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  onMapHTML() {
      let modal = window.open('', 'modal');
      console.log(modal);
  }

  handleDragEnd(result) {
    if (!result.destination) {
      return;
    }

    this.props.reorder({
      sourceId: result.source.index,
      targetId: result.destination.index
    });
  }

  ioItem(i) {
    return (
      <>
        {this.props.outputs[i] &&
        this.props.outputs[i].executeFlag === OutputEnums.executeFlags.processed &&
        <DeleteEntryContainer index={i}/>}
        {(!this.props.outputs[i] ||
          this.props.outputs[i].executeFlag !== OutputEnums.executeFlags.processed) &&
        <OutputFilenameContainer index={i}/>}
        {(!this.props.outputs[i] ||
          this.props.outputs[i].executeFlag !== OutputEnums.executeFlags.processed) &&
        <>
          <ModeInputContainer index={i}/>
          <ContextInputContainer index={i}/>
        </>
        }
        {(this.props.inputs[i].mode === ModeEnums.html.value &&
          this.props.inputs.filter((input) => input.mode === ModeEnums.html.value).length > 1) &&
            <>
              <button onClick={this.onMapHTML}>Map HTML</button> mapping: {this.props.inputs[i].context || 'body > *:nth-child(x)'}
            </>
        }
        <CodeInputContainer index={i}/>
        {this.props.outputs[i] &&
        this.props.outputs[i].executeFlag === OutputEnums.executeFlags.processed &&
        <OutputContainer index={i}/>}
      </>
    );
  }

  render() {
    return (
      <>
        <DragDropContext onDragEnd={this.handleDragEnd}>
          <DebugContainer inputs={this.props.inputs}/>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.props.inputs
                  .filter((input, index) => {
                    return (this.props.inputs.length - 1) > index;
                  })
                  .map((dataset, i) => (
                    <Draggable key={dataset.id} draggableId={dataset.id} index={i}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {this.ioItem(i)}
                        </div>
                      )}
                    </Draggable>
                  )
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div>
          <div>
            {this.ioItem(this.props.inputs.length - 1)}
          </div>
        </div>
      </>
    );
  }
}