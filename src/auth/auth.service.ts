import { HttpException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcryptjs from 'bcryptjs'
import { Auth } from '@/auth/entities/auth.entity'
import { CreateAuthDto } from '@/auth/dto/create-auth.dto'
import { JwtService } from '@nestjs/jwt'
import { UpdateAuthDto } from '@/auth/dto/update-auth.dto'
import { setRedisString } from '@/common/public/redis'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private readonly user: Repository<Auth>,
    private readonly JwtService: JwtService,
  ) {}


 async getUser(username:string) {
   let userData = await this.user.findOne({
     where: { username: username },
   })
   userData.password = '*******'
   return userData
 }

  // 注册
  async register(signupData: CreateAuthDto) {
    const findUser = await this.user.findOne({ where: { username: signupData.username } })
    if (findUser) {
      throw new HttpException('该用户已存在', 500)
    }
    // 加密
    signupData.password = bcryptjs.hashSync(signupData.password, 10)
    await this.user.save(signupData)
    return '注册成功'
  }

  // 登录
  async login(loginData: CreateAuthDto) {
    const findUser = await this.user.findOne({
      where: { username: loginData.username },
    })
    // 没有找到
    if (!findUser) throw new HttpException('用户不存在' , 500)

    // 找到了对比密码
    const compareRes: boolean = bcryptjs.compareSync(loginData.password, findUser.password)
    // 密码不正确
    if (!compareRes) throw new HttpException('密码不正确' , 500)

    await setRedisString('QH_' + findUser.id, JSON.stringify({ username: findUser.username, uuid: findUser.uuid, id: findUser.id }), 60 * 60 * 24 )

    const payload = { username: findUser.username, uuid: findUser.uuid, id: findUser.id }
    return {
      access_token: this.JwtService.sign(payload),
      msg: {
        id: findUser.id,
        uuid: findUser.uuid,
      },
    }
  }

  async update(userDate: UpdateAuthDto) {
    const findUser = await this.user.findOne({
      where: { username: userDate.username },
    })
    // 没有找到
    if (!findUser) throw new HttpException('用户不存在' , 500)

    // 找到了对比密码
    const compareRes: boolean = bcryptjs.compareSync(userDate.password, findUser.password)
    // 密码不正确
    if (!compareRes) throw new HttpException('原密码不正确' , 500)
    await this.user.update({ id: findUser.id }, { password: bcryptjs.hashSync(userDate.newPassword, 10) })
    return '密码修改成功'
  }

}
