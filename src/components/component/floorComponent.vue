<template>
    <div>
        <!--floor one area-->
        <div class="floor">
            <div class="floor-title"> {{floorTitle}} </div>
            <div class="floor-anomaly">
                <div class="floor-one"><img :src="floorData&&floorData[0]&&floorData[0].image" width="100%" /></div>
                <div>
                    <div class="floor-two"><img :src="floorData&&floorData[1]&&floorData[1].image" width="100%" /></div>
                    <div><img :src="floorData&&floorData[2]&&floorData[2].image" width="100%" /></div>
                </div>
            </div>

            <div class="floor-rule">
                <div v-for="(item ,index) in floorData.slice(3)" :key="index">
                    <img :src="item.image" width="100%" />
                </div>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    props: ['floorData', 'floorTitle'],
    data() {
        return {};
    }
};
</script>
<style scoped>
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
.floor-title {
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
}
</style>