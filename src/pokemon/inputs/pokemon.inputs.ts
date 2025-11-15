import { InputType, Field, Float } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RangeFilter } from '../../common/inputs/range-filter.input'
import { PaginationInput } from '../../common/inputs/pagination.input'
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator'

@InputType()
export class PokemonFilter {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string

  @Field(() => RangeFilter, { nullable: true })
  @IsObject()
  @IsOptional()
  height?: RangeFilter

  @Field(() => RangeFilter, { nullable: true })
  @IsObject()
  @IsOptional()
  weight?: RangeFilter
}

export type PokemonWhereInput = Prisma.PokemonWhereInput

@InputType()
export class CreatePokemonInput {
  @Field()
  @IsString()
  name: string

  @Field(() => Float)
  @IsNumber()
  height: number

  @Field(() => Float)
  @IsNumber()
  weight: number

  @Field()
  @IsString()
  image: string
}

@InputType()
export class UpdatePokemonInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  height?: number

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  weight?: number

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  image?: string
}

@InputType()
export class PokemonQueryInput {
  @Field(() => PokemonFilter, { nullable: true })
  @IsObject()
  @IsOptional()
  filter?: PokemonFilter

  @Field(() => PaginationInput, { nullable: true })
  @IsObject()
  @IsOptional()
  pagination?: PaginationInput
}
