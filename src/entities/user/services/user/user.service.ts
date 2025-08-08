import { apiPrivate, TResponse } from '@/shared/api'

import * as T from './types'

export class UserService {
  //Get User
  static async getUser(): TResponse<T.TGetUserMeApi['response']> {
    return apiPrivate.get(`/user/me`)
  }
  //Post User
  static async postUser(
    data: T.TPostUserMeApi['payload'],
  ): Promise<T.TPostUserMeApi['response']> {
    return apiPrivate.post(`/users`, data)
  }

  static async pathUser(
    data: T.TPostUserMeApi['payload'],
  ): Promise<T.TPostUserMeApi['response']> {
    return apiPrivate.patch(`/users`, data)
  }
  static async deleteUser(): Promise<T.TDeleteUserMeApi['response']> {
    return apiPrivate.delete(`/users`)
  }
}
