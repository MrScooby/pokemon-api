import { Injectable, NotFoundException } from '@nestjs/common'
import { DBService } from '../db/db.service'
import {
  CreatePokemonInput,
  UpdatePokemonInput,
  PokemonQueryInput,
  PokemonWhereInput
} from './inputs/pokemon.inputs'
import { Pokemon } from '@prisma/client'
import { PaginatedPokemon } from './types/pokemon.types'
import { PaginationInfo } from '../common/types/pagination.types'

@Injectable()
export class PokemonService {
  constructor(private readonly db: DBService) {}

  // TODO: prevent duplicates based on name (both db and service)
  async create(createPokemonInput: CreatePokemonInput): Promise<Pokemon> {
    return await this.db.pokemon.create({
      data: createPokemonInput
    })
  }

  async findAll(query?: PokemonQueryInput): Promise<PaginatedPokemon> {
    const filter = query?.filter
    const pagination = query?.pagination || { page: 1, limit: 10 }

    const where: PokemonWhereInput = {}

    if (filter?.name) {
      where.name = {
        contains: filter.name,
        mode: 'insensitive'
      }
    }

    if (filter?.height) {
      where.height = {}
      if (filter.height.min !== undefined) {
        where.height.gte = filter.height.min
      }
      if (filter.height.max !== undefined) {
        where.height.lte = filter.height.max
      }
    }

    if (filter?.weight) {
      where.weight = {}
      if (filter.weight.min !== undefined) {
        where.weight.gte = filter.weight.min
      }
      if (filter.weight.max !== undefined) {
        where.weight.lte = filter.weight.max
      }
    }

    const skip = (pagination.page - 1) * pagination.limit
    const take = pagination.limit

    // TODO: wrap in promise.all
    const totalItems = await this.db.pokemon.count({ where })
    const totalPages = Math.ceil(totalItems / pagination.limit)

    const items = await this.db.pokemon.findMany({
      where,
      orderBy: { name: 'asc' },
      skip,
      take
    })

    const paginationInfo: PaginationInfo = {
      currentPage: pagination.page,
      limit: pagination.limit,
      totalItems,
      totalPages,
      hasNextPage: pagination.page < totalPages,
      hasPrevPage: pagination.page > 1
    }

    return {
      items,
      pagination: paginationInfo
    }
  }

  async findOne(id: string): Promise<Pokemon> {
    const pokemon = await this.db.pokemon.findUnique({
      where: { id }
    })

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with ID ${id} not found`)
    }

    return pokemon
  }

  async update(
    id: string,
    updatePokemonInput: UpdatePokemonInput
  ): Promise<Pokemon> {
    await this.findOne(id)

    return await this.db.pokemon.update({
      where: { id },
      data: updatePokemonInput
    })
  }

  async remove(id: string): Promise<Pokemon> {
    await this.findOne(id)

    return await this.db.pokemon.delete({
      where: { id }
    })
  }
}
