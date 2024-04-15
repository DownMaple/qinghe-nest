import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from '@/common/config/jwtConstants'


export interface JwtPayload {
  username: string,
  id: number,
  uuid: string,
  iat: number,
  exp: number
}


@Injectable()
// 验证请求头中的token
export default class JwtAuthStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    })
  }

  async validate(payload: JwtPayload) {
    const { username, id , uuid } = payload
    return {
      id,
      uuid,
      username
    }
  }
}
