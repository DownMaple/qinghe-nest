import { PartialType } from '@nestjs/mapped-types'
import { CreateCollectDto } from '@/auth/dto/create-collect.dto'

export class UpdateCollectDto extends PartialType(CreateCollectDto) {}
