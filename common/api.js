import {
  request
} from './util.js'

const ApiUrl = 'http://test.aictb.com/' //新生产环境
const ApiUrlold = 'https://api.aictb.com/v3/' //生产环境
const appApiUrl = 'https://api.aictb.com/app/' //生产环境

module.exports = {
  // : data => request(ApiUrl+'',data),
  url: ApiUrl,
  //   app
  // teacher
  teacher_app_login: data => request(ApiUrlold + 'teacher/login/', data), //老师登录
  teacher_app_wx_login: data => request(ApiUrlold + 'teacher/wx_login/', data), //
  get_app_teacher_verify_code: data => request(ApiUrlold + 'teacher/get_verify_code/', data), //老师获取验证码
  get_app_teacher_register: data => request(ApiUrlold + 'teacher/register/', data), //老师注册
  get_app_teacher_bind: data => request(ApiUrlold + 'teacher/bind_info/', data), //老师绑定信息
  get_app_teacher_search_password: data => request(ApiUrlold + 'teacher/search_password/', data), //老师忘记密码
  get_teacher_bind_mobile: data => request(ApiUrlold + 'teacher/bind_mobile/', data), //学生绑定手机
  // student
  app_login: data => request(ApiUrlold + 'user/login/', data), //学生登录
  app_wx_login: data => request(ApiUrlold + 'user/wx_login/', data), //
  get_app_verify_code: data => request(appApiUrl + 'applets/sendMobileCode/', data), //学生获取验证码
  get_app_user_register: data => request(ApiUrlold + 'user/register/', data), //学生注册
  get_app_user_bind: data => request(ApiUrlold + 'user/bind_info/', data), //学生绑定信息
  get_app_user_search_password: data => request(ApiUrlold + 'user/search_password/', data), //学生忘记密码
  get_app_pay: data => request(ApiUrlold + 'user/pay/', data), //支付
  get_bind_mobile: data => request(ApiUrlold + 'user/bind_mobile/', data), //学生绑定手机
  //   app
  
  wx_login: data => request(ApiUrl + 'wechat/login/', data), //
  update_userinfo: data => request(ApiUrlold + 'wechat/update/', data), //
  //----------------------------- 学生
  //登录注册
  bind_info: data => request(ApiUrl + 'user/bindinfo/', data), //绑定信息
  get_settings: md => request(ApiUrlold + 'main/get_settings/', md), //获取配置信息
  //首页
  student_login: data => request(ApiUrl + 'user/wx_login/', data), //登录
  wx_student_login: data => request(ApiUrl + 'user/wx_student_login/', data), //登录
  mobile_login: data => request(ApiUrl + 'user/mobile_login/', data), //新登录
  
  student_index: data => request(ApiUrl + 'applets/studentIndex/', data), //学生端首页信息	
  newest_paper: data => request(ApiUrl + 'applets/studentSchoolResourcesList/', data), //名校资源
  my_study_analysis: data => request(ApiUrl + 'applets/studentAcademicReport/', data), //学情报告
  my_study_analysis_exercise: data => request(ApiUrl + 'applets/studentAcademicReportExercises/', data), //学情报告知识点详情
  textbook: data => request(ApiUrl + 'applets/getStudentTextbookAdd/', data), //教辅名称
  add_my_textbook: data => request(ApiUrl + 'applets/studentTextbookAdd/', data), //添加我的教辅
  my_textbook_list: data => request(ApiUrl + 'applets/studentTextbookList/', data), //我的教辅列表
  search_exercises: data => request(ApiUrl + 'applets/indexPhotoSearch/', data), //教辅拍照识题
  //错题本
  wei_error_book_list: data => request(ApiUrl + 'applets/studentExercises/', data), //未生成错题本列表
  generated_error_book: data => request(ApiUrl + 'applets/studentErrorbookList/', data), //已生成错题本
  delete_error_exercises: data => request(ApiUrl + 'applets/delStudentExercises/', data), //我的错题本-删除已加入错题本的习题
  create_error_book: data => request(ApiUrl + 'applets/studentErrorbookAdd/', data), //我的错题本---生成错题本
  get_errorbook_exercises: data => request(ApiUrl + 'applets/studentErrorbookExercisesList/', data), //查看错题本
  delete_errorbook: data => request(ApiUrl + 'applets/delStudentErrorbook/', data), //删除错题本
  get_text: data => request(ApiUrl + 'user/get_text/', data), //绑定邮箱发送错题本
  my_test_paper: data => request(ApiUrl + 'applets/studentSchoolExamsList/', data), //我的试卷
  user_test_paper_detail: data => request(ApiUrl + 'applets/studentSchoolExamsExercisesList/', data), //我的试卷详情
  add_exercises_to_errorbook_user: data => request(ApiUrl + 'applets/studentErrorbookAddExercises/', data), //习题加入已生成的试卷
  //题库	
  know_point: data => request(ApiUrl + 'applets/getKnowledge/', data), //知识点
  textbook_exercises: data => request(ApiUrl + 'applets/studentKnowledgeBaseList/', data), //知识库 习题筛选
  join_error: data => request(ApiUrl + 'applets/addStudentExercises/', data), //加入/取消错题
  same_type: data => request(ApiUrl + 'applets/studentSameTypeExercises/', data), //章节课时习题 同类型题目
  //个人信息	
  get_user_info: data => request(ApiUrl + 'applets/getPerson/', data), //获取用户信息
  save_email: data => request(ApiUrl + 'applets/editPersonEmail/', data), //绑定邮箱
  feedback: data => request(ApiUrl + 'applets/feedback/', data), //意见反馈
  change_mobile: data => request(ApiUrl + 'applets/editPersonMobile/', data), //修改手机号
  change_grade: data => request(ApiUrl + 'user/change_grade/', data), //修改手机号
  vip_info: data => request(ApiUrl + 'user/vip/', data), //vip信息
  change_user_info: data => request(ApiUrl + 'applets/editPersonGender/', data), //修改个人信息
  change_user_name:data => request(ApiUrl + 'applets/editPersonName/', data), //修改个人信息
  join_team: data => request(ApiUrl + 'applets/joinTeam/', data), //邀请学生加入班级
  send_msg: data => request(ApiUrl + 'user/send_msg/', data),
  get_download: data => request(ApiUrl + 'user/download_based/', data),
  orc_one: data => request(ApiUrl + 'applets/studentTextbookPhotoSearch/', data),
  // orc_one: data => request(ApiUrl + 'user/orc_one_l/', data),
  // v3/user/delete_errorbook_exercises   数据 errorbook_id    exercises_ids
  delete_exercises: data => request(ApiUrl + 'applets/delStudentExercises/', data),
  // register : data => request(ApiUrl+'user/user_register/',data),//注册
  //search_password : data => request(ApiUrl+'user/search_password/',data),//找回密码
  catalogue: data => request(ApiUrl + 'question/catalogue/', data), //教辅目录
  catalogue_exercises: data => request(ApiUrl + 'question/catalogue_exercises/', data), //目录课时习题
  // get_school: data => request(ApiUrl+'user/school/',data),//学校

  get_verify_code: data => request(ApiUrl + 'user/get_verify_code/', data), //验证码
  app_pay: data => request(ApiUrl + 'user/_app_pay/', data), //支付
  get_app_user_edit_password: data => request(ApiUrl + 'user/edit_password/', data), //学生修改密码




  // : data => request(ApiUrl+'',data),
  //教师端
  get_mobile: data => request(ApiUrl + 'teacher/get_mobile/', data), //注册获取手机号
  get_mobile_for_share: data => request(ApiUrl + 'teacher/get_mobile_for_share/', data), //分享获取手机号
  teacher_change_mobile: data => request(ApiUrl + 'applets/editMobile/', data), //更换手机号
  get_teacher_verify_code: data => request(ApiUrl + 'applets/getCode/', data), //发送验证码
  //bind_mobile: data => request(ApiUrl+'teacher/check_teacher_mobile/',data),
  teacher_index: data => request(ApiUrl + 'applets/teacherIndex/', data), //教师首页信息
  teacher_login: data => request(ApiUrl + 'teacher/wx_teacher_login/', data), //登录
  teacher_logins: data => request(ApiUrl + 'teacher/wx_login/', data), //登录
  teacher_mobile_login: data => request(ApiUrl + 'teacher/mobile_login/', data), //登录新
  get_teacher_info: data => request(ApiUrl + 'applets/information/', data), //获取用户信息
  wei_teacher_error_book_list: data => request(ApiUrl + 'applets/getExamBasket/', data), //未生成错题本列表
  school_test_paper: data => request(ApiUrl + 'applets/getSchoolBasedList/', data), //校本试卷
  school_test_paper_detail: data => request(ApiUrl + 'applets/getSchoolBasedDetail/', data), //校本试卷习题
  my_team_ids: data => request(ApiUrl + 'teacher/my_team_ids_list/', data), //老师的班级
  get_teacher_text: data => request(ApiUrl + 'teacher/get_text/', data), //绑定邮箱发送
  teacher_study_analysis: data => request(ApiUrl + 'applets/teacherAcademicReport/', data), //老师学情报告、
  analysis_detail: data => request(ApiUrl + 'applets/teamStudentAcademicReport/', data), //查看学生的学情报告
  my_team_ids_list: data => request(ApiUrl + 'applets/getTeamList/', data), //我的班级列表
  team_student_list: data => request(ApiUrl + 'applets/getTeamDetail/', data), //班级学员列表
  remove_student: data => request(ApiUrl + 'applets/delTeamStudent/', data), //删除学生
  remove_teacher: data => request(ApiUrl + 'applets/delTeamTeacher/', data), //删除老师
  save_teacher_email: data => request(ApiUrl + 'applets/editEmail/', data), //绑定邮箱
  // update_avatar: data => request(ApiUrl+'teacher/update_avatar/',data),
  generated_teacher_error_book: data => request(ApiUrl + 'applets/getPapersList/', data), //已生成试卷
  create_teacher_error_book: data => request(ApiUrl + 'applets/createExam/', data), //我的试卷---生成试卷
  get_teacher_errorbook_exercises: data => request(ApiUrl + 'applets/examDetail/', data), //我的试卷查看 
  teacher_know_point: data => request(ApiUrl + 'applets/getTeacherKnowledge/', data), //知识点
  teacher_textbook_exercises: data => request(ApiUrl + 'applets/teacherExercisesList/', data), //知识库 习题筛选
  teacher_join_error: data => request(ApiUrl + 'applets/addExamBasket/', data), //加入/取消错题
  teacher_delete_errorbook: data => request(ApiUrl + 'applets/delTeacherExam/', data), //删除错题本
  teacher_delete_error_exercises: data => request(ApiUrl + 'applets/delExamBasket/', data), //我的错题本-删除已加入错题本的习题 
  teacher_exercise_type: data => request(ApiUrl + 'teacher/exercises_type/', data), //题型  
  teacher_same_type: data => request(ApiUrl + 'applets/teacherSameTypeExercises/', data), //章节课时习题 同类型题目 
  change_teacher_info: data => request(ApiUrl + 'applets/editGender/', data), //修改个人信息 
  change_teacher_name: data => request(ApiUrl + 'applets/editName/', data), //修改个人信息 
  teacher_bind_info: data => request(ApiUrl + 'teacher/bindinfo/', data), //绑定信息
  teacher_bind_info_old: data => request(ApiUrl + 'teacher/bind_info/', data), //绑定信息
  teacher_feedback: data => request(ApiUrl + 'applets/teacherFeedback/', data), //意见反馈
  teacher_newest_paper: data => request(ApiUrl + 'applets/getSchoolResourcesList/', data), //最新试卷
  teacher_add_class: data => request(ApiUrl + 'applets/addTeam/', data), //添加班级
  teacher_add_point: data => request(ApiUrl + 'applets/addTeacherUpload/', data), //上传试卷
  teacher_pointlog: data => request(ApiUrl + 'applets/pointLog/', data), //积分记录
  my_upload_list: data => request(ApiUrl + 'applets/getUploadList/', data), //积分记录
  remove_team: data => request(ApiUrl + 'applets/delTeam/', data), //删除班级
  add_exercises_to_errorbook: data => request(ApiUrl + 'applets/joinExam/', data), //习题加入已生成的试卷
  get_download_based: data => request(ApiUrl + 'teacher/download_based/', data),
  hot_error_exercises: data => request(ApiUrl + 'applets/teacherAcademicReport/', data), //教师查看学生详情的热门题型
  ter_join_team: data => request(ApiUrl + 'teacher/join_team/', data), //邀请老师加入班级
  ter_share_login: data => request(ApiUrl + 'teacher/wx_share_login/', data), //登录
  get_paper: data => request(ApiUrl + 'teacher/get_paper/', data), //老师获取最新试卷
  get_app_teacher_edit_password: data => request(ApiUrl + 'teacher/edit_password/', data), //老师修改密码
  techer_search_team: data => request(ApiUrl + 'teacher/search_team/', data), //搜索班级
  teacher_join_team: data => request(ApiUrl + 'teacher/join_team/', data), //邀请学生加入班级


  //通用
  get_location_list: data => request(ApiUrlold + 'main/get_location_list/', data), //省市区
  subject: data => request(ApiUrl + 'applets/getSubjects/', data,'GET'), //学科分类
  get_grade: data => request(ApiUrl + 'applets/getAddTeam/', data), //班级
  get_agreement: data => request(ApiUrl + 'applets/aboutWe/', data), //协议说明
  get_school: data => request(ApiUrlold + 'main/_get_school_list_by_area/', data), //学校
  level: data => request(ApiUrlold + 'main/exercises_level/', data), //习题难度
  exercise_type: data => request(ApiUrl + 'applets/getSubjectQuestionCategory/', data,"GET"), //题型
  version: data => request(ApiUrl + 'question/version/', data), //教辅版本
  get_semester: data => request(ApiUrlold + 'main/get_semester/', data), //学期
  get_exercise_analysis: data => request(ApiUrl + 'applets/studentKnowledgeBaseExerciseDetail/', data), //查看解析
  get_teacher_exercise_analysis: data => request(ApiUrl + 'applets/teacherKnowledgeExerciseDetail/', data), //查看解析
  search_team: data => request(ApiUrl + 'applets/searchTeam/', data), //搜索班级
  get_team_subject: data => request(ApiUrlold + 'main/get_team_subject/', data), //邀请老师的学科下拉列表
  get_team_location: data => request(ApiUrl + "main/get_team_location/", data),
  get_wechat_login : data => request(ApiUrl + 'wechat/login/', data),// 默认执行登录
}
