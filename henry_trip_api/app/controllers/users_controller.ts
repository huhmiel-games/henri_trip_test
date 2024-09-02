import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import UserService from '#services/user_service'
import { loginValidator, registerValidator } from '../validators/auth.js'
import { UserRegister } from '../interfaces/user.js'


@inject()
export default class UsersController
{
    constructor(protected userService: UserService) { }

    async register({ request, response }: HttpContext): Promise<void>
    {
        const payload: UserRegister = await request.validateUsing(registerValidator)
        
        const user = await this.userService.create(payload)
        
        return response.created(user)
    }

    async login({ request, response }: HttpContext): Promise<void>
    {
        const { email, password } = await request.validateUsing(loginValidator)

        const { token, user } = await this.userService.login(email, password)

        return response.ok({
            token: token,
            ...user.serialize(),
        })
    }

    async all(ctx: HttpContext)
    {
        const users = await this.userService.all()
        return ctx.response.ok(users)
    }
}