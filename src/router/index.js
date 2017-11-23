import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Childrengarments from 'components/children_garments/childrengarments'
import Babygoods from 'components/babygoods/babygoods'
import Beauty from 'components/beauty/beauty'
import Cate from 'components/cate/cate'
import Childrenshoes from 'components/childrenshoes/childrenshoes'
import Homegoods from 'components/homegoods/homegoods'
import Shoebag from 'components/shoebag/shoebag'
import Suitdress from 'components/suitdress/suitdress'
import Foreshow from 'components/foreshow/foreshow'
import Brand from 'components/brand/brand'
import Taobao from 'components/taobao/taobao'
import Seckill from 'components/seckill/seckill'
import Monopoly from 'components/monopoly/monopoly'
import Groom from 'components/groom/groom'
import Newgoods from 'components/newgoods/newgoods'
import Sales from 'components/sales/sales'
import Price from 'components/price/price'
import Purchase from 'components/purchase/purchase'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/recommend',
      component:Recommend
    },
    {
    	path:'/childrengarments',
    	component:Childrengarments
    },
    {
      path:'/beauty',
      component:Beauty
    },
    {
      path:'/cate',
      component:Cate
    },
    {
      path:'/childrenshoes',
      component:Childrenshoes
    },
    {
      path:'/homegoods',
      component:Homegoods
    },
    {
      path:'/shoebag',
      component:Shoebag
    },
    {
    	path:'/suitdress',
    	component:Suitdress
    },
    {
      path:'/babygoods',
      component:Babygoods
    },
    {
      path:'/foreshow',
      component:Foreshow,
      children:[
        {
          path:'/foreshow/brand',
          component:Brand
        },
        {
          path:'/foreshow/taobao',
          component:Taobao
        },
        {
          path:'/foreshow/seckill',
          component:Seckill
        }
      ]
    },
    {
      path:'/goods/:id',
      component:Monopoly,
      children:[
        {
          path:'/goods/:id/recommend',
          component:Groom
        },
        {
          path:'/goods/:id/newgoods',
          component:Newgoods
        },
        {
          path:'/goods/:id/sales',
          component:Sales
        },
        {
          path:'/goods/:id/price',
          component:Price
        }
      ]
    },
    {
      path:'/purchase/:id',
      component:Purchase
    }
  ]
})
