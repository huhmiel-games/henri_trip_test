import { BaseSchema } from '@adonisjs/lucid/schema'

export default class GuideUsers extends BaseSchema {
  protected tableName = 'guide_user'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('users.id')
      table.integer('guide_id').unsigned().references('guides.id')
      table.unique(['user_id', 'guide_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}