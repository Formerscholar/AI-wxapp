// 有loading，封装request
function request(url, data = {}, method = "post") {
	let _timestamp = timestamp();
	return new Promise(function(resolve, reject) {
		uni.showLoading({
			title: '玩命加载中',
		})
		const userInfoData = uni.getStorageSync('userInfo')
		if (data.token == '') {
			data.token = userInfoData.token
		}
		if (!data.hasOwnProperty('token')) {
			data = {
				token: userInfoData.token,
				...data
			}
		}
		console.log('request2', data)
		uni.request({
			url: url,
			data: data,
			method: method,
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			success: (res) => {
				uni.hideLoading();
				// console.log(res)
				if (res.statusCode == 200) {
					// 令牌失效 跳转登录页 认证过期或者未登录
					if (res.data.code == 100) {
						uni.showToast({
							title: '您未登录或登录过期',
							icon: 'none',
							duration: 1500
						})
						setTimeout(() => {
							uni.hideToast();
							uni.removeStorageSync('userInfo')
							uni.removeStorageSync('hasLogin')
							uni.reLaunch({
								url: '/pages/login/login'
							})
						}, 1500)
					}
					resolve(res.data);
				} else {
					reject(res.errMsg);
				}
			},
			complete: function() {
				// uni.hideNavigationBarLoading()
				uni.stopPullDownRefresh()
			},
			fail: function(err) {
				uni.hideLoading();
				reject(err);

			}
		})
	});
}


function timestamp() {
	var timestamp = Date.parse(new Date());
	timestamp = timestamp / 1000;
	return timestamp;
	// token timestamp sign 
}

module.exports = {
	request,
	timestamp
}
