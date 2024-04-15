import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { isEmpty, IsInt, IsNotEmpty, validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

@Injectable()
export class RequiredIntPipe implements PipeTransform<string | undefined, Promise<number>>  {
  async transform(value: string | undefined, metadata: ArgumentMetadata): Promise<number> {
    if (isEmpty(value)) {
      throw new BadRequestException(`${metadata.data} is required`)
    }

    const integerDto = plainToClass(IntegerDto, { value })
    const errors = await validate(integerDto)

    if (errors.length > 0) {
      const validationErrors = errors.map((err) => Object.values(err.constraints).join(', ')).join('; ')
      throw new BadRequestException(`Invalid value for ${metadata.data}: ${validationErrors}`)
    }

    return integerDto.value
  }
}

// DTO for validation purposes
class IntegerDto {
  @IsNotEmpty()
  @IsInt()
  value: number
}
