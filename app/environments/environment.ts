export const environment = {
    config: {
        input: {
            editableConfig: {
                id: 0,
                mode: 'markdown',
                theme: 'github',
                height: '100%',
                width: '100%',
                value: '',
                readOnly: false,
                executeFlag: 'idle',
                editor: {
                    maxLines: Infinity,
                    autoScrollEditorIntoView: true,
                    wrap: true,
                    minLines: 1
                }
            },
            mode: 'markdown',
            modes: [
                {
                    value: 'markdown',
                    title: 'Markdown',
                    short: 'md'
                },
                {
                    value: 'javascript',
                    title: 'JavaScript',
                    short: 'js'
                },
                {
                    value: 'typescript',
                    title: 'TypeScript',
                    short: 'ts'
                },
                {
                    value: 'html',
                    title: 'HTML',
                    short: 'html'
                },
                {
                    value: 'css',
                    title: 'CSS',
                    short: 'css'
                },
                {
                    value: 'json',
                    title: 'JSON',
                    short: 'json'
                },
            ]
        }
    }
};