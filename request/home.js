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

export function getSearchExercises(data) {
  return request({
    url: '/user/search_exercises/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data,
  })
}

export function joinErrorExercises(data) {
  return request({
    url: '/user/join_error_exercises/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data,
  })
}

export function sameTypeExercises(data) {
  return request({
    url: '/user/same_type_exercises/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data,
  })
}

export function getExerciseAnalysis(data) {
  return request({
    url: '/exercises/get_exercise_analysis/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data,
  })
}
