# 1.16 日报

```javascript
	1.更换教师端 学情报告 接口
	2.更换教师端 知识库 接口
	3.更换教师端 个人+首页 接口
	4.更换教师端 我的试卷 接口
  
```


# 1.15 日报

```javascript
	1.更换教师端 名校资源/校本试卷 列表详情 接口
	1.更换教师端 班级相关 接口
```

# 1.14 日报

```javascript
	1.更换学生端 错题本相关 接口
```

# 1.13 日报

```javascript
	1.更换学生端 首页拍照识题 接口
	2.更换学生端 我的教辅+单题识别 接口
	3.更换学生端 校本试卷，名校试卷，学情报告 接口
	4.更换学生端 知识库 接口
```


# 1.12 日报

```javascript
	1.更换学生端我的页面+资料页面接口
	2.更换学生端首页接口
```

# 11.11 日报
```
	1.修复 名校资源详情点击加入错题异常
	2.修复 unionid保存问题
```

# 11.5 日报
```
1. 新增 迭代下载选择样式 + 增加手机下载PDF + 开打PDF
2. 新增 首页拍照回退原版本 
3. 新增 教辅拍照 更新icon样式 
4. 新增 首页会员提示框  + 修复样式
5. 新增 我的页面公众号商城icon+路由
6. 修复 小程序报错
7. 修复 前后端联调

```

# 10.23 日报
```
1. 修复 小程序报错
2. 新增 老师班级详情增加创建人可以删除老师按钮功能
3. 新增 老师分享刷新token 

```


# 10.22 日报

```
1.  修复  名校资源 点击范围过小
2.  修复  grade_names undefined 错误
3.  修复  this.grade is not an object 错误
4.  修复  province_id of undefined 错误
5.  修复  undefined is not an object (evaluating 'this.userInfo.nickName')
```

# 10.15 日报

```
1.  修复  绑定邮箱样式+提取全局邮箱后缀
2.  修复  登录选项title+学情报告样式
```

# 10.14 日报

```
1.  新增 绑定邮箱输入提示
2.  修复 老师首页学情报告多班级样式错误
3.  新增 班级增加移除学生功能
4.  修复 登录后状态判断问题
```


# 10.13 日报

```
1.  修复 老师班级成员是会员，没有显示VIP图标 
2.  新增 开通会员增加发送会员到期和开通成功的通知
3.  修复 学生登录逻辑，必走绑定信息
4.  修复 我的教辅 拍照搜题 加入错题后不弹出同类错题问题
5.  修复 知识库 初始化重复加载 exercise_selection
```

# 10.12 日报

```
1.  新增 整合拍照上传和分析页面 增加图片上传进度条
2.  修复 试卷内容 颜色为黑色
3.  新增 全局传递当前页面路径
4.  新增 我的教辅等学科选择页面 跳转保存状态+刷新当前数据
5.  新增 会员续费开通下发微信通知
6.  新增 每次打开小程序检测版本
7.  修复 老师班级信息学生名称后面的VIP标志不显示
8.  修复 试卷无法下载问题
```


# 10.10 日报

```
1.  修复 tabbar 图标
2.  修复 统一接口header 传参
3.  修复 我的教辅 直接拍照搜题问题
4.  新增 拍照搜题页面UI+闪光灯功能
5.  修复 学情报告无数据提示+清空无数据+选择器时间问题
6.  修复 学生邀请绑定班级页面UI
```

# 10.9 日报

```
1.  修复 学生/老师 登录+邀请 微信信息传递错误问题
2.  修复 tabbar 图标
3.  新增 保存手机信息到统一接口header 
4.  新增 自定义拍照页面基本布局+接口传参
5.  新增 相机权限+判断授权
6.  新增 相册直接选择图片UI+接口
```

# 9.30 日报

```
1.  删除 老师班级信息 删除按钮  
2.  修复 学情报告 时间计算问题
3.  修复 学生邀请BG图 + 绑定班级 UI 
4.  修复 老师创建班级 UI
5.  修复 未注册用户绑定信息后依旧跳回登录页BUG
6.  修复 绑定邮箱后未关闭popup
```


# 9.29 日报

```
1.  修复  老师分享问题+重构代码逻辑+自动获取已有账户真实姓名+学科
2.  修复  学生端拍照识题页面UI + 学生端首页UI 
3.  修复  学生端分享邀请数据传输
4.  新增  login 传输 userInfo 数据  
5.  修复  已有ICON 更换
6.  修复  老师邀请选择器BUG + 校本试卷请求逻辑 
```


# 9.28 日报

```
1.  修复 下载试卷BUG问题
2.  修复 学生分享问题+重构代码逻辑+自动获取已有账户真实姓名
3.  修复 登录逻辑+删除垃圾代码
4.  修复 替换大图 背景图更新
```


# 9.27 日报

```
1.  新增 请求发送失败 统一 toast提示
2.  新增 请求发送成功 响应非200 toast提示 (可选200提示)
3.  新增 同类错题 错题解析 页面 接口（待完成UI）
-------------↓↓↓ uniapp ↓↓↓------------
4.  修复 学情报告 时间选择 +title样式  及无会员进入
5.  修复 教师登录逻辑（王总指导完成）
6.  修复 教师邀请老师加入班级逻辑（王总指导完成）
```

# 9.25 日报

```
1.  完善 学生拍照搜题模块 UI+接口逻辑
2.  新增 学生拍照上传成功跳转页面（拍照搜索） UI+接口逻辑
3.  新增 学生搜索结果跳转教辅内容页面 UI+接口逻辑
4.  新增 教辅内容 同类题目 弹出层 UI+接口 （已封装）
5.  新增 教辅内容 点击功能 UI+接口 （待完成）
```

# 9.24 日报

```
1.  新增 学生我的模块UI+接口
2.  完善 学生登录流程开发验证
3.  重构 首页轮播图
4.  新增 拍照搜题UI+接口（待完成）
```

# 9.23 日报

## 完成工作

```
1.  新增 首页剩余模块UI+接口对接
2.  新增 学生 错题本+知识库 页面UI
3.  重构 使用原生tabbar
4.  新增 首页判断登录状态+长登录 自动跳转登录+绑定信息 （暂时只做了学生登录）

```

## 明日计划

```
  继续后续开发
```

# 9.22 日报

## 完成工作

```
1.  完成 选择身份页面UI+学生注册接口
2.  完成 学生绑定个人信息UI+接口
3.  完成 学生首页tabbar + swiper UI+接口
```

## 明日计划

```
  学生首页开发
```

# 9.21 日报

## 完成工作

```
1. 完成 选择身份页面UI+判断老师是否绑定接口
2. 完成 老师绑定个人信息页面UI
```

## 明日计划

```
 对接个人信息绑定API及继续后面开发
```
