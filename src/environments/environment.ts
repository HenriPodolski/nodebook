export const environment = {
    config: {
        editor: {
            editableConfig: {
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
            displayConfig: {
                mode: 'markdown',
                theme: 'github',
                height: '100%',
                width: '100%',
                value: '',
                readOnly: true,
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
                    title: 'Markdown'
                },
                {
                    value: 'javascript',
                    title: 'JavaScript'
                },
                {
                    value: 'typescript',
                    title: 'TypeScript'
                },
                {
                    value: 'html',
                    title: 'HTML'
                },
                {
                    value: 'css',
                    title: 'CSS'
                },
                {
                    value: 'json',
                    title: 'JSON'
                },
            ]
        }
    }
};