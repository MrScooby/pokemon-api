import { ObjectType, Field, ID } from '@nestjs/graphql'
import { User as PrismaUser } from '@prisma/client'

@ObjectType('User')
export class UserModel implements Omit<PrismaUser, 'password'> {
  @Field(() => ID, { description: 'Unique identifier for the user' })
  id: string

  @Field({ description: 'Username of the user' })
  username: string

  @Field({ description: 'When the user was created' })
  createdAt: Date

  @Field({ description: 'When the user was last updated' })
  updatedAt: Date
}
