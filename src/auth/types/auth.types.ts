import { ObjectType, Field } from '@nestjs/graphql'
import { UserModel } from '../../user/user.model'

@ObjectType()
export class AuthResponse {
  @Field({ description: 'JWT access token' })
  accessToken: string

  @Field(() => UserModel, { description: 'User information' })
  user: UserModel
}
