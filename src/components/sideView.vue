<template>
    <div class="sisdeBd">
        <div class="sideBox">
            <div class="sideText">熱門賽事</div>
        </div>
        <div class="sideLine"></div>
        <div class="sideBox">
            <div class="sideImg">
                <img src="../assets/event.png" class="h-100">
            </div>
            <div class="sideText">歐洲聯賽冠軍盃賽</div>
        </div>
        <div class="sideBox">
            <div class="sideImg">
                <img src="../assets/event.png" class="h-100">
            </div>
            <div class="sideText">歐霸杯</div>
        </div>
        <div class="sideBox">
            <div class="sideImg">
                <img src="../assets/event.png" class="h-100">
            </div>
            <div class="sideText">歐足聯歐洲協會聯賽</div>
        </div>
        <div class="sideBox">
            <div class="sideImg">
                <img src="../assets/event.png" class="h-100">
            </div>
            <div class="sideText">英格蘭超級聯賽</div>
        </div>
        <div class="sideBox">
            <div class="sideImg">
                <img src="../assets/event.png" class="h-100">
            </div>
            <div class="sideText">西班牙足球甲级聯賽</div>
        </div>
        <div class="sideBox">
            <div class="sideImg">
                <img src="../assets/event.png" class="h-100">
            </div>
            <div class="sideText">德國甲级聯賽</div>
        </div>
        <div class="sideBox">
            <div class="sideImg">
                <img src="../assets/event.png" class="h-100">
            </div>
            <div class="sideText">意大利甲级聯賽</div>
        </div>
        <div class="sideBox">
            <div class="sideImg">
                <img src="../assets/event.png" class="h-100">
            </div>
            <div class="sideText">法國甲組足球聯賽</div>
        </div>
        <div class="sideBox">
            <div class="sideImg">
                <img src="../assets/event.png" class="h-100">
            </div>
            <div class="sideText">南美自由盃</div>
        </div>
        <div class="sideBox">
            <div class="sideImg">
                <img src="../assets/event.png" class="h-100">
            </div>
            <div class="sideText">南美洲球会盃</div>
        </div>
        <div class="sideBox head">
            <div class="sideText">國家賽事</div>
        </div>
        <div class="sideLine"></div>
        <!-- 國家迴圈 -->
        <div v-for="(item, index) in items" :key="index" class="sideBox">
            <div class="sideImg">
                <img src="../assets/taiwan.png" class="w-100">
            </div>
            <div class="sideText">{{ item }}</div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        '英格蘭','意大利','德國','西班牙','法國', '國際', '歐洲', '美洲', '南美洲', '北美洲', '亞洲', '非洲', '大洋洲', '沙灘', '也門', '千里達及多巴哥', '土耳其', 
        '土庫曼斯坦', '不丹', '中國', '丹麥', '厄瓜多爾', '巴巴多斯', '巴西', '巴拉圭', '巴林', '巴拿馬', '巴勒斯坦', 
        '巴基斯坦', '日本', '比利時', '毛里塔尼亞', '牙買加', '以色列', '加拿大', '加納', '加蓬', '北馬其頓', '北愛爾蘭', 
        '卡塔爾', '古巴', '尼日利亞', '尼日爾', '尼加拉瓜', '尼泊爾', '布基納法索', '布隆迪', '瓦努阿圖', '白俄羅斯', 
        '立陶宛', '伊拉克', '伊朗', '冰島', '匈牙利', '印度', '印度尼西亞', '危地馬拉', '吉布提', '吉爾吉斯', '圭亞那', 
        '多米尼加', '多哥', '安哥拉', '安提瓜和巴布達', '安道爾', '老撾',  '伯利茲', '克羅地亞', '利比利亞', 
        '利比亞', '希臘', '汶萊', '沙地阿拉伯', '貝寧', '坦桑尼亞', '委內瑞拉', '孟加拉', '岡比亞', '拉脫維亞', 
        '法羅群島', '波多黎各', '波黑', '波蘭', '直布羅陀', '肯雅', '芬蘭', '阿美尼亞', '阿根廷', '阿曼', '阿塞拜疆', 
        '阿爾及利亞', '阿爾巴尼亞', '阿魯巴', '阿聯酋', '俄羅斯', '保加利亞', '南非', '哈薩克', '威爾斯', '柬埔寨', 
        '津巴布韋', '洪都拉斯', '玻利維亞', '科威特', '科特迪瓦', '科索沃', '科摩羅', '突尼西亞', '約旦', '美國', 
         '剛果', '剛果民主共和國', '哥倫比亞', '哥斯達黎加', '埃及', '埃塞俄比亞', '庫拉索', '挪威', '格林納達', 
        '格魯吉亞', '泰國', '海地', '烏干達', '烏克蘭', '烏拉圭', '烏茲別克', '秘魯', '納米比亞', '紐西蘭', '索羅門群島', 
        '馬里', '馬來西亞', '馬拉維', '馬達加斯加', '馬爾他', '馬爾代夫', '捷克', '敘利亞', '荷蘭', '莫桑比克', 
        '莱索托', '博茨瓦納', '喀麥隆', '奥地利', '斐濟', '斯里蘭卡', '斯洛文尼亞', '斯洛伐克', '智利', '菲律賓', '越南', 
        '黑山', '塔吉克', '塞內加爾', '塞舌爾', '塞拉里昂', '塞浦路斯', '塞爾維亞',  '愛沙尼亞', '愛爾蘭', 
        '新加坡', '瑞士', '瑞典', '聖馬力諾', '聖基茨和尼維斯', '葡萄牙', '蒙古',  '摩洛哥', '摩爾多瓦', '緬甸', 
        '黎巴嫩', '墨西哥', '澳洲', '盧旺達', '盧森堡', '韓國', '薩爾瓦多', '薩摩亞', '羅馬尼亞', '贊比亞', '蘇丹', 
        '蘇格蘭', '其他']
    };
  }
}
</script>

<style lang="scss">
.sisdeBd{
    display: flex;
    flex-direction:column;
    gap:0.3rem;
    padding: 1rem 1rem 1rem 0;
}
.sideBox{
    display: flex;
    gap:0.3rem;
    align-items: center;
}
.sideBox.head{
    margin-top: 2rem;
}
.sideLine{
    width: 100%;
    height: 2px; 
    background-color: #e0e1e2; 
}
.sideImg{
    display: flex;
    align-items: center;
    width: 20px;
    height: 20px;
}
.sideText{
    white-space: nowrap;
}
</style>