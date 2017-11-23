<template>
	<transition name='show'>
		<div class='foreshow'>
			<head class='head'>
				<router-link tag='div' to='/foreshow/brand'>品牌特卖</router-link>
				<router-link tag='div' to='/foreshow/taobao'>全球购</router-link>
				<router-link tag='div' to='/foreshow/seckill'>限量秒杀</router-link>
			</head>
			<router-view></router-view>
		</div>
	</transition>
</template>

<script type="text/javascript">
	export default{

	}
</script>

<style type="text/css">
	*{
		margin: 0;
		padding: 0;
	}
	.foreshow{
		position: absolute;
		top:0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 200;
		background: white;
	}
	.head{
		width: 100%;
		height: 100px;
		display: flex;
		background: white;
		border-bottom: 1px solid gray;
	}
	.head div{
		flex: 1;
		font-size: 2.5em;
		text-align: center;
		line-height: 100px;
	}
	.show-enter{
		opacity: 0;
	}
	.show-enter-active{
		transition: opacity 1s;
	}
</style>