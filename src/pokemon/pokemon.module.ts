import { Module } from '@nestjs/common'
import { PokemonService } from './pokemon.service'
import { PokemonResolver } from './pokemon.resolver'
import { DBModule } from '../db/db.module'

@Module({
  imports: [DBModule],
  controllers: [],
  providers: [PokemonService, PokemonResolver],
  exports: [PokemonService]
})
export class PokemonModule {}
