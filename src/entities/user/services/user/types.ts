// import { TQuery } from '@/shared/api/types'

import { TQuery } from '@/shared/api/types'

import { TUser } from '../../models/common'

export type TGetUserMeApi = TQuery<TGetUserMePayload, TGetUserMeResponse>
type TGetUserMePayload = {}
type TGetUserMeResponse = TUser

export type TPostUserMeApi = TQuery<TPostUserMePayload, TPostUserMeResponse>
type TPostUserMePayload = {
  name: string
  email: string
}
type TPostUserMeResponse = TUser

export type TPatchUserMeApi = TQuery<TPatchUserMPayload, TPatchUserMResponse>
type TPatchUserMPayload = {}
type TPatchUserMResponse = TUser

export type TGetUserMeStatsApi = TQuery<
  TGetUserMeStatsPayload,
  TGetUserMeStatsResponse
>
type TGetUserMeStatsPayload = {}
type TGetUserMeStatsResponse = {
  words: number
  folders: number
}

export type TDeleteUserMeApi = TQuery<TDeleteUserMPayload, TDeleteUserMResponse>
type TDeleteUserMPayload = {}
type TDeleteUserMResponse = {}
