import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Activity from './activity.js'

export default class OpeningHour extends BaseModel
{
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare day: string

    @column()
    declare start: number

    @column()
    declare end: number

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime

    @hasMany(() => Activity)
    declare activities: HasMany<typeof Activity>
}