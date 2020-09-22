import request from './index'

export function get_settings() {
  return request({
    url: '/v1/main/get_settings/',
    method: 'POST',
  })
}

export function teacher_login(data) {
  return request({
    url: '/v1/teacher/wx_teacher_login/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data,
  })
}

export function student_login(data) {
  return request({
    url: '/v1/user/wx_student_login/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data,
  })
}

export function location_list(data) {
  return request({
    url: '/v1/main/get_location_list/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data,
  })
}

export function school_list(data) {
  return request({
    url: '/v1/main/_get_school_list_by_area/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data,
  })
}

export function getGrade(data) {
  return request({
    url: '/v1/main/grade/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data,
  })
}

export function bind_info(data) {
  return request({
    url: '/v1/user/bind_info/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data,
  })
}
