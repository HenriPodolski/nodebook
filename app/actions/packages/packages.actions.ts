import { IPackages } from '../../shared/interfaces/packages.interface';

export const PACKAGES_STATE = 'PACKAGES_STATE';
export const PACKAGES_CONFIGURE = 'PACKAGES_CONFIGURE';
export const PACKAGES_CANCEL_CONFIGURE = 'PACKAGES_CANCEL_CONFIGURE';
export const PACKAGES_UPDATE = 'PACKAGES_UPDATE';
export const PACKAGES_UPDATE_DEPENDENCY = 'PACKAGES_UPDATE_DEPENDENCY';
export const PACKAGES_STAGE_DEPENDENCY = 'PACKAGES_STAGE_DEPENDENCY';
export const PACKAGES_ADD_DEPENDENCY = 'PACKAGES_ADD_DEPENDENCY';
export const PACKAGES_REMOVE_DEPENDENCY = 'PACKAGES_REMOVE_DEPENDENCY';
export const PACKAGES_UPDATE_DEV_DEPENDENCY = 'PACKAGES_UPDATE_DEV_DEPENDENCY';
export const PACKAGES_STAGE_DEV_DEPENDENCY = 'PACKAGES_STAGE_DEV_DEPENDENCY';
export const PACKAGES_ADD_DEV_DEPENDENCY = 'PACKAGES_ADD_DEV_DEPENDENCY';
export const PACKAGES_REMOVE_DEV_DEPENDENCY = 'PACKAGES_REMOVE_DEV_DEPENDENCY';
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

export function addDependencyAction(dependency) {
  return {
    type: PACKAGES_ADD_DEPENDENCY,
    payload: dependency
  };
}

export function removeDependencyAction(dependency) {
  return {
    type: PACKAGES_REMOVE_DEPENDENCY,
    payload: dependency
  };
}

export function updateDependencyAction(dependency) {
  return {
    type: PACKAGES_UPDATE_DEPENDENCY,
    payload: dependency
  };
}

export function stageDevDependencyAction(dependency) {
  return {
    type: PACKAGES_STAGE_DEV_DEPENDENCY,
    payload: dependency
  };
}

export function addDevDependencyAction(devDependency) {
  return {
    type: PACKAGES_ADD_DEV_DEPENDENCY,
    payload: devDependency
  };
}

export function removeDevDependencyAction(devDependency) {
  return {
    type: PACKAGES_REMOVE_DEV_DEPENDENCY,
    payload: devDependency
  };
}

export function updateDevDependencyAction(devDependency) {
  return {
    type: PACKAGES_UPDATE_DEV_DEPENDENCY,
    payload: devDependency
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