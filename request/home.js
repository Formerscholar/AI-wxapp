import request from './index'

export function getbanner(data) {
  return request({
    url: '/v1/main/banner/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data,
  })
}
