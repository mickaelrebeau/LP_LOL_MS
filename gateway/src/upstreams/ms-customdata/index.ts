import { FastifyHttpProxyAlt, NatsProxyAlt } from '@/definitions';
import { MsCustomdataBasesRoutes } from './data/base';
import { MsCustomdataGroupBasesRoutes } from './group/base';
import { MsCustomdataDataSharingAdditionnalBasesRoutes } from './data_sharing_additionnal/base';
import { MsCustomdataDatasOneUserBasesRoutes } from './datas_one_user/base';

export const MsCustomdataRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
    ...MsCustomdataBasesRoutes,
    ...MsCustomdataGroupBasesRoutes,
    ...MsCustomdataDataSharingAdditionnalBasesRoutes,
    ...MsCustomdataDatasOneUserBasesRoutes
];
