import User from '#models/user'
import { errors } from '@adonisjs/core'
import { UserRegister } from '../interfaces/user.js'

export default class UserService
{
    async create(payload: UserRegister): Promise<User>
    {
        const user = await User.create({
            email: payload.email,
            password: payload.password,
            role: 1
        })

        return user
    }

    async login(email: string, password: string)
    {
        const user = await User.verifyCredentials(email, password)
        const token = await User.accessTokens.create(user, ['*'], {
            expiresIn: '30 days',
        })

        return { token, user }
    }

    async all()
    {
        try
        {
            return await User.all()
        }
        catch (error)
        {
            return errors.E_UNKNOWN_FLAG
        }
    }


    /**
     * Find a user by primary key
     */
    async find(id: number): Promise<User>
    {
        return await User.findOrFail(id)
    }


    /**
     * Update a user
     */
    async update(data: User): Promise<User | null>
    {
        const user = await User.find(data.id)

        if (user)
        {
            user.email = data.email
            user.password = data.password
            await user.save()

            return user
        }

        return null
    }



    /**
     * Delete a user
     */
    async remove(id: number)
    {
        const user = await User.find(id)

        if (user)
        {
            await user.delete()
        }
    }
}