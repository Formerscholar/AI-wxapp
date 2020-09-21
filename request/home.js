import request from './index'

export function getlogin(data) {
  return request({
    url: '/login/login',
    data: {
      ...data,
    },
  })
}
