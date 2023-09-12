import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HermesService {

    constructor(
        @Inject('Hermes')
        private hermes :ClientProxy,
    ){}


    async emit(cmd : string, payload : any): Promise<void>{ /// elle envoie des infos (payload ) au mot clé (cmd ) et n'attend pas de réponse
        this.hermes.emit(cmd,payload)
    }

    async send(cmd: string, payload : any): Promise<any>{

        const t = await firstValueFrom(this.hermes.send(cmd, payload))

        return t;
    }

    

}
