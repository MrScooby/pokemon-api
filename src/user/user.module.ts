import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { DBModule } from '../db/db.module'

@Module({
  imports: [DBModule],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule {}
