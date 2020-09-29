import {
	request
} from './util.js'

// const ApiUrl = 'http://909.ecuca.net:10325/'//开发环境
const ApiUrl = 'https://api.aictb.com/v1/' //生产环境



module.exports = {
	// : data => request(ApiUrl+'',data),
	url: ApiUrl,
	//----------------------------- 学生
	//登录注册
	bind_info: data => request(ApiUrl + 'user/bind_info/', data), //绑定信息
	get_settings: md => request(ApiUrl + 'main/get_settings/', '', md), //获取配置信息
	//首页
	student_login: data => request(ApiUrl + 'user/wx_student_login/', data), //登录
	share_login: data => request(ApiUrl + 'user/wx_share_login/', data), //登录
	student_index: data => request(ApiUrl + 'user/index/', data), //学生端首页信息	
	newest_paper: data => request(ApiUrl + 'user/newest_paper/', data), //名校资源
	my_study_analysis: data => request(ApiUrl + 'user/my_study_analysis/', data), //学情报告
	textbook: data => request(ApiUrl + 'user/textbook/', data), //教辅名称
	add_my_textbook: data => request(ApiUrl + 'user/add_my_textbook/', data), //添加我的教辅
	my_textbook_list: data => request(ApiUrl + 'user/my_textbook_list/', data), //我的教辅列表
	search_exercises: data => request(ApiUrl + 'user/search_exercises/', data), //教辅拍照识题
	//错题本
	wei_error_book_list: data => request(ApiUrl + 'user/my_not_created_error_book/', data), //未生成错题本列表
	generated_error_book: data => request(ApiUrl + 'user/my_created_error_book/', data), //已生成错题本
	delete_error_exercises: data => request(ApiUrl + 'user/delete_error_exercises/', data), //我的错题本-删除已加入错题本的习题
	create_error_book: data => request(ApiUrl + 'user/create_error_book/', data), //我的错题本---生成错题本
	get_errorbook_exercises: data => request(ApiUrl + 'user/get_errorbook_exercises/', data), //查看错题本
	delete_errorbook: data => request(ApiUrl + 'user/delete_errorbook/', data), //删除错题本
	get_text: data => request(ApiUrl + 'user/get_text/', data), //绑定邮箱发送错题本
	my_test_paper: data => request(ApiUrl + 'user/my_test_paper/', data), //我的试卷
	user_test_paper_detail: data => request(ApiUrl + 'user/school_test_paper_detail/', data), //我的试卷详情
	add_exercises_to_errorbook_user: data => request(ApiUrl + 'user/add_exercises_to_errorbook/', data), //习题加入已生成的试卷
	//题库	
	know_point: data => request(ApiUrl + 'user/know_point/', data), //知识点
	textbook_exercises: data => request(ApiUrl + 'user/exercises_list/', data), //知识库 习题筛选
	join_error: data => request(ApiUrl + 'user/join_error_exercises/', data), //加入/取消错题
	same_type: data => request(ApiUrl + 'user/same_type_exercises/', data), //章节课时习题 同类型题目
	//个人信息	
	get_user_info: data => request(ApiUrl + 'user/get_user_info/', data), //获取用户信息
	save_email: data => request(ApiUrl + 'user/save_email/', data), //绑定邮箱
	feedback: data => request(ApiUrl + 'user/feedback/', data), //意见反馈
	change_mobile: data => request(ApiUrl + 'user/change_mobile/', data), //修改手机号
	change_grade: data => request(ApiUrl + 'user/change_grade/', data), //修改手机号
	vip_info: data => request(ApiUrl + 'user/vip/', data), //vip信息
	change_user_info: data => request(ApiUrl + 'user/change_user_info/', data), //修改个人信息
	join_team: data => request(ApiUrl + 'user/join_team/', data), //邀请学生加入班级

	// register : data => request(ApiUrl+'user/user_register/',data),//注册
	//search_password : data => request(ApiUrl+'user/search_password/',data),//找回密码
	catalogue: data => request(ApiUrl + 'question/catalogue/', data), //教辅目录
	catalogue_exercises: data => request(ApiUrl + 'question/catalogue_exercises/', data), //目录课时习题
	// get_school: data => request(ApiUrl+'user/school/',data),//学校

	get_verify_code: data => request(ApiUrl + 'user/get_verify_code/', data), //验证码
	app_pay: data => request(ApiUrl + 'member/_app_pay/', data), //支付




	// : data => request(ApiUrl+'',data),
	//教师端
	get_mobile: data => request(ApiUrl + 'teacher/get_mobile/', data), //注册获取手机号
	get_mobile_for_share: data => request(ApiUrl + 'teacher/get_mobile_for_share/', data), //分享获取手机号
	//bind_mobile: data => request(ApiUrl+'teacher/check_teacher_mobile/',data),
	teacher_index: data => request(ApiUrl + 'teacher/index/', data), //教师首页信息
	teacher_login: data => request(ApiUrl + 'teacher/wx_teacher_login/', data), //登录
	get_teacher_info: data => request(ApiUrl + 'teacher/get_teacher_info/', data), //获取用户信息
	wei_teacher_error_book_list: data => request(ApiUrl + 'teacher/my_not_created_error_book/', data), //未生成错题本列表
	school_test_paper: data => request(ApiUrl + 'teacher/school_test_paper/', data), //校本试卷
	school_test_paper_detail: data => request(ApiUrl + 'teacher/school_test_paper_detail/', data), //校本试卷习题
	my_team_ids: data => request(ApiUrl + 'teacher/my_team_ids_list/', data), //老师的班级
	get_teacher_text: data => request(ApiUrl + 'teacher/get_text/', data), //绑定邮箱发送
	teacher_study_analysis: data => request(ApiUrl + 'teacher/teacher_study_analysis/', data), //老师学情报告、
	analysis_detail: data => request(ApiUrl + 'teacher/user_analysis/', data), //查看学生的学情报告
	my_team_ids_list: data => request(ApiUrl + 'teacher/my_team_ids_list/', data), //我的班级列表
	team_student_list: data => request(ApiUrl + 'teacher/team_student_list/', data), //班级学员列表
	remove_student: data => request(ApiUrl + 'teacher/remove_student/', data), //删除学生
	save_teacher_email: data => request(ApiUrl + 'teacher/save_email/', data), //绑定邮箱
	// update_avatar: data => request(ApiUrl+'teacher/update_avatar/',data),
	generated_teacher_error_book: data => request(ApiUrl + 'teacher/my_created_error_book/', data), //已生成试卷
	create_teacher_error_book: data => request(ApiUrl + 'teacher/create_error_book/', data), //我的试卷---生成试卷
	get_teacher_errorbook_exercises: data => request(ApiUrl + 'teacher/get_errorbook_exercises/', data), //我的试卷查看 
	teacher_know_point: data => request(ApiUrl + 'teacher/know_point/', data), //知识点
	teacher_textbook_exercises: data => request(ApiUrl + 'teacher/exercises_list/', data), //知识库 习题筛选
	teacher_join_error: data => request(ApiUrl + 'teacher/join_error_exercises/', data), //加入/取消错题
	teacher_delete_errorbook: data => request(ApiUrl + 'teacher/delete_errorbook/', data), //删除错题本
	teacher_delete_error_exercises: data => request(ApiUrl + 'teacher/delete_error_exercises/', data), //我的错题本-删除已加入错题本的习题 
	teacher_exercise_type: data => request(ApiUrl + 'teacher/exercises_type/', data), //题型  
	teacher_same_type: data => request(ApiUrl + 'teacher/same_type_exercises/', data), //章节课时习题 同类型题目 
	change_teacher_info: data => request(ApiUrl + 'teacher/change_teacher_info/', data), //修改个人信息 
	teacher_bind_info: data => request(ApiUrl + 'teacher/bind_info/', data), //绑定信息
	teacher_feedback: data => request(ApiUrl + 'teacher/feedback/', data), //意见反馈
	teacher_newest_paper: data => request(ApiUrl + 'teacher/newest_paper/', data), //最新试卷
	teacher_add_class: data => request(ApiUrl + 'teacher/add_class/', data), //添加班级
	teacher_add_point: data => request(ApiUrl + 'teacher/add_point/', data), //上传试卷
	teacher_pointlog: data => request(ApiUrl + 'teacher/pointlog/', data), //积分记录
	my_upload_list: data => request(ApiUrl + 'teacher/my_upload_list/', data), //积分记录
	remove_team: data => request(ApiUrl + 'teacher/remove_team/', data), //删除班级
	add_exercises_to_errorbook: data => request(ApiUrl + 'teacher/add_exercises_to_errorbook/', data), //习题加入已生成的试卷
	get_download_based: data => request(ApiUrl + 'teacher/download_based/', data),
	hot_error_exercises: data => request(ApiUrl + 'teacher/hot_error_exercises/', data), //教师查看学生详情的热门题型
	ter_join_team: data => request(ApiUrl + 'teacher/join_team/', data), //邀请老师加入班级
	ter_share_login: data => request(ApiUrl + 'teacher/wx_share_login/', data), //登录
	get_paper: data => request(ApiUrl + 'teacher/get_paper/', data), //老师获取最新试卷


	//通用
	get_location_list: data => request(ApiUrl + 'main/get_location_list/', data), //省市区
	banner: data => request(ApiUrl + 'main/banner/', data), //首页海报图
	subject: data => request(ApiUrl + 'main/subject/', data), //学科分类
	get_grade: data => request(ApiUrl + 'main/grade/', data), //班级
	get_agreement: data => request(ApiUrl + 'main/get_agreement/', data), //协议说明
	get_school: data => request(ApiUrl + 'main/_get_school_list_by_area/', data), //学校
	level: data => request(ApiUrl + 'main/exercises_level/', data), //习题难度
	exercise_type: data => request(ApiUrl + 'main/exercises_type/', data), //题型
	version: data => request(ApiUrl + 'question/version/', data), //教辅版本
	get_semester: data => request(ApiUrl + 'main/get_semester/', data), //学期
	get_exercise_analysis: data => request(ApiUrl + 'exercises/get_exercise_analysis/', data), //查看解析
	search_team: data => request(ApiUrl + 'main/search_team/', data), //搜索班级
	get_team_subject: data => request(ApiUrl + 'main/get_team_subject/', data), //邀请老师的学科下拉列表
	get_team_location: data => request(ApiUrl + "main/get_team_location/", data)
}
