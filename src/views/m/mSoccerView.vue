<template>
  <headView/>
  <div class="bodyBd">
  <div class="bodyBox">
    <!-- 側邊攔在這 -->
    <!-- <div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
    </div> -->
    <!-- 表格內容在這邊 -->
    <div class="w-100">
      <div class="mbodyTitle">
        <div class="bodyTitleBox">
          <button type="button" class="btn">{{$t('SoccerEvents')}}</button>
          <button type="button" class="btn">{{$t('Live')}}</button>
          <button type="button" class="btn">{{$t('Finished')}}</button>
          <button type="button" class="btn">{{$t('Schedule')}}</button>
        </div>
        <div class="bodyTitleBox">
          <div class="bodyTitleTime">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
              <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="mbodyList">
        <div v-for="match in matches" :key="match.matchID">
          <div class="mbodyListTitle">
            <div class="mbodyListTitleLeft">
              <div class="roundedOne">
                <input type="checkbox" value="None" :id="match.matchID" name="check" checked />
                <label :for="match.matchID"></label>
              </div>
              <div class="leftBox">
                {{ match.matchName }}
              </div>
            </div>
            <div class="mbodyListTitleright">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
              </svg>
            </div>
          </div>
          <div class="mbodyListBox">
            <div>
              <div>{{ match.matchTime }}</div>
              <div>{{ match.status }}</div>
            </div>
            <div class="leftBox">
              <div>{{ match.team1.name }}</div>
              <div>{{ match.team2.name }}</div>
            </div>
            <div class="rightBox">
              <div v-if="match.isLive == true">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-square-fill" viewBox="0 0 16 16">
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.5 10a.5.5 0 0 0 .832.374l4.5-4a.5.5 0 0 0 0-.748l-4.5-4A.5.5 0 0 0 5.5 4z"/>
                </svg>
              </div>
            </div>

            <div>
              <div>{{ match.team1.score }}</div>
              <div>{{ match.team2.score }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import headView from '@/components/m/mHeadView.vue'
import matches from '@/matches.json'

export default {
name: 'HomeView',
data(){
  return{
    isCheck: false,
    matches
  }
},
components: {
  headView
}
}
</script>

<style lang="scss">

.bodyBd{
display: flex;
justify-content: center;
}

.bodyBox{
width: 1200px;
display: flex;
justify-content: space-between;
}

.mbodyTitle{
display: flex;
justify-content: space-between;
}

.bodyTitleBox{
display: flex;
align-items: center;

.bodyTitleTime{
  padding-left: 1rem;
  box-shadow: -5px 0 6px -5px rgba(0, 0, 0, .2);
}

.bodyTitleTime :active{
  color: aqua;
}

}

.bodyListTitle{
text-align: start;
}

.mbodyList{
display: flex;
flex-direction:column;

.mbodyListTitle{
  display: flex;
  justify-content: space-between;
  background: #f1f1f1;
  padding: 0 2rem 0 1.5rem;

  .mbodyListTitleLeft{
    display: flex;
    gap:1rem;

    .leftBox{
      display: flex;
      align-items: center;
    }
  }

  .mbodyListTitleright{
    display: flex;
    align-items: center;
  }
}
}

.roundedOne {
width: 28px;
height: 28px;
position: relative;
margin: 3px auto;
background: #fcfff4;
background: linear-gradient(to top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
border-radius: 50px;
box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);
}

.roundedOne label {
width: 20px;
height: 20px;
cursor: pointer;
position: absolute;
left: 4px;
top: 4px;
background: #ff0; /* 这里直接使用颜色值 */
border-radius: 50px;
box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);
}

.roundedOne label::after {
content: '';
width: 16px;
height: 16px;
position: absolute;
top: 2px;
left: 2px;
background: linear-gradient(to top, #222 0%, #45484d 100%);
opacity: 0;
border-radius: 50px;
box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,1);
}

.roundedOne label:hover::after {
opacity: 0.3;
}

.roundedOne input[type=checkbox] {
visibility: hidden;
}

.roundedOne input[type=checkbox]:checked + label::after {
opacity: 1;
}


.mbodyListBox{
display: grid;
grid-template-columns: repeat(4, 1fr); /* 创建4个等宽的列 */
grid-gap: 10px; /* 设置列之间的间距 */

.leftBox{
  display: flex;
  flex-direction:column;
  align-items: start;
}

.rightBox{
  display: flex;
  flex-direction:column;
  align-items: end;
  color: red;
}

.lineBox{
  box-shadow: -5px 0 6px -5px rgba(0, 0, 0, .2);
}
}

</style>