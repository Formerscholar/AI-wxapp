import request from './index'

export function get_settings() {
  return request({
    url: '/main/get_settings/',
    method: 'POST',
  })
}

export function teacher_login(data) {
  return request({
    url: '/teacher/wx_teacher_login/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data,
  })
}

export function student_login(data) {
  return request({
    url: '/user/wx_student_login/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data,
  })
}

export function location_list(data) {
  return request({
    url: '/main/get_location_list/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data,
  })
}

export function school_list(data) {
  return request({
    url: '/main/_get_school_list_by_area/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data,
  })
}

export function getGrade(data) {
  return request({
    url: '/main/grade/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data,
  })
}

export function bind_info(data) {
  return request({
    url: '/user/bind_info/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data,
  })
}
