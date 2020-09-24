import request from './index'

export function getbanner(data) {
  return request({
    url: '/main/banner/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data,
  })
}

export function getUserIndex(data) {
  return request({
    url: '/user/index/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data,
  })
}
