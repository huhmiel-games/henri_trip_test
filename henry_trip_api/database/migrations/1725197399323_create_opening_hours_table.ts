import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'opening_hours'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('day').notNullable()
      table.decimal('start').notNullable()
      table.decimal('end').notNullable()
      table.integer('activity_id').unsigned().references('activities.id')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}