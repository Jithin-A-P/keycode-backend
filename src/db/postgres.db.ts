import * as dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/../.env' })

import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: true,
  entities: ['dist/**/*.entity.{ts,js}'],
  migrations: ['dist/db/migrations/*.js'],
})

export default dataSource
