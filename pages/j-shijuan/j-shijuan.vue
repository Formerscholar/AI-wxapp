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
			<view class="put"><input type="text" value="" placeholder="输入邮箱" /></view>
			<button type="primary">绑定</button>
		</view>
		<!-- 遮罩 -->
		<view class="zt" v-show="false"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			select: true
		};
	},
	methods: {}
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
</style>
