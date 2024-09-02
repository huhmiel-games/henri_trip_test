import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Schedule from '#models/schedule'
import OpeningHour from '#models/opening_hour'
import Category from './category.js'

export default class Activity extends BaseModel
{
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare title: string

    @column()
    declare description: string

    @column()
    declare address: string

    @column()
    declare tel: string

    @column()
    declare website: string

    @column()
    declare categoryId: number

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime

    @belongsTo(() => Category)
    declare activity: BelongsTo<typeof Category>

    @hasMany(() => Schedule)
    declare schedules: HasMany<typeof Schedule>

    @hasMany(() => OpeningHour)
    declare openingHours: HasMany<typeof OpeningHour>
}