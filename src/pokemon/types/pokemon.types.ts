import { ObjectType } from '@nestjs/graphql'
import { PokemonModel } from '../pokemon.model'
import { PaginatedResponse } from '../../common/types/pagination.types'

@ObjectType()
export class PaginatedPokemon extends PaginatedResponse(PokemonModel) {}
