/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import UsersController from '../app/controllers/users_controller.js'
import GuidesController from '../app/controllers/guides_controller.js'
import ActivitiesController from '../app/controllers/activities_controller.js'
import { middleware } from './kernel.js'

router.get('/', async () =>
{
    return {
        hello: 'hello henri trip api',
    }
})

// user
router.group(() =>
{
    router.post('users/register', [UsersController, 'register'])
    router.post('users/login', [UsersController, 'login'])
})
    .prefix('/api')

// admin routes
router.group(() =>
{
    router.get('users', [UsersController, 'all'])
    router.get('guides', [GuidesController, 'all'])
    router.post('guides', [GuidesController, 'create'])
    router.post('guides/schedule', [GuidesController, 'addSchedule'])
    router.get('activity', [ActivitiesController, 'all'])
    router.post('activity', [ActivitiesController, 'create'])
    router.post('activity/openinghours', [ActivitiesController, 'addOpeningHours'])
})
    .use([middleware.auth(), middleware.userIsAdmin()])
    .prefix('/api')

// authenticated user routes
router.group(() =>
{
    router.get('guides/:id', [GuidesController, 'find'])
    router.get('activity/:id', [ActivitiesController, 'find'])
})
    .use(middleware.auth())
    .prefix('/api')

