import { isString } from '../../utils';
import {
  createDirectionMapStyleFactory,
  createStringStyleFactory
} from './common';

export const createMarginStyle = createDirectionMapStyleFactory(
  'margin',
  'margin',
  isString,
  property => createStringStyleFactory(property, 'margin')
);