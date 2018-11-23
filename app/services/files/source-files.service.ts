import * as fs from 'fs';
import { environment } from '../../environments/environment';
import { ISourceFileInfos } from '../../shared/interfaces/source-file.interface';
import * as path from 'path';

export interface IFileInfoParameters {
	value: string;
	name: string;
	mode: string;
	context: string;
}

export class SourceFilesService {

	static getNodebookFolderInfos() {
		const rootDirectory = path.sep + 'nodebook';
		const cwd = process.cwd();
		const relativeSourceDirectory = rootDirectory + path.sep + 'src' + path.sep;

		return {
			rootDirectory,
			cwd,
			relativeSourceDirectory,
			absoluteSourceDirectory: relativeSourceDirectory
		};
	}

	static getFileInfos({value, name, mode, context}: IFileInfoParameters): ISourceFileInfos {
		const {
			rootDirectory,
			cwd,
			relativeSourceDirectory,
			absoluteSourceDirectory
		} = SourceFilesService.getNodebookFolderInfos();

		const nodebookContextDirectory = relativeSourceDirectory + (context ?
			context + path.sep : path.sep);
		const modeObject = environment.config.input.modes.find((extMode) => {
			return extMode.value === mode;
		}) || {short: 'txt'};
		const extension = modeObject.short;
		const relativeFilePath = '.' + nodebookContextDirectory + modeObject.short + path.sep + name + '.' + modeObject.short;
		const absoluteFilePath = cwd + nodebookContextDirectory + modeObject.short + path.sep + name + '.' + modeObject.short;

		return {
			rootDirectory,
			nodebookContextDirectory,
			relativeSourceDirectory,
			absoluteSourceDirectory,
			relativeFilePath,
			absoluteFilePath,
			extension,
			size: (new Blob([value]).size),
			cwd: cwd
		};
	}

	static createIfNotExists (
		value: string,
		name: string,
		mode: string,
		context: string
	): ISourceFileInfos {
		const fileInfos = SourceFilesService.getFileInfos({value, name, mode, context});

        const modeObject = environment.config.input.modes.find((extMode) => {
            return extMode.value === mode;
        }) || {short: 'txt'};

		if (!fs.existsSync(fileInfos.cwd + fileInfos.rootDirectory)) {
			fs.mkdirSync(fileInfos.cwd + fileInfos.rootDirectory);
		}

		if (!fs.existsSync(fileInfos.cwd + fileInfos.absoluteSourceDirectory)) {
			fs.mkdirSync(fileInfos.cwd + fileInfos.absoluteSourceDirectory);
		}

		if (!fs.existsSync(fileInfos.cwd + fileInfos.nodebookContextDirectory)) {
			fs.mkdirSync(fileInfos.cwd + fileInfos.nodebookContextDirectory);
		}

        if (!fs.existsSync(fileInfos.cwd + fileInfos.nodebookContextDirectory + modeObject.short)) {
            fs.mkdirSync(fileInfos.cwd + fileInfos.nodebookContextDirectory + modeObject.short);
        }

		fs.writeFileSync(
			fileInfos.cwd + fileInfos.nodebookContextDirectory + modeObject.short + path.sep + name + '.' + fileInfos.extension,
			value,
			{encoding: 'utf-8'}
		);

		return fileInfos;
	}
}
