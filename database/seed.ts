import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// TODO: seed test user
async function main() {
  const pokemonData = [
    {
      name: 'Pikachu',
      height: 0.4,
      weight: 6.0,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
    },
    {
      name: 'Charizard',
      height: 1.7,
      weight: 90.5,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png'
    },
    {
      name: 'Blastoise',
      height: 1.6,
      weight: 85.5,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png'
    },
    {
      name: 'Venusaur',
      height: 2.0,
      weight: 100.0,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png'
    },
    {
      name: 'Gyarados',
      height: 6.5,
      weight: 235.0,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png'
    },
    {
      name: 'Dragonite',
      height: 2.2,
      weight: 210.0,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png'
    },
    {
      name: 'Mewtwo',
      height: 2.0,
      weight: 122.0,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png'
    },
    {
      name: 'Mew',
      height: 0.4,
      weight: 4.0,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png'
    },
    {
      name: 'Lucario',
      height: 1.2,
      weight: 54.0,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png'
    },
    {
      name: 'Garchomp',
      height: 1.9,
      weight: 95.0,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/445.png'
    }
  ]

  console.log('🌱 Seeding Pokemon...')

  const result = await prisma.pokemon.createMany({
    data: pokemonData
  })

  console.log(`✅ Created ${result.count} Pokemon`)
  console.log('🎉 Seeding completed!')
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
