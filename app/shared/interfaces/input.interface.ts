import { IErrorsInterface } from './errors.interface';

export interface IInput {
    id: number;
    name: string;
    mode: string;
    theme: string;
    height: string;
    width: string;
    value: string;
    executeFlag: string;
    editor: IInputEditor;
    errors: {[key: string]: IErrorsInterface[]}
}

export interface IInputEditor {
    maxLines: number;
    autoScrollEditorIntoView: boolean;
    wrap: boolean;
    minLines: number;
}