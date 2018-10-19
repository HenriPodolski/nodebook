// import * as fs from 'fs';
import { SourceFilesService } from './source-files.service';
import * as fs from "fs";
import { environment } from '../../environments/environment';
import { IInput } from '../../shared/interfaces/input.interface';

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
		title: '',
		nodes: []
	},
	dependencies: {},
	devDependencies: {}
};

export class PackageJsonService {
	static loadNodebook(): IInput[] {
		const nodebookPath = PackageJsonService.createIfNotExistsAndGet();
		const packageJsonFileContent = fs.readFileSync(nodebookPath, 'utf-8');
		const packageJsonObject = JSON.parse(packageJsonFileContent);
		const nodebookConfig = packageJsonObject.nodebook;

		if (nodebookConfig && nodebookConfig.nodes && nodebookConfig.nodes.length) {

				// load files
				const inputNodes: IInput[] = nodebookConfig.nodes.map((node) => {
				const pathSplit = node.file.split('/');
				const fileName = pathSplit.pop();
				const fileNameSplit = fileName.split('.');
				const extension = fileNameSplit.pop();
				const name = fileNameSplit.pop();
				const mode: string = environment.config.input.modes.reduce((prev, next) => {
					if (next.short === extension) {
						prev = next.value.toString();
					}

					return prev;
				}, '');

				const input = Object.assign(
					{},
					environment.config.input.editableConfig,
					{
						id: node.id,
						name,
						value: fs.readFileSync(node.file, 'utf-8'),
						context: node.context,
						mode
					}
				);

				return input;
			});

			inputNodes.push({...environment.config.input.editableConfig});

			return inputNodes;
		}

		return [{...environment.config.input.editableConfig}];
	}

	static updateNodebookNodes(params: IPackageJsonNodebookParams[]) {
		if (params[0]) {
			const nodebookPath = PackageJsonService.createIfNotExistsAndGet();
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

	static createIfNotExistsAndGet() {
		const nodebookInfos = SourceFilesService.getNodebookFolderInfos();
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