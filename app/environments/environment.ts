export const environment = {
    config: {
        input: {
            editableConfig: {
                id: 0,
                name: '',
                mode: 'markdown',
                context: '',
                theme: 'github',
                height: '100%',
                width: '100%',
                value: '',
                executeFlag: 'idle',
                editor: {
                    maxLines: Infinity,
                    autoScrollEditorIntoView: true,
                    wrap: true,
                    minLines: 1
                },
                errors: {
                    filename: []
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
            ],
            contexts: [
                {
                    mode: 'javascript',
                    values: [
                        {
                            label: 'Client',
                            value: 'client'
                        },
                        {
                            label: 'Server',
                            value: 'server'
                        }
                    ]
                },
                {
                    mode: 'typescript',
                    values: [
                        {
                            label: 'Client',
                            value: 'client'
                        },
                        {
                            label: 'Server',
                            value: 'server'
                        }
                    ]
                },
                {
                    mode: 'css',
                    values: [
                        {
                            label: 'Local',
                            value: 'local'
                        },
                        {
                            label: 'Global',
                            value: 'global'
                        }
                    ]
                }
            ]
        }
    }
};