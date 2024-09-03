import vine from '@vinejs/vine'

export const activityValidator = vine.compile(
    vine.object({
        id: vine.number().optional(),
        title: vine.string(),
        description: vine.string(),
        address: vine.string(),
        tel: vine.string(),
        website: vine.string(),
        categoryId: vine.number().exists(async (query, field) =>
        {
            const category = await query.from('categories').where('id', field).first()
            return !!category
        }),
        openingHours: vine.any()
        // todo validate openingHours optionnaly
        // openingHours: vine.array(vine.object({
        //     id: vine.number().optional(),
        //     day: vine.string().in(["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]),
        //     start: vine.number().min(0).max(23.59),
        //     end: vine.number().min(0).max(23.59),
        //     activityId: vine.number()
        // })).optional()
    })
)
