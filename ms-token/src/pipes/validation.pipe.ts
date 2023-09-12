import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) this.proccedErrors(errors);
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private proccedErrors(errors: ValidationError[]): void {
    const responseError = [];
    for (const error of errors) {
      if (error.children.length > 0) {
        const obj = {
          property: error.property,
          nestedErrors: [],
        };
        for (const child of error.children)
          obj.nestedErrors.push({
            property: child.property,
            constraints: child.constraints,
          });
        responseError.push(obj);
      } else {
        const obj = {
          property: error.property,
          constraints: error.constraints,
        };
        console.log('obj', obj);
        responseError.push(obj);
      }
    }
    throw new RpcException({
      message: responseError,
      statusCode: 403,
    });
  }
}
