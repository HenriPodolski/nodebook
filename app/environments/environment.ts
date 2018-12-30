import { ModeEnums } from '../enums/mode.enums';
import { LoadingEnums } from '../enums/loading.enums';

export const environment = {
  config: {
    loading: {
      [LoadingEnums.components.application]: true
    },
    package: {
      private: true,
      nodebook: {
        title: 'Title',
        nodes: []
      },
      dependencies: {},
      devDependencies: {}
    },
    input: {
      editableConfig: {
        id: 1,
        name: '',
        mode: ModeEnums.md.value,
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
      mode: ModeEnums.md.value,
      modes: [
        {
          value: ModeEnums.md.value,
          title: 'Markdown',
          short: ModeEnums.md.short
        },
        {
          value: ModeEnums.js.value,
          title: 'JavaScript',
          short: ModeEnums.js.short
        },
        {
          value: ModeEnums.ts.value,
          title: 'TypeScript',
          short: ModeEnums.ts.short
        },
        {
          value: ModeEnums.html.value,
          title: 'HTML',
          short: ModeEnums.html.short
        },
        {
          value: ModeEnums.css.value,
          title: 'CSS',
          short: ModeEnums.css.short
        },
        {
          value: ModeEnums.json.value,
          title: 'JSON',
          short: ModeEnums.json.short
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
        }
      ]
    }
  }
};