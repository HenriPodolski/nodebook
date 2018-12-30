export const CONTROLS_DELETE_ENTRY_INTENTION = 'CONTROLS_DELETE_ENTRY_INTENTION';
export const CONTROLS_DELETE_ENTRY = 'CONTROLS_DELETE_ENTRY';

export function deleteIntentionAction(index) {
    return {
        type: CONTROLS_DELETE_ENTRY_INTENTION,
        index
    };
}

export function deleteAction(index, deleteFile: boolean) {
	return {
		type: CONTROLS_DELETE_ENTRY,
		index,
        deleteFile
	};
}