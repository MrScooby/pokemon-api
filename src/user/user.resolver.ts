import { Resolver, Query, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { UserModel } from './user.model'
import { JwtAuthGuard } from '../auth/jwt.guard'

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserModel)
  @UseGuards(JwtAuthGuard)
  async me(@Context() context: any): Promise<UserModel> {
    return context.req.user
  }
}
