import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Guide from '#models/guide'

export default class Schedule extends BaseModel
{
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare day: number

    @column()
    declare order: number

    @column()
    declare guideId: number

    @column()
    declare activityId: number

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime

    @hasMany(() => Guide)
    declare guides: HasMany<typeof Guide>
}