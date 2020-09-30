import request from './index'

export function getsubject() {
  return request({
    url: '/main/subject/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  })
}



export function gettextbook(data) {
  return request({
    url: '/user/my_textbook_list/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data
  })
}