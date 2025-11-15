import { InputType, Field, Int } from '@nestjs/graphql'

@InputType()
export class PaginationInput {
  @Field(() => Int, {
    defaultValue: 1,
    description: 'Page number (starts from 1)'
  })
  page: number

  @Field(() => Int, {
    defaultValue: 10,
    description: 'Number of items per page'
  })
  limit: number
}
