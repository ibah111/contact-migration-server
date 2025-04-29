import { ModelCtor } from 'sequelize-typescript';
import DO_Types from './do-types.model';
import Uploaded from './uploaded.model';

export const models: ModelCtor[] = [DO_Types, Uploaded];
