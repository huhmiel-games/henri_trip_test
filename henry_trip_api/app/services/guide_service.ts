import Guide from "../models/guide.js"
import { GuideCreation } from "../interfaces/guide.js"
import { ScheduleCreation } from "../interfaces/schedule.js"
import Schedule from "../models/schedule.js"

export default class GuideService
{
    async all()
    {
        const guides = await Guide.query()
            .preload('schedules')
            .preload('season')
            .preload('mobility')
            .preload('forWhom')

        return guides.map((guide) => guide.serialize({
            fields: {
                omit: ['seasonId', 'mobilityId', 'forWhomId']
            },
            relations: {
                season: {
                    fields: {
                        omit: ['id', 'createdAt', 'updatedAt'],
                    },
                },
                mobility: {
                    fields: {
                        omit: ['id', 'createdAt', 'updatedAt'],
                    },
                },
                forWhom: {
                    fields: {
                        omit: ['id', 'createdAt', 'updatedAt'],
                    },
                }
            }
        }))
    }

    async create(payload: GuideCreation)
    {
        const guide = await Guide.create({
            title: payload.title,
            description: payload.description,
            days: payload.days,
            seasonId: payload.seasonId,
            mobilityId: payload.mobilityId,
            forWhomId: payload.forWhomId
        })

        return guide
    }

    async find(id: number)
    {
        const guide = await Guide.query().where('id', id)
            .preload('schedules')
            .preload('season')
            .preload('mobility')
            .preload('forWhom')
            .firstOrFail()

        return guide.serialize({
            fields: {
                omit: ['seasonId', 'mobilityId', 'forWhomId']
            },
            relations: {
                season: {
                    fields: {
                        omit: ['id', 'createdAt', 'updatedAt'],
                    },
                },
                mobility: {
                    fields: {
                        omit: ['id', 'createdAt', 'updatedAt'],
                    },
                },
                forWhom: {
                    fields: {
                        omit: ['id', 'createdAt', 'updatedAt'],
                    },
                }
            }
        })
    }

    async addSchedule(payload: ScheduleCreation)
    {
        const { day, order, guideId, activityId } = payload

        const activity = await Guide.findOrFail(guideId)

        const schedule = new Schedule()
        schedule.day = day
        schedule.order = order
        schedule.guideId = guideId
        schedule.activityId = activityId

        await activity.related('schedules').save(schedule)

        return schedule
    }
}