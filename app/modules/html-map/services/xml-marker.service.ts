export class XmlMarkerService {
  mark(
    rawCodeString: string,
    position: {row: number, column: number},
    mode: string
  ): {startRow: number, startCol: number, endRow: number, endCol: number}[] {
    console.log('mark', rawCodeString, position, mode);
    let markers = [];

    return markers;
  }
}