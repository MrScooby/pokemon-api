import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { AuthResponse } from './types/auth.types'
import { UserModel } from '../user/user.model'
import { RegisterInput, LoginInput } from './inputs/auth.inputs'

@Resolver(() => UserModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async register(@Args('input') input: RegisterInput): Promise<AuthResponse> {
    return await this.authService.register(input)
  }

  @Mutation(() => AuthResponse)
  async login(@Args('input') input: LoginInput): Promise<AuthResponse> {
    return await this.authService.login(input)
  }
}
