<template>
	<div class='taobao'>
		<div class='brands' v-for='item in goods'>
			<div><img :src="item.main_img"></div>
			<div class='desp'>
				<span>{{item.promotion}}</span>
				<span>{{item.title}}</span>
				<span>上新{{item.item_count}}款</span>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import {getGoods} from 'api/recommend'
	export default{
		data(){
			return{
				goods:[],
				index:2
			}
		},
		methods:{
			_getSales(){
				const url="https://sapi.beibei.com/oversea/brand/tomorrow/1-30.html"
				const callback = "BeibeiOverseaBrandTomorrowGet"
				getGoods(url,callback).then((res)=>{
					this.goods=res.oversea_brands
				})
			},
			load(){
				const url = `https://sapi.beibei.com/oversea/brand/tomorrow/${this.index}-30.html`
				getGoods(url,'BeibeiMartshowTomorrowGet').then((res)=>{
					if(res.oversea_brands!=undefined){
						this.goods=this.goods.concat(res.oversea_brands)
						this.index = this.index+1
					}
				}).catch((e)=>{
					console.log(e)
				})
				
			},
			new(){
				const scrollY = document.body.scrollTop
				const totalheight = document.body.scrollHeight
				const height = document.documentElement.clientHeight
				if(scrollY+height > totalheight-500){
					this.load()
				}
			}
		},
		mounted(){
			this._getSales(),
			window.addEventListener('scroll',this.new)
		}
	}
</script>

<style type="text/css">
	*{
		margin: 0;
		padding: 0;
	}
	.brands{
		width: 100%;
		height: 480px;
		display: flex;
		flex-direction: column;
		margin-top: 50px;
		background: white;
	}
	.brands img{
		width: 90%;
		height: 400px;
		margin-left: 5%;
	}
	.brands div:first-child{
		flex: 1;
	}
	.desp span:last-child{
		float: right;
		margin-right: 5%;
	}
	.desp span{
		line-height:80px;
		font-size:2.5em;
		margin-left: 5%;
	}
	.desp span:first-child{
		color:red;
	}
	.desp span:last-child{
		color:#0CD5BB;
	}
</style>