import { errors } from "@adonisjs/core"
import Activity from "../models/activity.js"
import { ActivityCreation } from "../interfaces/activity.js"
import { OpeningHoursCreation } from "../interfaces/openingHours.js"
import OpeningHour from "../models/opening_hour.js"

export default class ActivityService
{
    async all()
    {
        try
        {
            const activities = await Activity.query().preload('openingHours').preload('category')
            return activities.map((activity) => activity.serialize({
                relations: {
                    openingHours: {
                        fields: {
                            omit: ['activityId', 'createdAt', 'updatedAt'],
                        },
                    },
                    category: {
                        fields: {
                            omit: ['createdAt', 'updatedAt']
                        }
                    }
                }
            }))
        }
        catch (error)
        {
            return errors.E_UNKNOWN_FLAG
        }
    }

    async create(payload: ActivityCreation)
    {
        // update
        if (payload.id != undefined)
        {
            const existingActivity = await Activity.find(payload.id)

            if (existingActivity)
            {
                const { openingHours } = payload
                if (openingHours)
                {
                    openingHours.forEach(async e => {
                        const existingOpeningHour = await OpeningHour.find(e.id)
                        if (existingOpeningHour)
                        {
                            await existingOpeningHour.merge(e).save()
                        }
                    })
                }
                await existingActivity.merge(payload).save()
                return existingActivity
            }
        }

        // create
        const { title, description, address, tel, website, categoryId } = payload
        const activity = await Activity.create({
            title,
            description,
            address,
            tel,
            website,
            categoryId
        })

        return activity
    }

    async addOpeningHours(payload: OpeningHoursCreation)
    {
        const { day, start, end, activityId } = payload

        const activity = await Activity.findOrFail(activityId)

        const openingHour = new OpeningHour()
        openingHour.day = day
        openingHour.start = start
        openingHour.end = end

        await activity.related('openingHours').save(openingHour)

        return openingHour
    }

    async find(id: number)
    {
        const activity = await Activity.query().where('id', id).preload('openingHours').preload('category').firstOrFail()

        return activity.serialize({
            relations: {
                openingHours: {
                    fields: {
                        omit: ['activityId', 'createdAt', 'updatedAt'],
                    },
                }
            }
        })
    }
}