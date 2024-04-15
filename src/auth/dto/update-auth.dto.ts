import { PartialType } from '@nestjs/mapped-types'
import { CreateAuthDto } from '@/auth/dto/create-auth.dto'

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  public readonly id: number
  public readonly newPassword: string
}
