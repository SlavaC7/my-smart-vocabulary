import { apiPrivate, TResponse } from '@/shared/api'

import * as T from './types'

export class FoldersService {
  //get Folder
  static async getFolders(): TResponse<T.TGetFoldersApi['response']> {
    return apiPrivate.get(`/folders`)
  }

  //get Folder by of
  static async getFolderById({
    id,
  }: T.TGetFolderByIdApi['payload']): TResponse<
    T.TGetFolderByIdApi['response']
  > {
    return apiPrivate.get(`/folders/${id}`)
  }

  //Post Folder
  static async postFolder(
    data: T.TPostFolderApi['payload'],
  ): TResponse<T.TPostFolderApi['response']> {
    return apiPrivate.post(`/folders`, data)
  }

  //patch Folder
  static async patchFolder({
    id,
    ...data
  }: T.TPatchFolderApi['payload']): TResponse<T.TPatchFolderApi['response']> {
    return apiPrivate.patch(`/folders/${id}`, data)
  }

  //post Folder
  static async deleteFolder({
    id,
  }: T.TGetFolderByIdApi['payload']): TResponse<
    T.TGetFolderByIdApi['response']
  > {
    return apiPrivate.delete(`/folders/${id}`)
  }
}
