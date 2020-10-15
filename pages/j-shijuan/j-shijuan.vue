<template>
	<view>
		<view class="f-btn">
			<button :class="{ 'b-b': select }" @click="change(1)">未生成试卷列表</button>
			<button :class="{ 'b-b': !select }" @click="change(2)">已生成试卷列表</button>
		</view>

		<view class="content" v-if="select">
			<view class="item2">
				<view class="b-n"></view>
				<view class="">1.asdadadadasddasdasfasdas</view>
			</view>
			<view class="b-btn">
				<button>删除</button>
				<button>生成试卷</button>
			</view>
		</view>

		<!-- 试卷列表 -->
		<view class="list" v-else>
			<view class="l-item" v-for="(item, i) of 9" :key="i">
				<view class="num">
					<text>01</text>
					<text>试卷1</text>
				</view>

				<view class="">
					<button>删除</button>
					<button>下载</button>
				</view>
			</view>
		</view>

		<view class="mask" v-show="false">
			<view class="">试卷名称</view>
			<view class="put"><input type="text" value="" placeholder="输入名称" /></view>
			<button>保存</button>
		</view>

		<view class="mask" v-show="false">
			<view class="">绑定邮箱</view>
			<view class="put">
				<input type="text" value="" placeholder="输入邮箱" />
				<view class="text_tip" v-if="is_tip">
					<text v-for="(item, index) in email_arr" :key="index" :data-suffix="item" @click="texthandleClick">{{ email + item }}</text>
				</view>
			</view>
			<button type="primary">绑定</button>
		</view>
		<!-- 遮罩 -->
		<view class="zt" v-show="false"></view>
	</view>
</template>

<script>
let app = getApp();
export default {
	data() {
		return {
			select: true,
			email_arr: []
		};
	},
	onLoad() {
		this.email_arr = app.globalData.email;
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

.b-n {
	border: none !important;
	background-image: url(//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/gou.png);
	background-size: cover;
}
.b-b {
	background: #f75e1b !important;
	color: #fff !important;
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
.mask {
	.put {
		position: relative;
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
}
</style>
