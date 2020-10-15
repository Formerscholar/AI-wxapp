<template>
	<view>
		<view class="student" v-show="type == 4">
			<view class="fix">
				<view class="tabar">
					<view class="item" @click="selection(i)" v-for="(item, i) of subject_list" :key="i" v-if="subject_list.length != 1">
						<image :src="item.status ? item.icon1 : item.icon2"></image>
						<text :class="{ 'c-c': item.status }">{{ item.title }}</text>
					</view>
					<view class="item item_special" @click="selection(i)" v-for="(item, i) of subject_list" :key="i" v-else>
						<image :src="item.status ? item.icon1 : item.icon2"></image>
						<text :class="{ 'c-c': item.status }">{{ item.title }}</text>
					</view>
				</view>
				<view class="f-btn">
					<view :class="{ 'b-b': select }" @click="change(1)" class="button">未生成错题本列表</view>
					<view :class="{ 'b-b': !select }" @click="change(2)" class="button">已生成错题本列表</view>
				</view>
			</view>

			<!-- 未生成试卷 -->
			<view class="" v-if="select">
				<view class="content" style="padding-bottom: 80rpx;">
					<view class="item2" v-for="(item, i) of exercises_list" :key="i" @click="selected_topic(i)">
						<view v-if="update" :class="{ 'b-n': item.select }" class="b-default"></view>
						<view class=""><rich-text :nodes="changeStyle(item.content)"></rich-text></view>
					</view>
					<view v-if="is_more == 0 && exercises_list.length != 0" class="is_more">没有更多错题了</view>
					<view class="kong" v-if="exercises_list.length == 0">
						<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/noPaper.png" />
						<view>空空如也~</view>
						<view>您还没有创建试卷哦!</view>
					</view>
				</view>

				<view class="b-btn">
					<view class="leftCon">
						<view class="selectAll" @click="selectAll()">
							<view v-if="update" :class="{ 'b-n': all == false }" class="b-default" style="margin: 0;"></view>
							<text>全选</text>
						</view>
						<button @click="delete_error_exercises()">删除</button>
					</view>
					<view class="rightCon">
						<button @click="addPaper()">加入错题本</button>
						<button @click="addCreat()">生成错题本</button>
					</view>
				</view>
			</view>

			<!-- 已生成试卷 -->
			<view class="list" v-else>
				<view class="l-item" v-for="(item, i) of errorbook_list" :key="i" @click="seepaper(item.errorbook_id, item.title, subject_name, 'is_student')">
					<view class="num">
						<image :src="item.subject_icon" mode="" />
						<view class="titleCon">
							<text>{{ item.title }}</text>
							<view class="time">{{ item.add_time }}</view>
						</view>
					</view>
					<view class="btnCons">
						<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/delete.png" @click.stop="delete_errorbook(i)" />
						<view class="line"></view>
						<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/download.png" @click.stop="generated(item.errorbook_id)" />
					</view>
				</view>
				<view v-if="is_more2 == 0 && errorbook_list.length != 0" class="is_more">没有更多错题本了</view>
				<view class="kong" v-if="errorbook_list.length == 0">
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/noPaper.png" />
					<view>空空如也~</view>
					<view>您还没有生成试卷哦!</view>
				</view>
			</view>

			<!-- 遮罩 -->
			<view class="zt" v-show="false"></view>
		</view>

		<!-- 教师端 -->
		<view class="teach" v-show="type == 3">
			<view class="f-btn">
				<view :class="{ 'b-b': select }" @click="change(1)" class="button">未生成试卷</view>
				<view :class="{ 'b-b': !select }" @click="change(2)" class="button">已生成试卷</view>
			</view>
			<!-- 未生成试卷 -->
			<view class="content" style="padding-bottom: 80rpx;" v-if="select">
				<view class="item2" v-for="(item, i) of exercises_list" :key="i" @click="selected_topic(i)">
					<view v-if="update" :class="{ 'b-n': item.select }" class="b-default"></view>
					<view class=""><rich-text :nodes="changeStyle(item.content)"></rich-text></view>
				</view>
				<view v-if="is_more == 0 && exercises_list.length != 0" class="is_more">没有更多试题了</view>
				<view class="kong" v-if="exercises_list.length == 0">
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/noPaper.png" />
					<view>空空如也~</view>
					<view>您还没有创建试卷哦!</view>
				</view>
				<view class="b-btn">
					<view class="leftCon">
						<view class="selectAll" @click="selectAll()">
							<view v-if="update" :class="{ 'b-n': all == false }" class="b-default" style="margin: 0;"></view>
							<text>全选</text>
						</view>
						<button @click="delete_error_exercises()">删除</button>
					</view>
					<view class="rightCon">
						<button @click="addPaper()">加入试卷</button>
						<button @click="addCreat()">生成试卷</button>
					</view>
				</view>
			</view>

			<!-- 已生成试卷 -->
			<view class="list" v-else>
				<view class="l-item" v-for="(item, i) of errorbook_list" :key="i" @click="seepaper(item.errorbook_id, item.title, item.subject_name, 'is_teacher')">
					<view class="num">
						<image :src="item.subject_icon" mode="" />
						<view class="titleCon">
							<text>{{ item.title }}</text>
							<view class="time">{{ item.add_time }}</view>
						</view>
					</view>
					<view class="btnCons">
						<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/delete.png" @click.stop="delete_errorbook(i)" />
						<view class="line"></view>
						<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/download.png" @click.stop="generated(item.errorbook_id)" />
					</view>
				</view>
				<view v-if="is_more2 == 0 && errorbook_list.length != 0" class="is_more">没有更多试卷了</view>
				<view class="kong" v-if="errorbook_list.length == 0">
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/noPaper.png" />
					<view>空空如也~</view>
					<view>您还没有创建试卷哦!</view>
				</view>
			</view>
			<!-- <view class="zt" v-show="false"></view> -->
		</view>

		<!-- 加入错题本/加入试卷弹框 -->
		<uni-popup ref="popupJoin" type="center">
			<view class="maskJoin">
				<view style="color: #000;">
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/creatPaper.png" />
					选择加入{{ type == 4 ? '错题本' : '试卷' }}
				</view>
				<scroll-view scroll-y="true">
					<view class="listJoin" v-if="errorbook_list.length != 0">
						<view v-for="(item, i) of errorbook_list" :key="i" @click="seletJoin(i)">
							<view v-if="update" :class="{ 'b-n': item.status }" class="kuang"></view>
							<view>
								<text>{{ item.title }}</text>
							</view>
						</view>
					</view>
					<view v-else class="listJoin none">您还没有生成{{ type == 4 ? '错题本' : '试卷' }}!</view>
				</scroll-view>
				<view class="btnCon">
					<button @click="cancelPopupJoin()">取消</button>
					<button @click="add_exercises_to_errorbook()">保存</button>
				</view>
			</view>
		</uni-popup>
		<!-- 生成错题本弹框 -->
		<uni-popup ref="popup" type="center">
			<view class="mask2">
				<view v-if="type == 4">
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/creatPaper.png" />
					创建错题本
				</view>
				<view v-if="type == 3">
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/creatPaper.png" />
					创建试卷
				</view>
				<view class="put">
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/inputIcon.png" />
					<input type="text" v-model="title" placeholder="输入试卷名称" v-if="type == 3" />
					<input type="text" v-model="title" placeholder="输入错题本名称" v-if="type == 4" />
				</view>
				<view class="tip"></view>
				<view class="btnCon">
					<button @click="cancel()">取消</button>
					<button @click="create_error_book()">保存</button>
				</view>
			</view>
		</uni-popup>
		<!-- 绑定邮箱弹框 -->
		<uni-popup ref="popup2" type="center">
			<view class="mask2" style="height: 335rpx;">
				<view class="" v-if="">
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/creatPaper.png" style="left:130rpx" />
					绑定邮箱
				</view>
				<view class="put">
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/inputIcon.png" />
					<input type="text" @input="inputHandle" v-model="email" placeholder="输入邮箱" />
					<view class="text_tip" v-if="is_tip">
						<text v-for="(item, index) in email_arr" :key="index" :data-suffix="item" @click="texthandleClick">{{ email + item }}</text>
					</view>
				</view>
				<view class="tip">文件会发送至您的邮箱</view>
				<view class="btnCon">
					<button @click="cancelEmial()">取消</button>
					<button @click="fasong2()">绑定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
let app = getApp();
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import { mapState, mapMutations } from 'vuex';
export default {
	components: { uniPopup },
	data() {
		return {
			select: true,
			fenlei: 0,
			subject_list: [],
			exercises_list: [],
			errorbook_list: [],
			subject_id: 1,
			cuoti: [],
			type: 4,
			token: '',
			is_more: 1, //未生成的错题本列表
			is_more2: 1, //已生成的错题本列表
			page: 1,
			update: true,
			email: '',
			title: '',
			errorbook_id: '', //下载试卷id
			all: true,
			subject_name: '',
			formId: '',
			is_vip: false,
			tpmid: '',
			is_tip: false,
			email_arr: []
		};
	},
	onReachBottom() {
		if (this.is_more) {
			this.page++;
			this.wei_error_book();
		}
		if (this.is_more2) {
			this.page++;
			this.generated_error_book();
		}
	},
	onLoad() {
		this.email_arr = app.globalData.email;
		this.token = uni.getStorageSync('token');
		this.tpmid = app.globalData.settings.tmpid;
		console.log('this.tpmid', this.tpmid);
		this.type = uni.getStorageSync('type');
		this.is_vip = uni.getStorageSync('is_vip');

		if (this.type == 3) {
			this.subject_id = -1;
			this.wei_error_book();
			this.generated_error_book();
			uni.setNavigationBarTitle({
				title: '我的试卷'
			});
			uni.setTabBarItem({
				index: 1,
				text: '我的试卷',
				iconPath: '/static/imgs/icon/myPaper1.png',
				selectedIconPath: '/static/imgs/icon/myPaper.png'
			});
		} else {
			this.page = 1;
			this.subject_fenlei();
		}
		this.all = true; //取消全选
	},
	onShow() {},
	computed: {
		// ...mapState(['type'])
	},
	methods: {
		texthandleClick(e) {
			this.email = this.email + e.currentTarget.dataset.suffix;
			this.is_tip = false;
		},
		inputHandle() {
			if (this.email.indexOf('@') != -1) {
				this.is_tip = false;
			} else {
				if (this.email == '') {
					this.is_tip = false;
				} else {
					this.is_tip = true;
				}
			}
		},
		changeStyle(item) {
			item = item.replace(new RegExp('<p', 'gi'), '<p style="color: #000;position:relative"');
			item = item.replace(new RegExp('<img', 'gi'), '<img style="max-width:95%;vertical-align: middle;width:auto;"');
			return item;
		},
		//点击加入试卷/错题本
		addPaper() {
			this.$refs.popupJoin.open();
			// this.generated_error_book()
		},
		//点击生成错题本/生成试卷
		addCreat() {
			this.$refs.popup.open();
		},
		//点击邮箱下载
		generated(id) {
			this.errorbook_id = id;
			console.log('this.tpmid', this.tpmid);
			let arrTpmid = [];
			if (this.type == 4) {
				arrTpmid = this.tpmid.user_errorbook;
				if (!this.is_vip) {
					uni.showToast({
						title: '非会员无法下载',
						icon: 'none'
					});
					return false;
				}
			} else {
				arrTpmid = this.tpmid.teacher_paper;
			}
			console.log(arrTpmid);
			uni.requestSubscribeMessage({
				tmplIds: arrTpmid,
				complete: res => {
					console.log('status', res);
					this.fasong();
				},
				success: function(res) {
					// this.fasong()
				},
				fail: function(res) {}
			});
		},
		selected_topic(i) {
			console.log(i);
			if (this.exercises_list[i].select) {
				this.exercises_list[i].select = false;
				this.all = true;
			} else {
				this.exercises_list[i].select = true;
			}
			this.update = false;
			this.update = true;
		},
		seletJoin(i) {
			console.log('i', i);
			if (this.errorbook_list[i].status) {
				this.errorbook_list[i].status = false;
			} else {
				this.errorbook_list[i].status = true;
			}
		},
		cancelPopupJoin() {
			this.$refs.popupJoin.close();
		},
		//点击加入试卷确认按钮
		add_exercises_to_errorbook() {
			this.$refs.popupJoin.close();
			uni.showModal({
				title: '确定加入吗？',
				success: res => {
					if (res.confirm) {
						let arrWei = [],
							arrYi = [],
							str = '',
							str1 = '';
						this.exercises_list.forEach((elem, i, arr1) => {
							if (elem.select) {
								arrWei.push(elem.exercises_id);
							}
						});
						this.errorbook_list.forEach((elem, i, arr1) => {
							if (elem.status) {
								arrYi.push(elem.errorbook_id);
							}
						});
						str = arrWei.toString();
						str1 = arrYi.toString();
						let req = '';
						if (this.type == 4) {
							req = this.$api.add_exercises_to_errorbook_user({ token: this.token, exercises_ids: str, error_book_ids: str1 });
						} else {
							req = this.$api.add_exercises_to_errorbook({ token: this.token, exercises_ids: str, error_book_ids: str1 });
						}
						req.then(res => {
							console.log(res);
							if (res.code == 200) {
								uni.showToast({
									title: '添加成功'
								});
								this.page = 1;
								this.wei_error_book();
								this.generated_error_book();
								this.all = true;
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								});
							}
						});
					}
				}
			});
		},
		cancelEmial() {
			this.$refs.popup2.close();
		},
		//绑定邮箱发送
		fasong2() {
			let data = {
				token: this.token,
				errorbook_id: this.errorbook_id,
				email: this.email
			};
			if (this.type == 3) {
				var req = this.$api.get_teacher_text(data);
			} else {
				var req = this.$api.get_text(data);
			}
			req.then(res => {
				console.log(res);
				if (res.code == 200) {
					this.email = '';
					this.$refs.popup2.close();
					uni.showToast({
						title: '下载成功，已发送邮箱！',
						icon: 'none'
					});
				} else {
					/* uni.showToast({
							title:res.msg,
							icon:'none'
						}) */
				}
			});
		},
		//发送邮箱
		fasong() {
			let data = {
				token: this.token,
				errorbook_id: this.errorbook_id
				// email:this.email
			};
			if (this.type == 3) {
				this.$api.get_teacher_text(data).then(res => {
					console.log(res);
					if (res.code == 200) {
						this.email = '';
						this.$refs.popup2.close();
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					} else {
						/* uni.showToast({
								title:res.msg,
								icon:'none'
							}) */
					}
					if (res.code == 300) {
						this.$refs.popup2.open();
					}
				});
			} else {
				if (this.is_vip != 1) {
					uni.showToast({
						title: '非会员用户无法下载',
						icon: 'none'
					});
					return;
				} else {
					this.$api.get_text(data).then(res => {
						console.log(res);
						if (res.code == 200) {
							this.email = '';
							this.$refs.popup2.close();
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						} else {
							/* uni.showToast({
									title:res.msg,
									icon:'none'
								}) */
						}
						if (res.code == 300) {
							this.$refs.popup2.open();
						}
					});
				}
			}
		},
		//未生成错题本列表
		wei_error_book() {
			let data = {
				token: this.token,
				subject_id: this.subject_id,
				page: this.page
			};
			if (this.type == 3) {
				var req = this.$api.wei_teacher_error_book_list(data);
			} else {
				var req = this.$api.wei_error_book_list(data);
			}
			req.then(res => {
				console.log(res);
				this.is_more = res.is_more;
				console.log(this.page);
				if (res.code != 200) {
					/* uni.showToast({
							title:res.msg,
							icon:'none'
						}) */
					this.exercises_list = [];
				}
				//console.log('res.data.exercises_list.length',res.data.exercises_list);
				if (this.page == 1) {
					this.exercises_list = res.data.exercises_list;
				} else {
					this.exercises_list = [...this.exercises_list, ...res.data.exercises_list];
				}
				console.log(this.exercises_list);
			});
		},
		//学科分类
		subject_fenlei() {
			this.$api.subject().then(res => {
				console.log(res);
				var list = res.data;
				list.forEach(function(elem, i, arr) {
					elem.status = false;
				});
				this.subject_list = list;
				this.subject_id = list[0].id;
				this.selection(0);
				console.log(this.subject_list);
			});
		},
		//生成错题本
		cancel() {
			this.$refs.popup.close();
		},
		create_error_book() {
			var n_arr = [];
			this.exercises_list.forEach((elem, i, arr) => {
				if (elem.select) {
					n_arr.push(elem.exercises_id);
				}
			});
			if (n_arr.length == 0) {
				uni.showToast({
					title: '请选择要生成的错题!',
					icon: 'none'
				});
				return;
			}
			if (!this.title) {
				uni.showToast({
					title: '请输入名称!',
					icon: 'none'
				});
			}
			let data = {
				token: this.token,
				subject_id: this.subject_id,
				exercises_ids: n_arr.toString(),
				title: this.title
			};
			if (this.type == 3) {
				var req = this.$api.create_teacher_error_book(data);
			} else {
				var req = this.$api.create_error_book(data);
			}
			req.then(res => {
				console.log(res);
				if (res.code == 200) {
					this.$refs.popup.close();
					this.page = 1;
					this.title = '';
					uni.showToast({
						title: '生成成功'
					});
					this.wei_error_book();
					this.generated_error_book();
				}
			});
		},
		// 已生成错题本列表
		generated_error_book() {
			if (this.type == 4) {
				this.$api.generated_error_book({ subject_id: this.subject_id, token: this.token, page: this.page }).then(res => {
					console.log(res);
					// if(res.code!=200){
					// 	uni.showToast({
					// 		title:res.msg,
					// 		icon:'none'
					// 	})
					// }
					console.log(res.code != 200);
					if (res.code != 200) {
						this.errorbook_list = [];
						return;
					}
					this.is_more2 = res.is_more;
					if (this.page == 1) {
						this.errorbook_list = res.data.errorbook_list;
					} else {
						this.errorbook_list = [...this.errorbook_list, ...res.data.errorbook_list];
					}
				});
			} else {
				this.$api.generated_teacher_error_book({ subject_id: this.subject_id, token: this.token, page: this.page }).then(res => {
					console.log(res);
					// if(res.code!=200){
					// 	uni.showToast({
					// 		title:res.msg,
					// 		icon:'none'
					// 	})
					// }
					console.log(res.code != 200);
					if (res.code != 200) {
						this.errorbook_list = [];
						return;
					}
					this.is_more2 = res.is_more;
					if (this.page == 1) {
						this.errorbook_list = res.data.errorbook_list;
					} else {
						this.errorbook_list = [...this.errorbook_list, ...res.data.errorbook_list];
					}
				});
			}
		},
		//删除错题本
		delete_errorbook(i) {
			uni.showModal({
				title: '确定要删除吗？',
				success: res => {
					if (res.confirm) {
						let data = {
							token: this.token,
							errorbook_id: this.errorbook_list[i].errorbook_id
						};
						if (this.type == 3) {
							var req = this.$api.teacher_delete_errorbook(data);
						} else {
							var req = this.$api.delete_errorbook(data);
						}
						req.then(res => {
							this.errorbook_list.splice(i, 1);
							console.log(res);
						});
					}
				}
			});
		},
		selectAll() {
			if (this.all) {
				this.exercises_list.forEach((elem, i, arr) => {
					elem.select = true;
				});
				this.all = false;
			} else {
				this.exercises_list.forEach((elem, i, arr) => {
					elem.select = false;
				});
				this.all = true;
			}
			this.update = false;
			this.update = true;
		},
		//删除错题
		delete_error_exercises() {
			var n_arr = [];
			this.exercises_list.forEach((elem, i, arr) => {
				if (elem.select) {
					n_arr.push(elem.exercises_id);
				}
			});
			console.log(n_arr);
			var data = {
				token: this.token,
				exercises_ids: n_arr.toString()
			};
			if (this.type == 3) {
				var req = this.$api.teacher_delete_error_exercises(data);
			} else {
				var req = this.$api.delete_error_exercises(data);
			}
			req.then(res => {
				console.log(res);
				if (res.code == 200) {
					this.page = 1;
					this.wei_error_book();
					// this.exercises_list.forEach((elem,i,arr)=>{
					// 	if(elem.select){
					// 		this.exercises_list.splice(i,1)
					// 	}
					// })
					uni.showToast({
						title: '删除成功'
					});
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
			});
		},
		seepaper(id, title, subject_name, is) {
			uni.navigateTo({
				url: '/pages/myPaper/seePapers?based_id=' + id + '&st=1' + '&title=' + title + '&subject_name=' + subject_name + '&is=' + is
			});
		},
		change(i) {
			this.page = 1;
			this.all = true; //取消全选
			this.wei_error_book();
			this.generated_error_book();
			if (i == 1) {
				this.select = true;
			} else {
				this.select = false;
			}
		},
		//选择科目
		selection(i) {
			this.page = 1;
			this.all = true; //取消全选
			this.subject_id = this.subject_list[i].id;
			this.subject_list.forEach((e, j, arr) => {
				if (i == j) {
					e.status = true;
				} else {
					e.status = false;
				}
			});
			this.wei_error_book();
			this.generated_error_book();
			this.getsubject();
		},
		//获取学科
		getsubject() {
			var _this = this;
			_this.subject_list.forEach((it, i, arr) => {
				if (it.status) {
					_this.subject_name = it.title;
				}
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background: #eee;
	font-family: PingFang SC;
}
button::after {
	border: none;
}
.student {
	margin-top: 216rpx;
	.f-btn {
		width: 100vw;
		height: 70rpx;
		line-height: 70rpx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
		background: #fff;
		border-bottom: 1rpx solid #e7e7e7;
		.button {
			background: #fff;
			font-size: 26rpx;
			color: #4c4c4c;
			line-height: 70rpx;
			height: 70rpx;
			position: relative;
		}
	}
	.fix {
		position: fixed;
		z-index: 99;
		top: 0;
		left: 0;
		.tabar {
			padding: 30rpx 30rpx 5rpx;
		}
	}
	.item2 {
		padding: 30rpx;
		background: #fff;
		display: flex;
		margin: 25rpx;
		border: 1px solid #e6e6e6;
		border-radius: 20rpx;
		width: 700rpx;
		box-sizing: border-box;
		// align-items: center;
		justify-content: space-between;
		view:first-child {
		}
		view:nth-child(2) {
			width: 92%;
		}
	}
	.b-btn {
		height: 80rpx;
		line-height: 80rpx;
		width: 100vw;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		background: #fff;
		border-top: 1rpx solid #e7e7e7;
		border-bottom: 1rpx solid #e7e7e7;
		.selectAll {
			display: flex;
			align-items: center;
			position: absolute;
			left: 30rpx;
			font-size: 28rpx;
			top: 50%;
			transform: translateY(-50%);
			text {
				margin-left: 15rpx;
			}
		}
		.leftCon {
			button {
				width: 120rpx;
				background: #e7e7e7;
				color: #5a5555;
				margin: 20rpx 0 0 150rpx;
			}
		}
		.rightCon {
			margin: 20rpx 30rpx 0 0;
			display: flex;
			// font-size: 0;
			button {
				display: inline-block;
				margin-left: 15rpx;
			}
		}
		button {
			color: #ffffff;
			width: 140rpx;
			height: 40rpx;
			font-size: 24rpx;
			line-height: 40rpx;
			background-image: linear-gradient(left, #e50304 0%, #f74300 80%);
			border-radius: 20rpx;
			padding-left: 0 !important;
			padding-right: 0 !important;
		}
	}

	.mask {
		z-index: 999;
		// position: absolute;
		// top: 500rpx;
		// left: 50%;
		// transform: translateX(-50%);
		padding: 30rpx;
		width: 500rpx;
		height: 400rpx;
		background: #fff;
		border-radius: 8rpx;
		view:first-child {
			font-size: 32rpx;
			color: #f8601c;
			width: 100%;
			text-align: center;
			margin-top: 80rpx;
		}
		.put {
			margin-top: 30rpx;
			height: 50rpx;
			border-bottom: 1rpx solid #666;
			.text {
				height: 100%;
				width: 100%;
				font-size: 24rpx;
				color: #999;
			}
		}
		button {
			margin-top: 40rpx;
			border: 1rpx solid #fff;
			color: #ffffff;
			width: 220rpx;
			height: 80rpx;
			font-size: 32rpx;
			line-height: 80rpx;
			background-image: linear-gradient(left, rgb(222, 81, 28) 0%, rgb(240, 150, 50) 100%);
		}
	}
}

.list {
	.l-item {
		padding: 25rpx;
		box-sizing: border-box;
		margin: 25rpx;
		background: #fff;
		border: 1rpx solid #e7e7e7;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 20rpx;
		.num {
			// font-size: 0;
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			image {
				width: 50rpx;
				height: 50rpx;
				margin: auto 25rpx auto 0;
			}
			.titleCon {
				text {
					display: block;
					font-size: 30rpx;
					color: #2c2c2c;
					width: 405rpx;
				}
				.time {
					font-size: 24rpx;
					color: #a7a7a7;
					margin-top: 10rpx;
				}
			}
		}
		.btnCons {
			display: flex;
			image {
				display: inline-block;
				width: 40rpx;
				height: 50rpx;
				padding: 15rpx 30rpx;
			}
			.line {
				width: 1px;
				height: 30px;
				background: #f5f5f5;
				margin-top: 15rpx;
			}
		}
	}
}

.teach {
	margin-top: 97rpx;
	.f-btn {
		height: 70rpx;
		line-height: 70rpx;
		position: fixed;
		z-index: 99;
		top: 0;
		width: 100vw;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
		background: #fff;
		border-bottom: 1rpx solid #e7e7e7;
		.button {
			background: #fff;
			font-size: 26rpx;
			color: #4c4c4c;
			position: relative;
		}
	}
	.item2 {
		padding: 30rpx;
		background: #fff;
		display: flex;
		margin: 25rpx;
		border: 1px solid #e6e6e6;
		border-radius: 20rpx;
		width: 700rpx;
		box-sizing: border-box;
		// align-items: center;
		justify-content: space-between;
		view:first-child {
		}
		view:nth-child(2) {
			width: 92%;
		}
	}
	.item2:nth-of-type(1) {
		margin-top: 95rpx;
	}
	.b-btn {
		width: 100vw;
		height: 80rpx;
		line-height: 80rpx;
		position: fixed;
		bottom: 0;
		background-color: #fff;
		left: 0;
		display: flex;
		justify-content: space-between;
		border-top: 1rpx solid #e7e7e7;
		border-bottom: 1rpx solid #e7e7e7;
		.selectAll {
			display: flex;
			align-items: center;
			position: absolute;
			left: 30rpx;
			font-size: 28rpx;
			top: 50%;
			transform: translateY(-50%);
			text {
				margin-left: 15rpx;
			}
		}
		.leftCon {
			button {
				width: 120rpx;
				background: #e7e7e7;
				color: #5a5555;
				margin: 20rpx 0 0 150rpx;
			}
		}
		.rightCon {
			margin: 20rpx 30rpx 0 0;
			// font-size: 0;
			display: flex;
			button {
				display: inline-block;
				margin-left: 15rpx;
			}
		}
		button {
			color: #ffffff;
			width: 140rpx;
			height: 40rpx;
			font-size: 24rpx;
			line-height: 40rpx;
			background-image: linear-gradient(left, #e50304 0%, #f74300 80%);
			border-radius: 20rpx;
			padding-left: 0 !important;
			padding-right: 0 !important;
		}
	}
	.mask {
		z-index: 999;
		position: absolute;
		top: 500rpx;
		left: 50%;
		transform: translateX(-50%);
		padding: 30rpx;
		width: 500rpx;
		height: 400rpx;
		background: #fff;
		border-radius: 8rpx;
		view:first-child {
			font-size: 32rpx;
			color: #f8601c;
			width: 100%;
			text-align: center;
			margin-top: 80rpx;
		}
		.put {
			margin-top: 30rpx;
			height: 50rpx;
			border-bottom: 1rpx solid #666;
			.text {
				height: 100%;
				width: 100%;
				font-size: 24rpx;
				color: #999;
			}
		}
		button {
			margin-top: 40rpx;
			border: 1rpx solid #fff;
			color: #ffffff;
			width: 220rpx;
			height: 80rpx;
			font-size: 32rpx;
			line-height: 80rpx;
			background-image: linear-gradient(left, #e50304 0%, #f74300 80%);
		}
	}
}

.maskJoin {
	z-index: 999;
	width: 500rpx;
	height: 520rpx;
	background: #fff;
	border-radius: 20rpx;
	> view:first-child {
		font-size: 32rpx;
		color: #e50304;
		width: 100%;
		text-align: center;
		padding-top: 30rpx;
		position: relative;
		border-bottom: 1rpx solid #e7e7e7;
		padding-bottom: 30rpx;
		image {
			width: 36rpx;
			height: 36rpx;
			position: absolute;
			top: 35rpx;
			left: 95rpx;
		}
	}
	.listJoin.none {
		color: #c4c5c6;
		font-size: 28rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	scroll-view {
		width: 100%;
		height: 300rpx;
		.listJoin {
			padding: 10rpx 0;
			> view {
				display: flex;
				flex-flow: row nowrap;
				justify-content: flex-start;
				align-items: center;
				padding: 15rpx 30rpx;
				box-sizing: border-box;
				.kuang {
					width: 25rpx;
					height: 25rpx;
					border-radius: 50%;
					border: 0.5rpx solid #c5c5c5;
					margin-right: 30rpx;
				}
				> view {
					width: 412rpx;
				}
			}
		}
	}
	.btnCon {
		padding-top: 30rpx;
		font-size: 0;
		border-top: 1rpx solid #e7e7e7;
	}
	button:nth-of-type(1) {
		background: transparent;
		border: 1rpx solid #c0c0c0;
		color: #c0c0c0;
	}
	button {
		color: #ffffff;
		display: inline-block;
		width: 200rpx;
		height: 60rpx;
		font-size: 32rpx;
		line-height: 60rpx;
		background-image: linear-gradient(left, #e50304 0%, #f74300 80%);
		border-radius: 20rpx;
		margin-left: 35rpx;
	}
}
.mask2 {
	z-index: 999;
	width: 500rpx;
	height: 290rpx;
	background: #fff;
	border-radius: 20rpx;
	padding-bottom: 30rpx;
	view:first-child {
		font-size: 32rpx;
		color: #000;
		width: 100%;
		text-align: center;
		margin-top: 80rpx;
		padding-top: 30rpx;
		position: relative;
		image {
			width: 36rpx;
			height: 36rpx;
			position: absolute;
			top: 35rpx;
			left: 105rpx;
		}
	}
	.put {
		margin-top: 30rpx;
		height: 60rpx;
		width: 430rpx;
		margin: 50rpx auto;
		margin-bottom: 20rpx;
		border: 1rpx solid #e50304;
		border-radius: 20rpx;
		position: relative;
		input {
			height: 100%;
			width: 80%;
			margin: 0 0 0 75rpx;
			font-size: 24rpx;
			color: #c0c0c0;
			text-align: left;
		}
		image {
			width: 36rpx;
			height: 36rpx;
			position: absolute;
			top: 15rpx;
			left: 30rpx;
		}
		.text_tip {
			width: 80%;
			position: absolute;
			left: 75rpx;
			top: 70rpx;
			font-size: 24rpx;
			background-color: #ffffff;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
			z-index: 11;
			overflow: hidden;
			text {
				width: 100%;
				text-align: left;
				padding: 10rpx;
				margin-bottom: 5rpx;
				padding-left: 30rpx;
			}
		}
	}
	.tip {
		font-size: 24rpx;
		color: #999999;
		margin: 0 40rpx 40rpx 40rpx;
	}
	.btnCon {
		font-size: 0;
	}
	button:nth-of-type(1) {
		background: transparent;
		border: 1rpx solid #c0c0c0;
		color: #c0c0c0;
	}
	button {
		color: #ffffff;
		display: inline-block;
		width: 200rpx;
		height: 60rpx;
		font-size: 32rpx;
		line-height: 60rpx;
		background-image: linear-gradient(left, #e50304 0%, #f74300 80%);
		border-radius: 20rpx;
		margin-left: 35rpx;
	}
}
.zt {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background: #666;
	opacity: 0.5;
	z-index: 99;
}

// list
.b-default {
	/* border: none !important;
		background: url(//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/default.png);
		background-size: cover;
		width: 25rpx !important;
		height: 25rpx !important; */
	width: 25rpx;
	height: 25rpx;
	border: 0.5rpx solid #c5c5c5;
	border-radius: 50%;
	margin: 5rpx;
}
.b-n {
	border: 0.5rpx solid #e50304 !important;
	background: #e50304 url(//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/gou.png) no-repeat center center;
	background-size: 100%;
}
.b-b {
	background: #fff !important;
	color: #e50304 !important;
	position: relative;
	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 85rpx;
		height: 10rpx;
		background: #e50304;
		border-radius: 20rpx;
	}
}
.c-c {
	color: #e50304 !important;
}
.kong {
	image {
		margin: 225rpx auto 50rpx;
		width: 196rpx;
		height: 237rpx;
	}
	view {
		text-align: center;
		font-size: 30rpx;
		line-height: 50rpx;
		color: #c4c5c6;
	}
}
</style>
