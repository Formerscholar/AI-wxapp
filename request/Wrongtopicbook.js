import request from './index'

export function getsubject() {
  return request({
    url: '/v1/main/subject/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  })
}
