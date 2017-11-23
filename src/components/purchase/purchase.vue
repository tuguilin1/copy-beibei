<template>
	<div class='purchase'>
		<div class="head">
			<img :src="ware_info.img">
			<div class="desc">
				<span>
					￥{{returnFloat(ware_info.price)}}
				</span>
				<span>
					￥{{returnFloat(ware_info.price_ori)}}
				</span>
				<span>
					拼团价
				</span>
				<span>
					包邮
				</span>
			</div>
			<div class="name">
				{{ware_info.title}}
			</div>
			<div class="desc1">
				{{ware_info.desc}}
			</div>
		</div>
		<div class="team-buying" v-if='ishow'>
			<div class="team-buying-title">
				有贝妈正在发起团购
			</div>
			<div class="team-buying-content">
				<img :src="team_goods[0].avatar">
				<div class="momname">
					<span>{{team_goods[0].nick}}</span>
					<span>{{team_goods[0].address}}</span>
				</div>
				<div class="remain">
					仅剩{{team_goods[0].member_num_left}}人成团
				</div>
				<div>
					{{team_goods[0].button_tip}}
				</div>
				
			</div>
			<div class='backmoney'>
				开团后邀请好友参团,人数不足自动退款
			</div>
		</div>
		<div class="ensure">
			<div>返30贝壳</div>
			<div>正品保证</div>
			<div>全场包邮</div>
			<div>24h发货</div>
		</div>
		<div class="comment" v-if='comment_ishow'>
			<div class="comment_head" >
				<span>
					贝妈口碑({{comments.count}})
				</span>
				<span>
					好评率{{comments.favourable_comment.rate}}
				</span>
			</div>
			<div class="comment_label">
				<div v-for='item in comments.rate_tags'>
					<span>{{item.name}}({{item.count}})</span>
				</div>
			
			</div>
			<div class='comment_content'>
				<div class="comment_user">
					<img :src="comments.rate_items[0].avatar">
					<span>{{comments.rate_items[0].display_name}}</span>
				</div>
				<div class="comment_body">
					{{comments.rate_items[0].comment}}
				</div>
				<div class="comment_user">
					<img :src="comments.rate_items[1].avatar">
					<span>{{comments.rate_items[1].display_name}}</span>
				</div>
				<div class="comment_body">
					{{comments.rate_items[1].comment}}
				</div>
			</div>
			<div class="allcomment">
				查看全部评价
			</div>
		</div>
		<div v-if='recom_show'>
			<div class='recom_desc'>大家还买了</div>
			<div id="viewpiont">
				<div ref='wrapper' id="wrapper">
					<div id="scroller">
						<div class='first'>
							<figure v-for='index in 3'>
								<img :src="recom_goods[index-1].img">
								<figcaption class='desc3'>{{recom_goods[index-1].title}}</figcaption>
								<figcaption class='recom_price'>￥{{returnFloat(recom_goods[index-1].price)}}</figcaption>
							</figure> 	
						</div>
						<div class='second'>
							<figure v-for='index in 3'>
								<img :src="recom_goods[index+2].img">
								<figcaption class='desc3'>{{recom_goods[index+2].title}}</figcaption>
								<figcaption class='recom_price'>￥{{returnFloat(recom_goods[index+2].price)}}</figcaption>
							</figure> 
						</div>
						<div class='third'>
							<figure v-for='index in 3'>
								<img :src="recom_goods[index+5].img">
								<figcaption class='desc3'>{{recom_goods[index+5].title}}</figcaption>
								<figcaption class='recom_price'>￥{{returnFloat(recom_goods[index+5].price)}}</figcaption>
							</figure> 
						</div>
					</div>
				</div>
			</div>
			<div ref='indicator' id="indicator">
				<div id="dotty"></div>
			</div>
		</div>
		<div class='last'>	
		</div>
		<div class="fix">
			<div>
				<img src="./pic2.png">
				<span>收藏</span>
			</div>
			<div>
				<img src="./pic3.png">
				<span>加购物车</span>
			</div>
			<div>
				<span class='new'>
					{{ware_info.item_price}}
				</span>
				<span>
					单独购买
				</span>
			</div>
			<div>
				<span class='new'>
					￥{{returnFloat(ware_info.price)}}
				</span>
				<span>
					一键拼单
				</span>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
import {mapGetters} from 'vuex'
import {getGoods} from 'api/recommend'
import Scroll from 'iscroll'
import {getrecGoods} from 'api/recommend'
	export default{
		computed:{
			...mapGetters([
				'info'
			])
		},
		data(){
			return{
				ware_info:[],
				team_goods:[],
				ishow:false,
				comments:[],
				comment_ishow:false,
				recom_goods:[],
				recom_show:false
			}
		},
		methods:{
			_getware(){
				this.ware_info=JSON.parse(sessionStorage.getItem('user'))
				const url=`https://dsapi.beibei.com/fightgroup/visitor_recom/${this.ware_info.iid}-1.html`
				const callback = 'BeibeiFightgroupRecommendGet'
				getGoods(url,callback).then((res)=>{
					this.team_goods=res.recom_fightgroups
					this.$nextTick(function(){
						if(res.recom_fightgroups.length!=0)
						{
							this.ishow=true
						}
						
					})
				}).catch((e)=>{
					console.log(e)
				})
				
			},
			_getcomment(){
				const url=`https://sapi.beibei.com/item/rate/0-${this.ware_info.iid}-1-10.html`
				const callback='BeibeiItemRateGet'
				getGoods(url,callback).then((res)=>{
					console.log(res)
					this.comments=res
					this.$nextTick(function(){
						if(res.page_size!=0)
						{
							this.comment_ishow=true
						}
						
					})
				}).catch((e)=>{
					console.log(e)
				})
			},
			returnFloat(num){
			 var value=num/100.0;
			 var xsd=value.toString().split(".");
			 if(xsd.length==1){
			 	value=value.toString()+".00";
			    return value;
			 }
			 if(xsd.length>1){
			 	if(xsd[1].length<2){
				  value=value.toString()+"0";
		    	}
		 	    return value;
			 }
			},
			_getrecGoods(){
				var id=this.ware_info.iid
				var event_id=this.ware_info.event_id
				getrecGoods(id,event_id).then((res)=>{
					console.log(res)
					this.recom_goods=res.recom_items
					this.$nextTick(function(){
						if(res.recom_items.length!=0){
							this.recom_show=true
							this.$nextTick(function(){
									var myscroll=new Scroll(this.$refs.wrapper,{
										scrollX:true,
										scrollY:false,
										snap:'div',
										snapSpeed: 400,
										momentum: false,
										indicators: {
										el: this.$refs.indicator,
										resize: false
									}
								})
							})
							
						}
					})
					
				}).catch((e)=>{
					console.log(e)
				})
			}
		},
		mounted(){
			this._getware()
			this._getcomment()
			this._getrecGoods()
			
		}
	}
</script>

<style type="text/css" scoped>
	*{
		margin: 0;
		padding: 0;
	}
	.purchase{
		position: fixed;
		top:0;
		left: 0;
		right: 0;
		bottom: 0;
		background: white;
		z-index: 200;
		overflow-y: scroll;
		overflow-x:hidden;
	}
	.head{
		width: 100%;
	}
	.head img{
		width: 100%;
		height: 800px;
	}
	.desc span:first-child{
		font-size: 4em;
		color:red;
		margin-left: 3%;
	}
	.desc span:nth-child(2){
		font-size: 2em;
		color:gray;
		margin-left: 2%;
		text-decoration: line-through;
	}
	.desc span:nth-child(3),.desc span:nth-child(4){
		font-size: 2em;
		margin-left: 2%;
		background: red;
		color:white;
		text-align: center;
	}
	.name{
		font-size: 2.5em;
		font-weight: bolder;
		margin-left: 3%;
		margin-top: 20px;
	}
	.desc1{
		font-size: 2em;
		color:gray;
		margin-top: 10px;
		margin-left: 3%;
	}
	.team-buying{
		width: 100%;
		margin-top: 50px;
	}
	.team-buying-title{
		font-size: 3em;
		margin-left: 3%;
	}
	.team-buying-content{
		display: flex;
		height: 100px;
		margin-top: 30px;
	}
	.team-buying-content img{
		margin-left: 3%;
		width: 100px;
		height: 100px;
		border-radius: 50%;
	}
	.momname{
		flex: 1;
		display: flex;
		flex-direction: column;
		margin-left: 3%;
	}
	.momname span{
		flex: 1;
		line-height: 50px;
	}
	.momname span:first-child{
		font-size: 2.5em;
	}
	.momname span:last-child{
		font-size: 2em;
		color:gray;
	}
	.remain{
		margin-left: 3%;
		line-height: 100px;
		font-size: 2.5em;
		margin-right: 3%;
	}
	.team-buying-content div:last-child{
		font-size: 2.5em;
		width: 18%;
		height: 50px;
		margin-top: 25px;
		text-align: center;
		border:1px solid red;
		border-radius: 15px;
		line-height: 50px;
		color:red;
		font-weight: bolder;
	}
	.backmoney{
		margin-top: 40px;
		font-size: 2.5em;
		margin-left: 3%;
	}
	.ensure{
		display: flex;
		width: 100%;
		margin-top: 50px;
		margin-left: 3%;
	}
	.ensure div{
		flex: 1;
		background: url('./billcheck.png') no-repeat left center;
		font-size: 2.5em;
		text-align: center;
	}
	.comment{
		width: 100%;
		margin-top: 50px;
	}
	.comment_head{
		width: 100%;
	}
	.comment_head span:first-child{
		float: left;
		margin-left: 3%;
		font-size: 3em;
	}
	.comment_head span:last-child{
		float: right;
		margin-right: 3%;
		font-size: 3em;
	}
	.comment_label{
		width: 100%;
		clear:both;
	}
	.comment_label div{
		background: #FEBFE7;
		float: left;
		margin-left: 3%;
		font-size: 1.5em;
		margin-top: 30px;
		border-radius: 30%;
		padding:2% 3%;
	}
	.comment_content{
		width: 100%;
		clear:both;
	}
	.comment_user{
		width: 100%;
		height: 100px;
		position: relative;
		margin-top: 30px;
	}
	.comment_user img{
		height: 100%;
		width: 100px;
		left: 3%;
		position: absolute;
		border-radius: 50%;
	}
	.comment_user span{
		line-height: 100px;
		font-size: 2.5em;
		margin-left: 15%;
	}
	.comment_body{
		margin-left: 15%;
		font-size: 1em;
	}
	.allcomment{
		width: 100%;
		text-align: center;
		height: 100px;
		margin-top: 50px;
		font-size: 2.5em
	}
	#viewpoint{
		width: 100%;
		height: 300px;
		overflow:hidden;
		position: relative;
		background: black;
	}
	#wrapper{
		width: 100%;
		height: 400px;
	}
	#scroller{
		width: 300%;
		height: 400px;
		position: absolute;
		display: flex;
	}
	.first,.second,.third{
		flex: 1;
		display: flex;
		height: 400px;
	}
	#indicator {
	position: relative;
	width: 90px;
	height: 20px;
	margin: 10px auto;
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUBAMAAABohZD3AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QUGCDYztyDUJgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAGFBMVEUAAADNzc3Nzc3Nzc3Nzc3Nzc3Nzc3///8aWwwLAAAABnRSTlMAX5Ks3/nRD0HIAAAAAWJLR0QHFmGI6wAAAFtJREFUGFdjYGBgEHYNMWRAAJE0IHCEc5nSwEABxleD8JOgXMY0KBCA8FlgfAcIXwzGT4TwzWD8ZAjfDcZPgfDDYPxU7Hx09ejmoduH7h5096L7B8O);
	}

	#dotty {
		position: absolute;
		width: 20px;
		height: 20px;
		border-radius: 10px;
		background: red;
	}
	figure{
		flex: 1;
		height: 100%;
	}
	figure img{
		width: 100%;
		height: 80%;
	}
	.desc3{
		font-size: 2.3em;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box; 
		-webkit-box-orient: vertical; 
	}
	.recom_price{
		text-align: center;
		font-size: 3em;
		color:red;
	}
	.recom_desc{
		height: 100px;
		line-height: 100px;
		margin-left: 3%;
		font-size: 3em;
	}
	.last{
		width: 100%;
		height: 300px;
		background: white;
	}
	.fix{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: white;
		height: 150px;
		display: flex;
	}
	.fix div{
		height: 150px;
		display: flex;
		flex-direction: column;
	}
	.fix div:first-child,.fix div:nth-child(2){
		width: 20%;
		font-size: 2.5em;
		text-align: center;
		box-sizing: border-box;
		padding-top: 20px;
	}
	.fix img{
		width: 40%;
		height: 50%;
		margin: 0 auto;
	}
	.fix div:nth-child(3),.fix div:last-child{
		width: 30%;
		display: flex;
		flex-direction: column;
		font-size: 2.5em;
		text-align: center;
		color:white;
		line-height: 75px;
	}
	.fix div:nth-child(3){
		background: #E2796F;
	}
	.fix div:nth-child(4){
		background: #DF0934;
	}
</style>