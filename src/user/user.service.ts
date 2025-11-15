import { Injectable } from '@nestjs/common'
import { DBService } from '../db/db.service'
import { UserModel } from './user.model'

@Injectable()
export class UserService {
  constructor(private readonly db: DBService) {}

  async findById(id: string): Promise<UserModel | null> {
    const user = await this.db.user.findUnique({
      where: { id }
    })

    if (!user) {
      return null
    }

    return {
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  }

  async findByUsername(username: string): Promise<any | null> {
    return await this.db.user.findUnique({
      where: { username }
    })
  }

  async create(data: { username: string; password: string }): Promise<any> {
    return await this.db.user.create({
      data
    })
  }
}
