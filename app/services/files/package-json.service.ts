import {SourceFilesService} from './source-files.service';
import {environment} from '../../environments/environment';
import {IInput} from '../../shared/interfaces/input.interface';
import {IPackageNode} from '../../shared/interfaces/package-node.interface';
import * as path from 'path';
import * as fs from 'fs';
import {IPackageJsonNodebookParams} from '../../shared/interfaces/package-json-nodebook.interface';

const packageJsonInitialData = environment.config.package;

export class PackageJsonService {
    static readPackageJson(): any {
        const nodebookPath = PackageJsonService.createIfNotExistsAndGet();
        const packageJsonFileContent = fs.readFileSync(nodebookPath, 'utf-8');
        let packageJsonObject;

        try {
            packageJsonObject = JSON.parse(packageJsonFileContent);
        } catch (e) {
            console.error(e);
            fs.writeFileSync(
                nodebookPath,
                JSON.stringify(packageJsonInitialData, null, 2),
                {encoding: 'utf-8'}
            );

            packageJsonObject = packageJsonInitialData;
        }

        return packageJsonObject;
    }

    static getTitle(): string {
        const packageJsonObject = PackageJsonService.readPackageJson();
        const nodebookConfig = packageJsonObject.nodebook;

        let title = nodebookConfig.title;

        if (!title) {
            title = PackageJsonService.updateTitle(packageJsonInitialData.nodebook.title);
        }

        return title;
    }

    static updateTitle(newTitle) {
        const nodebookPath = PackageJsonService.createIfNotExistsAndGet();
        const packageJsonObject = PackageJsonService.readPackageJson();
        const nodebookConfig = packageJsonObject.nodebook;

        nodebookConfig.title = newTitle;
        packageJsonObject.nodebook = nodebookConfig;

        fs.writeFileSync(
            nodebookPath,
            JSON.stringify(packageJsonObject, null, 2),
            {encoding: 'utf-8'}
        );

        return newTitle;
    }

    static loadNodebook(): IInput[] {
        const packageJsonObject = PackageJsonService.readPackageJson();
        const nodebookConfig = packageJsonObject.nodebook;

        if (nodebookConfig && nodebookConfig.nodes && nodebookConfig.nodes.length) {
            let remainingPackageNodes: IPackageJsonNodebookParams[] = [];
            // load files
            const inputNodes: IInput[] = nodebookConfig.nodes.reduce((prev, next) => {
                try {
                    const pathSplit = next.file.split('/');
                    const fileName = pathSplit.pop();
                    const fileNameSplit = fileName.split('.');
                    const extension = fileNameSplit.pop();
                    const name = fileNameSplit.pop();
                    const mode: string = environment.config.input.modes.reduce((prevValue, nextMode) => {
                        if (nextMode.short === extension) {
                            prevValue = nextMode.value.toString();
                        }

                        return prevValue;
                    }, '');
                    const codeContent = fs.readFileSync(next.file, 'utf-8');

                    const input = Object.assign(
                        {},
                        environment.config.input.editableConfig,
                        {
                            id: next.id,
                            name,
                            value: codeContent,
                            context: next.context,
                            mode
                        }
                    );

                    prev.push(input);
                    remainingPackageNodes.push(next);
                } catch (e) {
                    console.error(e);
                }

                return prev;
            }, []);

            if (remainingPackageNodes.length !== nodebookConfig.nodes.length) {
                PackageJsonService.updateNodebookNodes(remainingPackageNodes);
            }

            inputNodes.push({...environment.config.input.editableConfig});

            return inputNodes;
        }

        return [{...environment.config.input.editableConfig}];
    }

    static updateNodebookNodes(params: IPackageJsonNodebookParams[]) {
        const nodebookPath = PackageJsonService.createIfNotExistsAndGet();
        let packageJsonObject = PackageJsonService.readPackageJson();

        packageJsonObject = PackageJsonService.addNodebookItems(packageJsonObject, params);

        fs.writeFileSync(
            nodebookPath,
            JSON.stringify(packageJsonObject, null, 2),
            {encoding: 'utf-8'}
        );
    }

    static removeNodebookItem(id: number) {
        const nodebookPath = PackageJsonService.createIfNotExistsAndGet();
        let packageJsonObject = PackageJsonService.readPackageJson();

        packageJsonObject.nodebook.nodes = packageJsonObject.nodebook.nodes.reduce(
            (prev, next): IPackageNode[] => {
                if (next.id !== id) {
                    prev.push({
                        id: next.id,
                        file: next.file,
                        context: next.context
                    });
                }

                return prev;
            }, []);

        fs.writeFileSync(
            nodebookPath,
            JSON.stringify(packageJsonObject, null, 2),
            {encoding: 'utf-8'}
        );
    }

    static addNodebookItems(packageJsonObject, items): string {
        if (!packageJsonObject.nodebook) {
            packageJsonObject.nodebook = {};
        }

        if (!packageJsonObject.nodebook.nodes) {
            packageJsonObject.nodebook.nodes = [];
        }

        packageJsonObject.nodebook.nodes = items.reduce(
            (prev, next): IPackageNode[] => {
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
        const nodebookPath = `${nodebookInfos.cwd}${nodebookInfos.rootDirectory}${path.sep}package.json`;

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