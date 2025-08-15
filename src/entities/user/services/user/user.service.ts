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
  ): TResponse<T.TPostUserMeApi['response']> {
    return apiPrivate.post(`/user/me`, data)
  }

  static async pathUser(
    data: T.TPostUserMeApi['payload'],
  ): TResponse<T.TPostUserMeApi['response']> {
    return apiPrivate.patch(`/user/me`, data)
  }
  static async deleteUser(): TResponse<T.TDeleteUserMeApi['response']> {
    return apiPrivate.delete(`/user/me`)
  }
}
