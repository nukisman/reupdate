/* Created by Alexander Nuikin (nukisman@gmail.com). */

import toPath from 'lodash.topath';

import replaceAt from './replaceAt';

export default (src, path) => replaceAt(src, toPath(path), undefined);
