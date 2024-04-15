import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common'
import { AuthService } from '@/auth/auth.service'
import { CreateAuthDto } from '@/auth/dto/create-auth.dto'
import { Public } from '@/common/public/public.decorator'
import { UpdateAuthDto } from '@/auth/dto/update-auth.dto'
import { request } from 'express'



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/getUser')
  getUser(@Query('username') username:string) {
    return this.authService.getUser(username)
  }

  // 注册
  @Public()
  @Post("/register")
  signup(@Body() signupData: CreateAuthDto) {
    return this.authService.register(signupData)
  }

  // 登录
  @Public()
  @Post("/login")
  login(@Body() loginData: CreateAuthDto) {
    return this.authService.login(loginData)
  }



  @Post("/update")
  refresh(@Body() updateAuth: UpdateAuthDto) {
    return this.authService.update(updateAuth)
  }

}
