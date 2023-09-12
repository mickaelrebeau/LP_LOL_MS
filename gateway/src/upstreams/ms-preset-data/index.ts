import { FastifyHttpProxyAlt, NatsProxyAlt } from '../../definitions/index';
import { MsPresetDataBasesRoutes } from './preset-data/base';

export const MsPresetDataRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
    ...MsPresetDataBasesRoutes
]