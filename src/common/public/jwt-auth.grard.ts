import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { IS_PUBLIC_KEY } from '@/common/public/public.decorator'
import { JwtService } from '@nestjs/jwt'
import { jwtConstants } from '@/common/config/jwtConstants'
import { getRedisString } from '@/common/public/redis'
import { Request } from 'express'


@Injectable()
export class jwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // 获取请求头部数据
    const request = context.switchToHttp().getRequest()
    const whitelist = this.hasUrl(this.urlList, request.url)
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    // 白名单 或者 public
    if (whitelist || isPublic) return true
    // 获取请求头中的 authorization 字段
    if (!request.headers['authorization']) {
      throw new HttpException('没有授权访问，请先登陆', 99);
    }
    let token = request.headers['authorization'].replace('Bearer ', '')
    // 验证token的合理性以及根据token做响应的操作
    return this.validateToken(token, request)
  }

  private async validateToken(token: string, request: Request): Promise<boolean> {
    try {
      // 确保 token 格式正确，这里可以根据实际需要添加更详细的验证逻辑
      if (!token || typeof token !== 'string') {
        throw new HttpException('没有授权访问，请先登陆', 99);
      }
      const jwtService = new JwtService()
      const decoded = jwtService.verify(token, jwtConstants)
      const redisData = await getRedisString('QH_' + decoded.id)
      if (redisData) {
        request['user'] = decoded
        return true
      } else {
        throw new HttpException('登录信息已过期，请重新登陆', 99)
      }
    } catch (e) {
      if (e && e.status === 99) {
        // 如果是 JwtError，提供更具体的错误信息
        throw e
      } else {
        throw new HttpException('没有授权访问，请先登陆', HttpStatus.UNAUTHORIZED)
      }
    }
  }

  // 白名单
  private urlList: string[] = [
    '/api/v1/**/login',
    '/api/v1/**/pwd',
    '/api/v1/**/list',
  ]

  // 主管路由名单
  private masterUrlList: string[] = [
    'api/v1/manager/**/list',
    'api/v1/manager/**/search',
    'api/v1/manager/**/export',
  ]


  // 管理员路由名单
  private adminUrlList: string[] = [
    'api/v1/**/customer',
  ]


  // 验证请求是否为白名单的路由
  private hasUrl(urlList: string[], url: string): boolean {
    let flag: boolean = false
    if (urlList.indexOf(url.split('?')[0]) >= 0) {
      flag = true
    }
    return flag
  }
}
