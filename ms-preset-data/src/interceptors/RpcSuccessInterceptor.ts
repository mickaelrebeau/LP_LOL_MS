
import { Injectable, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';

interface responsePayloadNatsInterface {
    paginate?: object;
    statusCode?: number;
    datas: any;
}

function responsePayloadNat(values: any): responsePayloadNatsInterface {

    const payload = {} as responsePayloadNatsInterface;
    if (values?.paginate) {
        payload.paginate = values.paginate;
        delete values.paginate;
    }
    if (values?.code) {
        payload.statusCode = values.code;
        delete values.code;
    }
    
    payload.datas = Array.isArray(values) ? values : (Object.keys(values).length === 1 ? getFirstValue(values) : { ...JSON.parse(JSON.stringify(values)) })
    console.log("🚀 ~ file: RpcSuccessInterceptor.ts ~ line 24 ~ responsePayloadNat ~ payload.datas", payload.datas)

    return payload;
}

function getFirstValue(values: Object): string {
    return values[Object.keys(values)[0]];
}
@Injectable()
export class RpcSuccessInterceptor {
    intercept(_context: ExecutionContext, next: CallHandler) {
        return next
            .handle()
            .pipe(map(value => responsePayloadNat(value)));

    }
}

