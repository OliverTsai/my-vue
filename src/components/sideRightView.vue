<template>
  <div class="timeBd">
    <div class="timeBox">
      <!--<div class="timeText title">完場比分</div>-->
      <!-- Title UI ver1-->
      <!-- <div class="sideBox"><div class="sideText">{{ $t('Completed') }}</div></div> -->
       
      <!-- Title UI ver2-->
      <div class="timeBox">
            <div class="timeText">{{ $t('Completed') }}</div>
        </div>
      <div class="sideLine"></div>
      <!-- 迴圈顯示資料 UI ver1-->
      <div class="sideBox body" v-for="(date, index) in previousDates" :key="'prev-' + index" @click="handleDateChange(date)">
            <div class="sideText"> {{ date }}</div>
      </div>
      <!-- 迴圈顯示資料 UI ver2-->
      <!-- <div class="timeText" v-for="(date, index) in previousDates" :key="'prev-' + index">{{ date }}</div> -->
    </div>
    <div class="timeBox mt-3">
      <!--<div class="timeText title">下周賽程</div>-->
      <div class="sideBox head"><div class="sideText">{{ $t('Next') }}</div></div>
      <div class="sideLine"></div>
      <!-- 迴圈顯示資料 UI ver1-->
      <div class="sideBox body" v-for="(date, index) in nextDates" :key="'next-' + index" @click="handleDateChange(date)">
            <div class="sideText"> {{ date }}</div>
      </div>
      <!-- 迴圈顯示資料 UI ver2-->
      <!-- <div class="timeText" v-for="(date, index) in nextDates" :key="'next-' + index">{{ date }}</div> -->
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted, defineEmits } from 'vue'

const previousDates = ref([]);
const nextDates = ref([]);
const currentDate = ref(new Date());

const emit = defineEmits(['child-click'])

// 時間轉字串
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 確定要抓取的時間範圍
const dataTime = () =>{

  for (let i = 1; i <= 5; i++) {
    let prevDate = new Date(currentDate.value);
    prevDate.setDate(currentDate.value.getDate() - i);
    previousDates.value.unshift(formatDate(prevDate));
    
    let nextDate = new Date(currentDate.value);
    nextDate.setDate(currentDate.value.getDate() + i);
    nextDates.value.push(formatDate(nextDate));
  }

}

// 根據日期連接資料
const handleDateChange = (dateString) => {
  emit('child-click', dateString);
};

onMounted(() => {
  dataTime();
});


</script>
  

<style lang="scss">

.timeBd{
  padding: 0rem 0 1rem 1rem;
  width: 15%;

  .timeBox{
    display: flex;
    flex-direction:column;

    .timeText{
      text-align: start;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 0.9rem; /*K*/
    }

    .timeText.title{
      background: #F2F2F2;
    }
  }
}

</style>