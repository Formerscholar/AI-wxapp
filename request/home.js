import request from './index'

export function get_settings(data) {
  return request({
    url: '/v1/main/get_settings',
    method: 'POST',
    data: {
      ...data,
    },
  })
}
