import { BaseModel, column } from '@adonisjs/lucid/orm'
// import User from './user.js'
// import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Job extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  // @hasMany(() => User)
  // declare user: HasMany<typeof User>

  @column()
  declare name: string
}