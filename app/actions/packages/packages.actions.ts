import { IPackages } from '../../shared/interfaces/packages.interface';

export const PACKAGES_STATE = 'PACKAGES_STATE';
export const PACKAGES_CONFIGURE = 'PACKAGES_CONFIGURE';
export const PACKAGES_CANCEL_CONFIGURE = 'PACKAGES_CANCEL_CONFIGURE';
export const PACKAGES_UPDATE = 'PACKAGES_UPDATE';
export const PACKAGES_STAGE_DEPENDENCY = 'PACKAGES_STAGE_DEPENDENCY';
export const PACKAGES_STAGE_DEV_DEPENDENCY = 'PACKAGES_STAGE_DEV_DEPENDENCY';
export const PACKAGES_UPDATE_DEPENDENCIES = 'PACKAGES_UPDATE_DEPENDENCIES';
export const PACKAGES_UPDATE_DEV_DEPENDENCIES = 'PACKAGES_UPDATE_DEV_DEPENDENCIES';
export const PACKAGES_REMOVE_DEPENDENCY = 'PACKAGES_REMOVE_DEPENDENCY';
export const PACKAGES_REMOVE_DEV_DEPENDENCY = 'PACKAGES_REMOVE_DEV_DEPENDENCY';
export const PACKAGES_READ_ALL_DEPENDENCIES = 'PACKAGES_READ_ALL_DEPENDENCIES';
export const PACKAGES_ADD_MESSAGE = 'PACKAGES_ADD_MESSAGE';
export const PACKAGES_REMOVE_MESSAGES = 'PACKAGES_REMOVE_MESSAGES';

export function updateAction(packages: IPackages) {
  return {
    type: PACKAGES_UPDATE,
    payload: packages
  };
}

export function stageDependencyAction(dependency) {
  return {
    type: PACKAGES_STAGE_DEPENDENCY,
    payload: dependency
  };
}

export function stageDevDependencyAction(dependency) {
  return {
    type: PACKAGES_STAGE_DEV_DEPENDENCY,
    payload: dependency
  };
}

export function updateDependenciesAction(dependencies: IPackages['dependencies']) {
  return {
    type: PACKAGES_UPDATE_DEPENDENCIES,
    payload: dependencies
  };
}

export function updateDevDependenciesAction(devDependencies: IPackages['devDependencies']) {
  return {
    type: PACKAGES_UPDATE_DEV_DEPENDENCIES,
    payload: devDependencies
  };
}

export function removeDependencyAction(dependency) {
  return {
    type: PACKAGES_REMOVE_DEPENDENCY,
    payload: dependency
  };
}

export function removeDevDependencyAction(devDependency) {
  return {
    type: PACKAGES_REMOVE_DEV_DEPENDENCY,
    payload: devDependency
  };
}

export function readAllDependenciesAction() {
  return {
    type: PACKAGES_READ_ALL_DEPENDENCIES
  };
}

export function addMessageAction(message) {
  return {
    type: PACKAGES_ADD_MESSAGE,
    payload: message
  };
}

export function removeMessagesAction() {
  return {
    type: PACKAGES_REMOVE_MESSAGES
  };
}

export function configureAction() {
  return {
    type: PACKAGES_CONFIGURE
  };
}

export function cancelConfigureAction() {
  return {
    type: PACKAGES_CANCEL_CONFIGURE
  };
}

export function stateAction() {
  return {
    type: PACKAGES_STATE
  };
}