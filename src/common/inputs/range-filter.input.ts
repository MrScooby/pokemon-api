import { InputType, Field, Float } from '@nestjs/graphql'
import { IsNumber } from 'class-validator'

@InputType()
export class RangeFilter {
  @Field(() => Float, { nullable: true })
  @IsNumber()
  min?: number

  @Field(() => Float, { nullable: true })
  @IsNumber()
  max?: number
}
