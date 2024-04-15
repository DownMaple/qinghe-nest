import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '@/common/config/jwtConstants'
import { Auth } from '@/auth/entities/auth.entity'
import { AuthController } from '@/auth/auth.controller'
import { AuthService } from '@/auth/auth.service'
import JwtAuthStrategy from '@/common/public/jwt-auth.strategy'

@Module({
  imports:[
    TypeOrmModule.forFeature([Auth]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn:jwtConstants.expiresIn
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthStrategy],
})
export class AuthModule {}
