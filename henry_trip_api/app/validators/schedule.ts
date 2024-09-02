import vine from '@vinejs/vine'

export const scheduleValidator = vine.compile(
    vine.object({
        day: vine.number(),
        order: vine.number(),
        guideId: vine.number().exists(async (query, field) =>
        {
            const season = await query.from('guides').where('id', field).first()
            return !!season
        }),
        activityId: vine.number().exists(async (query, field) =>
        {
            const mobility = await query.from('activities').where('id', field).first()
            return !!mobility
        })
    })
)
