<template>
    <div>
        <!--search bar layout-->
        <div class="search-bar">
            <van-row gutter="5">
                <van-col span="3"><img :src="locationIcon" width="60%" class="location-icon" /></van-col>
                <van-col span="16">
                    <input type="text" class="search-input" />
                </van-col>
                <van-col span="5">
                    <van-button size="mini">查找</van-button>
                </van-col>

            </van-row>
        </div>
        <!--swipwer area-->
        <div class="swiper-area">
            <van-swipe :autoplay="2000">
                <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
                    <img v-lazy="banner.image" width="100%" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="type-bar">
            <div class="type-item" v-for="(cate,index) in category" :key="index">
                <img v-lazy="cate.image" width="90%" />
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>
        <!--AD banner area-->
        <div>
            <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
        </div>
        <!--Recommend goods area-->
        <div class="recommend-area">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
                <!--swiper-->
                <swiper :options="swiperOption">
                    <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
                        <div class="recommend-item">

                            <img :src="item.image" width="80%" />
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price | moneyFilter}} (￥{{item.mallPrice | moneyFilter}})</div>

                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
        <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
        <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
        <!--Hot Area-->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                            <goods-info :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import url from '@/serviceAPI.config.js';
import { toMoney } from '@/filter/moneyFilter.js';
import floorComponent from '../component/floorComponent';
import goodsInfo from '../component/goodsInfoComponent';
export default {
    data() {
        return {
            locationIcon: require('@/assets/images/icon-address.png'),
            bannerPicArray: [],
            category: [],
            adBanner: '',
            recommendGoods: '',
            swiperOption: {
                slidesPerView: 3
            },
            floor1: [], // 楼层1的数据
            floor2: [], // 楼层2的数据
            floor3: [], // 楼层3的数据
            floorName: [],
            hotGoods: [] // 热卖商品
        };
    },
    components: {
        floorComponent,
        goodsInfo
    },
    filters: {
        moneyFilter(money) {
            return toMoney(money);
        }
    },
    created() {
        axios({ url: url.getShoppingMallInfo, method: 'get' })
            .then(response => {
                if (response.status === 200) {
                    this.category = response.data.data.category;
                    this.adBanner = response.data.data.advertesPicture;
                    this.bannerPicArray = response.data.data.slides; // 轮播图片
                    this.recommendGoods = response.data.data.recommend; // 推荐商品
                    this.floor1 = response.data.data.floor1; // 楼层1数据
                    this.floor2 = response.data.data.floor2; // 楼层2数据
                    this.floor3 = response.data.data.floor3; // 楼层3数据
                    this.floorName = response.data.data.floorName; // 楼层名称
                    this.hotGoods = response.data.data.hotGoods; // 热卖商品
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
};
</script>
<style>
.search-bar {
    height: 2.2rem;
    background-color: #e5017d;
    line-height: 2.2rem;
}

.search-input {
    width: 100%;
    height: 1.3rem;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px solid 1px !important ;
    background-color: #e5017d;
    color: #fff;
}
.location-icon {
    padding-top: 0.3rem;
    padding-left: 0.3rem;
}
.swiper-area {
    width: 20rem;
    clear: both;
    text-align: center;
}
img[lazy='loading'] {
    width: 4rem;
    height: 4rem;
    margin-top: 1rem;
}
.type-bar {
    background-color: #fff;
    margin: 0 0.3rem 0.3rem 0.3rem;
    border-radius: 0.3rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
.type-bar div {
    padding: 0.3rem;
    font-size: 12px;
    text-align: center;
}
.recommend-area {
    background-color: #fff;
    margin-top: 0.3rem;
}
.recommend-title {
    border-bottom: 1px solid #eee;
    font-size: 14px;
    padding: 0.2rem;
    color: #e5017d;
}
.recommend-body {
    border-bottom: 1px solid #eee;
}

.recommend-item {
    width: 99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
}
/* .swiper-slide {
    height: 4rem;
    text-align: center;
    padding-top: 3rem;
    border-bottom: 1px solid #ccc;
}
.swiper {
    height: 7rem;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
} */
.floor-anomaly {
    display: flex;
    flex-direction: row;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
}
.floor-anomaly div {
    width: 10rem;

    box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.floor-one {
    border-right: 1px solid #ddd;
}
.floor-two {
    border-bottom: 1px solid #ddd;
}
.floor-rule {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #fff;
}
.floor-rule div {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 10rem;
    border-bottom: 1px solid #ddd;
}
.floor-rule div:nth-child(odd) {
    border-right: 1px solid #ddd;
}
.hot-area {
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
}
.hot-goods {
    height: 130rem;
    overflow: hidden;
    background-color: #fff;
}
.type-item {
    flex: 1;
}
</style>
