/* eslint-disable prettier/prettier */
process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import validateEnv from '@utils/validateEnv';
import { MsAuthRoutes } from './upstreams/ms-test';
import { MsExchangesRoutes } from './upstreams/ms-exchange';
import { MsCustomdataRoutes } from './upstreams/ms-customdata';
import { MsPresetDataRoutes } from './upstreams/ms-preset-data';
import { MsTokenRoutes } from './upstreams/ms-token';

validateEnv();

try {
  new App([
    { ms: 'ms-auth', routes: MsAuthRoutes },
    { ms: 'ms-exchanges', routes: MsExchangesRoutes },
    { ms: 'ms-customdata', routes: MsCustomdataRoutes },
    { ms: 'ms-preset-data', routes: MsPresetDataRoutes},
    { ms: 'ms-token', routes: MsTokenRoutes}
  ]);

} catch (e) {

}
