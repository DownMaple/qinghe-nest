import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Headers, Req } from '@nestjs/common'
import { VipService } from './vip.service';
import { CreateVipDto } from './dto/create-vip.dto';
import { UpdateVipDto } from './dto/update-vip.dto';
import { Public } from '@/common/public/public.decorator'
import { jwtConstants } from '@/common/config/jwtConstants'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from '@/common/public/jwt-auth.strategy'
import { Request } from 'express'
import { RequiredIntPipe } from '@/common/Pipe/RequiredIntPipe'

@Controller('vip')
export class VipController {
  constructor(private readonly vipService: VipService) {}

  @Post()
  create(@Body() createVipDto: CreateVipDto) {
    return this.vipService.create(createVipDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.vipService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string, @Headers() headers: Record<string, string>) {
    let user: JwtPayload
    if (headers['authorization']) {
      const jwtService = new JwtService()
      user = jwtService.verify(headers['authorization'].replace('Bearer ', ''), jwtConstants)
    }
    return this.vipService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVipDto: UpdateVipDto) {
    return this.vipService.update(+id, updateVipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vipService.remove(+id);
  }

  @Public()
  @Get('/filterVip/list')
  filterVip(
    @Query('title') title = '',
    @Query('pageNum') pageNum = 1,
    @Query('pageSize') pageSize = 10,
    @Query('industryId') industryId = 0,
    @Query('positionId') positionId = 0,
    @Query('scaleId') scaleId = 0,
    @Query('specialId') specialId = 0,
    ) {
    return this.vipService.filterVip(
      title,
      pageNum,
      pageSize,
      industryId,
      positionId,
      scaleId,
      specialId,
    );
  }

  /**
   * 收藏
   * @param vipId
   * @param req
   */
  @Post('/collect')
  collect(@Body('id', RequiredIntPipe)  vipId: number, @Req() req: { user: JwtPayload }) {
    return this.vipService.collect(req.user.id,vipId);
  }

}
