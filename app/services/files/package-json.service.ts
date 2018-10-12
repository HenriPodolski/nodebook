// import * as fs from 'fs';
import { IFileInfoParameters, SourceFilesService } from './source-files.service';
import * as fs from "fs";

interface IPackageJsonNodebookParams {
	id: number;
	file: string;
	mode: string;
	name: string;
	context: string;
	value: string;
}

const packageJsonInitialData = {
	private: true,
	nodebook: {
		nodes: []
	},
	dependencies: {},
	devDependencies: {}
};

export class PackageJsonService {
	static updateNodebookNodes(params: IPackageJsonNodebookParams[]) {
		if (params[0]) {
			const nodebookPath = PackageJsonService.createIfNotExistsAndGet(params[0]);
			const packageJsonFileContent = fs.readFileSync(nodebookPath, 'utf-8');
			let packageJsonObject = JSON.parse(packageJsonFileContent);

			packageJsonObject = PackageJsonService.addNodebookItems(packageJsonObject,  params);

			fs.writeFileSync(
				nodebookPath,
				JSON.stringify(packageJsonObject, null, 2),
				{encoding: 'utf-8'}
			);
		}
	}

	static addNodebookItems(packageJsonObject, items): string {
		if (!packageJsonObject.nodebook) {
			packageJsonObject.nodebook = {};
		}

		if (!packageJsonObject.nodebook.nodes) {
			packageJsonObject.nodebook.nodes = [];
		}

		packageJsonObject.nodebook.nodes = items.reduce(
			(prev, next) => {
				prev.push({
					id: next.id,
					file: next.file,
					context: next.context
				});

				return prev;
			}, []);

		return packageJsonObject;
	}

	static createIfNotExistsAndGet({value, name, mode, context}: IFileInfoParameters) {
		const nodebookInfos = SourceFilesService.getFileInfos({value, name, mode, context});
		const nodebookPath = `${nodebookInfos.cwd}${nodebookInfos.rootDirectory}/package.json`;

		if (!fs.existsSync(nodebookInfos.cwd + nodebookInfos.rootDirectory)) {
			fs.mkdirSync(nodebookInfos.cwd + nodebookInfos.rootDirectory);
		}

		if (!fs.existsSync(nodebookPath)) {
			fs.writeFileSync(
				nodebookPath,
				JSON.stringify(packageJsonInitialData, null, 2),
				{encoding: 'utf-8'}
			);
		}

		return nodebookPath;
	}
}