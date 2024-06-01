<template>
  <div class="timeBd">
    <div class="timeBox">
      <div class="timeText title">完場比分</div>
      <div class="timeText" v-for="(date, index) in previousDates" :key="'prev-' + index">{{ date }}</div>
    </div>
    <div class="timeBox mt-3">
      <div class="timeText title">下周賽程</div>
      <div class="timeText" v-for="(date, index) in nextDates" :key="'next-' + index">{{ date }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeComponent',
  data() {
    return {
      previousDates: [],
      nextDates: []
    };
  },
  mounted() {
    const currentDate = new Date();
    this.currentDate = this.formatDate(currentDate);
    
    for (let i = 1; i <= 5; i++) {
      let prevDate = new Date(currentDate);
      prevDate.setDate(currentDate.getDate() - i);
      this.previousDates.unshift(this.formatDate(prevDate));
      
      let nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);
      this.nextDates.push(this.formatDate(nextDate));
    }
  },
  methods: {
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  }
};
</script>
  
  <style lang="scss">
  .timeBd {
    padding: 1rem 0 1rem 1rem;
  
    .timeBox {
      display: flex;
      flex-direction: column;
  
      .timeText {
        text-align: start;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0.5rem;
      }
  
      .timeText.title {
        background: #F2F2F2;
      }
    }
  }
  </style>


<style lang="scss">

.timeBd{
  padding: 1rem 0 1rem 1rem;

  .timeBox{
    display: flex;
    flex-direction:column;

    .timeText{
      text-align: start;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .timeText.title{
      background: #F2F2F2;
    }
  }
}

</style>