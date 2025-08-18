import { TQuery, TQueryListData } from '@/shared/api/types'

import { TFolder } from '../../models'

export type TGetFoldersApi = TQuery<TGetFoldersPayload, TGetFoldersResponse>
type TGetFoldersPayload = Partial<{
  search: string
  skip: number
  limit: number
}>

type TGetFoldersResponse = TQueryListData<TFolder>

export type TPostFolderApi = TQuery<TPostFolderPayload, TPostFolderResponse>
type TPostFolderPayload = {
  name: string
}
type TPostFolderResponse = TFolder

export type TPatchFolderApi = TQuery<TPatchFolderPayload, TPatchFolderResponse>
type TPatchFolderPayload = { id: string } & Partial<TPostFolderPayload>

type TPatchFolderResponse = TFolder

export type TGetFolderByIdApi = TQuery<
  TGetFolderByIdPayload,
  TGetFolderByIdResponse
>
type TGetFolderByIdPayload = {
  id: string
}

type TGetFolderByIdResponse = TFolder
