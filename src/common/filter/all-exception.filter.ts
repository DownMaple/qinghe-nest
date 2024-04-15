/* all-exception.filter.ts */

// 引入所需内置对象
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'


// 们需要访问底层平台`Request`和`Response`
import { Request, Response } from 'express'
import moment from 'moment'
import { QueryFailedError } from 'typeorm'



// 它负责捕获作为`HttpException`类实例
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    let message:string, code:number;
    if (typeof exception.getResponse() !== 'string') {
       let resp = exception.getResponse() as any;
       message = resp.message;
       code = resp.statusCode;
    } else {
      message = exception.getResponse().toString();
      code = status;
    }
    // 用于接收主动发错的错误信息
    response.status(200).json({
      code,
      timestamp:moment().format('YYYY-MM-DD HH:mm:ss'),
      path: request.url,
      error: 'Bad Request',
      message,
    });
  }
}

/* 使用 */
// import { HttpException } from '@nestjs/common';
// // 主动处罚异常
// throw new HttpException('请求失败', 500);

/**
 * 数据库异常
 */
@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // 提取错误信息
    const message = exception.message; // "Field 'title' doesn't have a default value"

    // 自定义错误响应体
    const errorResponse = {
      code: HttpStatus.BAD_REQUEST,
      message: `Error: ${message}`,
      error: 'Bad Request',
      timestamp:moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    // 将错误信息返回给前端
    response.status(200).json(errorResponse);
  }
}