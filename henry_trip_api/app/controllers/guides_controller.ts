import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import GuideService from '../services/guide_service.js'
import { GuideCreation } from '../interfaces/guide.js'
import { guideValidator } from '../validators/guide.js'
import { ScheduleCreation } from '../interfaces/schedule.js'
import { scheduleValidator } from '../validators/schedule.js'

@inject()
export default class GuidesController {
    constructor(protected guideService: GuideService) { }

    async all({ response }: HttpContext)
    {        
        const guides = await this.guideService.all()
        
        return response.ok(guides)
    }

    async find({ request, response }:HttpContext)
    {
        const guide = await this.guideService.find(request.param('id'))

        return response.ok(guide)
    }

    async create({ request, response }: HttpContext)
    {
        const payload : GuideCreation = await request.validateUsing(guideValidator)
    
        const guide = await this.guideService.create(payload)

        return response.created(guide)
    }

    async addSchedule({ request, response }: HttpContext)
    {
        const payload : ScheduleCreation = await request.validateUsing(scheduleValidator)

        const schedule = await this.guideService.addSchedule(payload)

        return response.created(schedule)
    }
}