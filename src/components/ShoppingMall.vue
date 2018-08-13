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
                    <img v-lazy="banner.imageUrl" width="100%" />
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            locationIcon: require('@/assets/images/icon-address.png'),
            bannerPicArray: [
                { imageUrl: 'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic001.jpg' },
                { imageUrl: 'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic002.jpg' },
                { imageUrl: 'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic003.jpg' }
            ]
        };
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
</style>
