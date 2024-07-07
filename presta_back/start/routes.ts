/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

//-------Auth
router.post('/register', '#controllers/auth_controller.register')
router.post('/login', '#controllers/auth_controller.login')
router
  .post('/logout', '#controllers/auth_controller.logout')
  .use(middleware.auth({ guards: ['api'] }))

//------Profile
router
  .group(() => {
    router.get('/profile', '#controllers/profile_controller.profile')
    router.put('/profile', '#controllers/profile_controller.changeProfile')
  })
  .use(middleware.auth({ guards: ['api'] }))

//------Jobs (pour le dev)
router.get('/jobs', '#controllers/jobs_controller.index')
router.post('/jobs/new', '#controllers/jobs_controller.new')

// ------Users
router.get('/users', '#controllers/users_controller.getAll')

//------Admin
router
  .group(() => {
    router.get('/users', '#controllers/users_controller.index')
    router.get('/user/:id', '#controllers/users_controller.getById')
    router.delete('/user/:id', '#controllers/users_controller.deleteById')
    router.patch('/user/:id', '#controllers/users_controller.updateById')
    router.patch('/user/:id/avatar', '#controllers/users_controller.changeAvatarById')
    router.patch('/user/:id/password', '#controllers/users_controller.changePasswordById')
    router.post('/user/:id/enabled', '#controllers/users_controller.enabledById')
  })
  .prefix('/admin')
  .use([middleware.auth({ guards: ['api'] }), middleware.isAdmin()])
