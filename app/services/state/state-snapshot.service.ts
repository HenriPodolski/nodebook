export class StateSnapShotService {
    static getAllOutputsBeforeIndex(state, index) {
        return state.outputs.filter(output => {
            return output.id < index;
        });
    }

    static getAllOutputsBeforeIndexWithSpecifiedModes(state, index, modes) {
        return state.outputs.filter(output => {
            return output.id < index && modes.includes(output.mode);
        });
    }
}