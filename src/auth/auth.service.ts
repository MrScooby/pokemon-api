import {
  Injectable,
  UnauthorizedException,
  ConflictException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { RegisterInput, LoginInput } from './inputs/auth.inputs'
import { AuthResponse } from './types/auth.types'
import { UserModel } from '../user/user.model'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async register(registerInput: RegisterInput): Promise<AuthResponse> {
    const { username, password } = registerInput

    const existingUser = await this.userService.findByUsername(username)
    if (existingUser) {
      throw new ConflictException('User with this username already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await this.userService.create({
      username,
      password: hashedPassword
    })

    const accessToken = this.jwtService.sign({
      sub: user.id,
      username: user.username
    })

    return {
      accessToken,
      user: {
        id: user.id,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    }
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { username, password } = loginInput

    const user = await this.userService.findByUsername(username)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const accessToken = this.jwtService.sign({
      sub: user.id,
      username: user.username
    })

    return {
      accessToken,
      user: {
        id: user.id,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    }
  }

  async validateUser(userId: string): Promise<UserModel | null> {
    return await this.userService.findById(userId)
  }
}
