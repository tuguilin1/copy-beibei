<template>
	<div class='newgoods'>
		<div class='news'>今日特卖|每天早上9点准时更新</div>
		<div  v-for="item in goods" >
			<div class='recommend_goods' @click='select(item.event_id)'>
				<div class="head">
					<span>
						<img :src="item.brand_logo">
					</span>
					<span>
						{{item.brand_name}}
					</span>
					<span>{{item.title}}</span>
					<span>></span>
				</div>
				<div class="case">
					<figure>
						<img :src="item.items[0].img">
						<figcaption>{{item.items[0].title}}</figcaption>
					</figure>
					<figure>
						<img :src="item.items[1].img">
						<figcaption>{{item.items[1].title}}</figcaption>
					</figure>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		props:{
			goods:{
				type:Array,
				default:[]
			}
		},
		methods:{
			select(id){
				this.$emit('select',id)
			}
		}
	}
</script>

<style type="text/css" scoped>
	*{
		margin: 0;
		padding: 0;
	}
	.newgoods{
		width: 100%;
	}
	.news{
		width: 100%;
		height: 150px;
		text-align: center;
		line-height: 150px;
		font-size: 3em;
		background: white;
	}
	.head{
		width: 100%;
		height: 100px;
		position: relative;
		background: white;
	}
	.head img{
		width: 10%;
		height: 100%;
		position: absolute;
	}
	.head span:first-child{
		margin-left: 2%;
	}
	.head span:nth-child(2){
		font-size: 2.5em;
		line-height:100px;
		margin-left: 14%;
	}
	.head span:nth-child(3){
		font-size: 2em;
		line-height: 100px;
		margin-left: 2%;
		color:gray;
	}
	.head span:last-child{
		right: 1%;
		position: absolute;
		font-size: 3em;
		line-height: 100px;
		color:gray;
		font-weight: bolder;
	}
	.case{
		width: 100%;
		height: 300px;

	}
	.case figure{
		float: left;
		background: white;
		margin-top:20px;
		width: 49.5%;
	}
	.case figure:first-child{
		border-right:1px solid gray;
	}
	.case img{
		width: 90%;
		height: 100%;
		margin-left: 5%;
	}
	.case figcaption{
		margin-left: 5%;
		margin-right: 10%;
		overflow: hidden;
		font-size: 2em;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.recommend_goods{
		height: 600px;
		width: 100%;
		background: white;
		margin-top: 20px;
	}
	.load{
		width: 30%;
		height: 300px;
	}
</style>