import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'guides'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.integer('days').notNullable()
      table.integer('mobility_id').unsigned().references('mobilities.id')
      table.integer('season_id').unsigned().references('seasons.id')
      table.integer('for_whom_id').unsigned().references('for_whoms.id')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}