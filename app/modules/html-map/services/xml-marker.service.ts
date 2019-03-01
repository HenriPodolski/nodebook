// get number of lines
// getToken for all lines and concat array
// get cursor position
// get token at cursor position row and col
// find out if start tag, end tag or somewhere
// if start or end tag find corresponding tag and replace mark everthing including the tags
// if start or end tag and insert
// if somewhere and replace mode find parent start tag and end tag and mark all space in between
// if somewhere and insert before or after add 3 spaces into the document before or after cursor and mark

import { IMarkerType } from '../interfaces/marker.interface';

export class XmlMarkerService {
  mark(
    rawCodeString: string,
    position: {row: number, column: number},
    mode: string
  ): IMarkerType[] {
    let markers = [];
    const codeLines = this.getCodeLinesArray(rawCodeString);
    const positionSurrounding = this.checkPositionEnvironment(codeLines, position);

    console.log(positionSurrounding);

    return markers;
  }

  getCodeLinesArray(code: string) {
    return code.split(/\n/);
  }

  checkPositionEnvironment(codeLines, position) {
    const { row, column } = position;

    this.walkThrough(codeLines, row, column);

    return;
  }

  walkThrough(codeLines, currentRow: number, currentCol: number) {
    let walking = true;
    let hasResult = false;
    let canWalkLine = true;
    let canWalkRow = true;
    let iteratorColBackward = 0;
    let iteratorRowBackward = currentRow;
    let iteratorColForward = 0;
    let iteratorRowForward = currentRow;
    let colBackward = currentCol;
    let colForward = currentCol;

    while(walking) {
      const isRowStartColumn = colBackward - iteratorColBackward === -1;
      const isRowEndColumn = colForward + iteratorColForward === codeLines[iteratorRowForward].length;

      if (isRowStartColumn) {
        iteratorRowBackward--;
        iteratorColBackward = 0;
        colBackward = codeLines[iteratorRowBackward].length;
      } else {
        console.log('Backward:', codeLines[iteratorRowBackward][colBackward - iteratorColBackward]);
        iteratorColBackward++;
      }

      if (isRowEndColumn) {
        iteratorRowForward++;
        iteratorColForward = 0;
        colForward = -1;
      } else {
        console.log('Forward:', codeLines[iteratorRowForward][colForward + iteratorColForward]);
        iteratorColForward++;
      }

      canWalkLine = !(isRowStartColumn && isRowEndColumn);
      canWalkRow = (iteratorRowBackward >= 0) && (iteratorRowForward < codeLines.length);
      walking = canWalkLine && canWalkRow && !hasResult;
    }
  }
}