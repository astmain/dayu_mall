export interface BaseRes<T> {
  data: T
  code: number
  message: string
}

export interface GetHistoryListRes {
  id: number
  name: string
  size: number
  create_time: string
}

export interface AddHistory2CartDataRes {
  id: number
}

export interface DeleteHistoryDataRes {
  id: number
}
