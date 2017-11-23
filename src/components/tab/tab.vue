<template>
	<div ref='wrapper' id='wrapper'>
		<div ref='scroller' id='scroller'>
			<ul>
				<router-link tag='li' to='/recommend'>
					推荐
				</router-link>
				<router-link tag='li' to='/childrengarments'>童装</router-link>
				<router-link tag='li' to='/childrenshoes'>童鞋</router-link>
				<router-link tag='li' to='/babygoods'>婴童用品</router-link>
				<router-link tag='li' to='/suitdress'>女装</router-link>
				<router-link tag='li' to='/shoebag'>鞋包</router-link>
				<router-link tag='li' to='/homegoods'>居家</router-link>
				<router-link tag='li' to='/beauty'>美妆</router-link>
				<router-link tag='li' to='/cate'>美食</router-link>
				<router-link tag='li' to='/foreshow'>下期预告</router-link>
			</ul>
		</div>
	</div>
</template>

<script type="text/javascript">
import Scroll from 'iscroll' 

	export default{
		mounted () {
	      var myScroll = new Scroll(this.$refs.wrapper, {scrollX: true, scrollY: false})
	    },
	}
</script>

<style type="text/css" scoped>
  #wrapper{
    position: absolute;
    z-index: 100;
    top:0;
    left: 0;
    width: 100%;
    overflow: hidden;
    height: 5%;
    background: white;
  }
  #scroller{
    position: absolute;
    width: 170%;
  }
  #scroller ul{
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: row;
  }
  #scroller li{
    flex:1;
    height: 100%;
    list-style: none;
    font-size: 3rem;
  }
  #scroller li:nth-child(4){
  	flex: 2;
  }
  #scroller li:last-child{
  	flex:2;
  }
</style>