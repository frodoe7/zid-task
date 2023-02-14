import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpStatus,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface Response<T> {
  data?: T;
  success?: boolean;
  error?: string;
}

@Injectable()
export class TransformationInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();

        if (data.hasOwnProperty('error') || data.data === null) {
          response.status(HttpStatus.BAD_REQUEST);
          return { success: false, error: data.error || 'Not Found' };
        } else {
          response.status(HttpStatus.OK);
          return { success: true, data: data.data };
        }
      }),
    );
  }
}
