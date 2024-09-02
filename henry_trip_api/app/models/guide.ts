import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import Schedule from '#models/schedule'
import User from '#models/user'
import Season from '#models/season'
import Mobility from '#models/mobility'
import ForWhom from './for_whom.js'


export default class Guide extends BaseModel
{
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare title: string

    @column()
    declare description: string

    @column()
    declare days: number

    @column()
    declare seasonId: number

    @column()
    declare mobilityId: number

    @column()
    declare forWhomId: number

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime

    @hasMany(() => Schedule)
    declare schedules: HasMany<typeof Schedule>

    @manyToMany(() => User)
    declare users: ManyToMany<typeof User>

    @belongsTo(() => Season)
    declare season: BelongsTo<typeof Season>

    @belongsTo(() => Mobility)
    declare mobility: BelongsTo<typeof Mobility>

    @belongsTo(() => ForWhom)
    declare forWhom: BelongsTo<typeof ForWhom>
}