import vine from '@vinejs/vine'

export const activityValidator = vine.compile(
    vine.object({
        title: vine.string(),
        description: vine.string(),
        address: vine.string(),
        tel: vine.string(),
        website: vine.string(),
        categoryId: vine.number().exists(async (query, field) =>
        {
            const season = await query.from('categories').where('id', field).first()
            return !!season
        }),
    })
)
