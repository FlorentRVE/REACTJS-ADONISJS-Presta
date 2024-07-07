import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import * as fs from 'fs'
import Job from '#models/job'
import User from '#models/user'

export default class ProfileController {
  async profile({ auth, response }: HttpContext) {
    const user = await auth.authenticate()
    // const { password, enabled, is_admin, ...userInfo } = user.$attributes
    const userInfo = await User.query()
      .where('id', user.$attributes.id)
      .select('id', 'name', 'area', 'avatar', 'job_id', 'tel')
      .preload('job')

    userInfo[0].avatar = `http://localhost:3000/uploads/${userInfo[0].avatar}`
    return response.ok(userInfo)
  }

  async changeProfile({ auth, response, request }: HttpContext) {
    
    const user = await auth.authenticate()

    const email = request.input('email')
    const name = request.input('name')
    const area = request.input('area')
    const tel = request.input('tel')
    const job = request.input('job')
    const password = request.input('password')

    if (!email || !name || !area || !tel || !job || !password) {
      return response.badRequest({ message: 'All fields are required' })
    }

    //check job
    const jobExist = await Job.findBy('id', job)

    if (!jobExist) {
      return response.badRequest({ message: 'Job not exist' })
    }

    // check image
    const avatar = request.file('avatar', {
      extnames: ['png', 'jpg', 'jpeg'],
      size: '4mb',
    })

    if (!avatar || !avatar.isValid) {
      return response.badRequest({ message: 'Invalid image' })
    }

    // delete old avatar
    const oldAvatar = user.avatar
    fs.unlink(`public/uploads/${oldAvatar}`, (err) => {
      if (err) throw err
      console.log('avatar deleted')
    })

    // save new avatar
    const filename = `${cuid()}.${avatar.extname}`
    user.avatar = filename

    await avatar.move('public/uploads', { name: filename })

    // update user
    user.email = email
    user.name = name
    user.area = area
    user.tel = tel
    user.jobId = jobExist.id
    user.password = password
    await user.save()

    return response.created({ message: 'Profile updated' })
  }
}
