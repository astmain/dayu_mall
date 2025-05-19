export interface UpdateUserInfoData {
  id: number
  name: string
  phone: string
  email?: string
  birthday?: string
  gender?: string
}

export interface ChangePasswordData {
  id: number
  phone: string
  code: string
  password: string
}

export interface ChangePayPasswordData {
  id: number
  phone: string
  code: string
  password: string
}

export interface ChangePhoneData {
  id: number
  phone: string
  code: string
}

export interface BaseRes<T> {
  data: T
  code: number
  message: string
}

export interface ChangeRes {
  test: string
}

export interface UpdateUserInfoRes {
  id: number
  name: string
  phone: string
  email?: string
  birthday?: string
  gender?: string
}
