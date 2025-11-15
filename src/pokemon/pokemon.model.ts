import { ObjectType, Field, ID, Float } from '@nestjs/graphql'
import { Pokemon as PrismaPokemon } from '@prisma/client'

@ObjectType('Pokemon')
export class PokemonModel implements PrismaPokemon {
  @Field(() => ID, { description: 'Unique identifier for the Pokemon' })
  id: string

  @Field({ description: 'Name of the Pokemon' })
  name: string

  @Field(() => Float, { description: 'Height of the Pokemon in meters' })
  height: number

  @Field(() => Float, { description: 'Weight of the Pokemon in kilograms' })
  weight: number

  @Field({ description: 'Image URL of the Pokemon' })
  image: string

  @Field({ description: 'When the Pokemon was created' })
  createdAt: Date

  @Field({ description: 'When the Pokemon was last updated' })
  updatedAt: Date
}
