import { InputEnums } from '../enums/input.enums';
import { IErrorsInterface } from '../shared/interfaces/errors.interface';
import { ErrorsEnums } from '../enums/errors.enums';
import { ModeEnums } from '../enums/mode.enums';
import { IInput } from '../shared/interfaces/input.interface';

export const isValidFilename = (validateInput: IInput) => {
    return /^(?!\.)(?!com[0-9]$)(?!con$)(?!lpt[0-9]$)(?!nul$)(?!prn$)[^\|\*\?\\:<>/$"]*[^\.\|\*\?\\:<>/$"]+$/
        .test(validateInput.name);
};

export const isUniqueInputInArray = (validateInput: IInput, inputs: IInput[]) => {
    return !(inputs
        .filter(filteredInput => {
            return filteredInput.id !== validateInput.id &&
                   filteredInput.name === validateInput.name &&
                   filteredInput.mode === validateInput.mode &&
                   (!validateInput.context || filteredInput.context === validateInput.context)
        }).length);
};

export const isFlaggedForFilenameValidation = (validateInput: IInput) => {
    return validateInput.executeFlag === InputEnums.executeFlags.processing;
};

export const isFlaggedForCodeValidation = (validateInput: IInput) => {
    return validateInput.executeFlag === InputEnums.executeFlags.processing;
};

export const isHTMLMode = (validateInput: IInput) => {
    return validateInput.mode === ModeEnums.html.value
};

export const isHTMLBodyPartial = (validateInput: IInput) => {
    return !/<\s*\/?(html|body|head)[^>]*>/gm.test(validateInput.value);
};

export const validateFilename = (validateInput) => {
    let validationErrors: IErrorsInterface[] = [];
    if (!isValidFilename(validateInput)) {
        validationErrors.push({
            type: ErrorsEnums.types.FilenameNotValidError,
            message: 'filename not valid'
        });

        console.log('validateFilename', validationErrors);
    }
    return validationErrors;
};

export const validateUniqnessInArray = (validateInput: IInput, inputs) => {
    let validationErrors: IErrorsInterface[] = [];
    if (!isUniqueInputInArray(validateInput, inputs)) {
        validationErrors.push({
            type: ErrorsEnums.types.FilenameNotUniqueError,
            message: 'filename not unique'
        });
    }
    return validationErrors;
};

export const validateHTMLBodyPartial = (validateInput) => {
    let validationErrors: IErrorsInterface[] = [];
    if (!isHTMLBodyPartial(validateInput)) {
        validationErrors.push({
            type: ErrorsEnums.types.CodeNotHtmlBodyPartialError,
            message: 'code is not a valid HTML body partial, <html>, <head>, <body> cannot be used'
        });
    }
    return validationErrors;
};

export const doFilenameInputValidations = (validateInput: IInput, inputs: IInput[]) => {
    let validationErrors: IErrorsInterface[] = [];

    if (isFlaggedForFilenameValidation(validateInput)) {
        validationErrors = [
            ...validationErrors,
            ...validateFilename(validateInput)
        ];

        const hasFilenameError = Boolean(
            validationErrors.find(
                (err) => err.type === ErrorsEnums.types.FilenameNotValidError
            )
        );
        if (!hasFilenameError) {
            validationErrors = [
                ...validationErrors,
                ...validateUniqnessInArray(validateInput, inputs)
            ];
        }
    }

    return validationErrors;
};

export const doCodeInputValidations = (validateInput: IInput) => {
    let validationErrors: IErrorsInterface[] = [];

    if (isFlaggedForCodeValidation(validateInput)) {
        if (isHTMLMode(validateInput)) {
            validationErrors = [
                ...validationErrors,
                ...validateHTMLBodyPartial(validateInput)
            ];
        }
    }

    return validationErrors;
};

export const inputValidators = (validateInput: IInput, inputs: IInput[]) => {
    let validationErrors: {[key: string]: any} = {};

    validationErrors.filename = doFilenameInputValidations(validateInput, inputs);
    validationErrors.code = doCodeInputValidations(validateInput);

    const isValidFilename = validationErrors.filename.length === 0;
    const isValidCode = validationErrors.code.length === 0;
    const isValid = isValidFilename && isValidCode;

    return {
        validationErrors,
        isValidFilename,
        isValidCode,
        isValid
    };
};