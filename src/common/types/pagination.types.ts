import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Type } from '@nestjs/common'

@ObjectType()
export class PaginationInfo {
  @Field(() => Int, { description: 'Current page number' })
  currentPage: number

  @Field(() => Int, { description: 'Items per page' })
  limit: number

  @Field(() => Int, { description: 'Total number of items' })
  totalItems: number

  @Field(() => Int, { description: 'Total number of pages' })
  totalPages: number

  @Field({ description: 'Whether there is a next page' })
  hasNextPage: boolean

  @Field({ description: 'Whether there is a previous page' })
  hasPrevPage: boolean
}

export function PaginatedResponse<T>(ItemType: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => [ItemType], { description: 'List of items' })
    items: T[]

    @Field(() => PaginationInfo, { description: 'Pagination information' })
    pagination: PaginationInfo
  }

  return PaginatedResponseClass
}
