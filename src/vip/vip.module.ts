import { Module } from '@nestjs/common';
import { VipService } from './vip.service';
import { VipController } from './vip.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Vip } from '@/vip/entities/vip.entity'
import { Collect } from '@/auth/entities/collect.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Vip,Collect])
  ],
  controllers: [VipController],
  providers: [VipService],
})
export class VipModule {}
