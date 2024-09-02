import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import UserService from '#services/user_service'

@inject()
export default class UserIsAdminMiddleware
{
    constructor(protected userService: UserService) { }
    async handle(ctx: HttpContext, next: NextFn)
    {
        // Very basic authorization with 0 is admin, 1 is user
        if (ctx.auth.user?.role === 0)
        {
            await next()
        }
        else
        {
            ctx.response.send('Ending request')
        }
    }
}