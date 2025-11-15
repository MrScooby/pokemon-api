import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { PokemonService } from './pokemon.service'
import { PokemonModel } from './pokemon.model'
import {
  CreatePokemonInput,
  UpdatePokemonInput,
  PokemonQueryInput
} from './inputs/pokemon.inputs'
import { JwtAuthGuard } from '../auth/jwt.guard'
import { PaginatedPokemon } from './types/pokemon.types'

// TODO: add sort (generic)
@Resolver(() => PokemonModel)
export class PokemonResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @Mutation(() => PokemonModel)
  @UseGuards(JwtAuthGuard)
  async createPokemon(
    @Args('input') input: CreatePokemonInput
  ): Promise<PokemonModel> {
    return await this.pokemonService.create(input)
  }

  @Query(() => PaginatedPokemon)
  async getAllPokemon(
    @Args('query', { nullable: true }) query?: PokemonQueryInput
  ): Promise<any> {
    return await this.pokemonService.findAll(query)
  }

  @Query(() => PokemonModel, { nullable: true })
  async getPokemon(
    @Args('id', { type: () => ID }) id: string
  ): Promise<PokemonModel | null> {
    try {
      return await this.pokemonService.findOne(id)
    } catch (error) {
      return null
    }
  }

  @Mutation(() => PokemonModel, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async updatePokemon(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdatePokemonInput
  ): Promise<PokemonModel | null> {
    try {
      return await this.pokemonService.update(id, input)
    } catch (error) {
      return null
    }
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deletePokemon(
    @Args('id', { type: () => ID }) id: string
  ): Promise<boolean> {
    try {
      await this.pokemonService.remove(id)
      return true
    } catch (error) {
      return false
    }
  }
}
