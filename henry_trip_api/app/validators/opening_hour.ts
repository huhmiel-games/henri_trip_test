import vine from '@vinejs/vine'

export const openingHoursValidator = vine.compile(
    vine.object({
        day: vine.string().in(["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]),
        start: vine.number().min(0).max(23.59),
        end: vine.number().min(0).max(23.59),
        activityId: vine.number()
    })
)
