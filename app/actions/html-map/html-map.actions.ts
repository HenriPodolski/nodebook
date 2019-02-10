export const HTML_MAP_START_EXTERNAL = 'HTML_MAP_START_EXTERNAL';

export function startExternalAction(payload: {index: number, browserWindow: any}) {
    return {
        type: HTML_MAP_START_EXTERNAL,
        payload
    };
}