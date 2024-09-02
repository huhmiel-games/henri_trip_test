import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ActivityService from '../services/activity_service.js'
import { activityValidator } from '../validators/activity.js'
import { ActivityCreation } from '../interfaces/activity.js'
import { OpeningHoursCreation } from '../interfaces/openingHours.js'
import { openingHoursValidator } from '../validators/opening_hour.js'

@inject()
export default class ActivitiesController {
    constructor(protected activityService: ActivityService) { }

    async all({ response }: HttpContext)
    {
        const activities = await this.activityService.all()
        return response.ok(activities)
    }

    async find({ request, response }:HttpContext)
    {
        const activity = await this.activityService.find(request.param('id'))

        return response.ok(activity)
    }

    async create({ request, response }: HttpContext)
    {
        const payload : ActivityCreation = await request.validateUsing(activityValidator)
    
        const guide = await this.activityService.create(payload)

        return response.created(guide)
    }

    async addOpeningHours({ request, response }: HttpContext)
    {
        const payload: OpeningHoursCreation = await request.validateUsing(openingHoursValidator)
    
        const openingHours = await this.activityService.addOpeningHours(payload)

        return response.created(openingHours)
    }
}

