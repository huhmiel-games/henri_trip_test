import vine from '@vinejs/vine'

export const guideValidator = vine.compile(
    vine.object({
        id: vine.number().optional(),
        title: vine.string(),
        description: vine.string(),
        days: vine.number(),
        seasonId: vine.number().exists(async (query, field) =>
        {
            const season = await query.from('seasons').where('id', field).first()
            return !!season
        }),
        mobilityId: vine.number().exists(async (query, field) =>
        {
            const mobility = await query.from('mobilities').where('id', field).first()
            return !!mobility
        }),
        forWhomId: vine.number().exists(async (query, field) =>
        {
            const forwhom = await query.from('for_whoms').where('id', field).first()
            return !!forwhom
        }),
    })
)
