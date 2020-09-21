import request from './index'

export function teacher_login(data) {
  return request({
    url: '/v1/teacher/wx_teacher_login',
    method: 'POST',
    data,
  })
}
