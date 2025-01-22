<template>
  <headView />
  
  <!-- 聯賽比分 START -->
  <div class="innerMatchInfo">
    <div class="mliveTitleBox">
      <div v-if="this.$i18n.locale === 'zh_hk'" class="mGameTitleName">{{ posts?.leagueChtShort }}{{ posts?.subLeagueCht }}</div>
      <div v-else-if="this.$i18n.locale === 'zh_cn'" class="mGameTitleName">{{ posts?.leagueChsShort }}{{ posts?.subLeagueChs }}</div>
      <div v-else class="mGameTitleName">{{ posts?.leagueEnShort }}{{ posts?.subLeagueEn }}</div>
      <div class="matchTop">
        <!--<div class="straight-line mt-3"></div>-->
        <div class="liveTitleScore">
          <div class="scoreBox">
            <div class="">
              <div class="titleImgBox">
                <img :src="getImageTeam(posts?.homeId)"><br>
                <a class="">{{ getLeagueName(posts,'home') }}</a>
                <!-- <a class="">{{ posts?.homeCht }}</a> -->
              </div>
            </div>
            <div class="textBox left">{{ posts?.homeScore }}</div>
          </div>
          <div>
            <div class="vs_">-</div>
          </div>
          <div class="scoreBox">
            <div class="textBox right">
              {{ posts?.awayScore }}
            </div>
            
            <div class="">
              <div class="titleImgBox">
                <img :src="getImageTeam(posts?.awayId)"><br>
                <a class="">{{ getLeagueName(posts,'away') }}</a>
              </div>
            </div>
          </div>
        </div>
      <!--<div class="straight-line mt-3"></div>-->
      </div>
    </div>
  </div>
  <!-- 聯賽比分 END -->
  
    <!-- 飛鯨動畫 START -->
    <div style="height: 100%;" class="LiveMTop">
      <div style="margin-top: 0px; width: 100%; height: 280px; background-image: url('../assets/loading01.gif'); background-repeat: no-repeat; background-position: center;
      object-fit: none; background-color: #333333;" >
        <iframe id="testIframe" :src="url" frameborder="0" style="width: 100%; height: 280px;">
          
        </iframe>
      </div>
    </div>
    <!-- 飛鯨動畫 END -->




    <!-- 分頁 CODE START -->
      <div class="w100 contentBox">
      <div itemscope="itemscope" itemtype="http://schema.org/SportsEvent" class="innerMatchInfo">
        <div>
        <div class="van-sticky">
          <div class="van-tabs van-tabs--line">
            <div class="van-tabs__wrap van-tabs__wrap--scrollable van-hairline--top-bottom">
              <div role="tablist" class="van-tabs__nav van-tabs__nav--line" style="border-color:#0F80DA;background:#FFFFFF;">
                <div role="tab" class="van-tab van-tab--active van-tab--complete" style="color: rgb(15, 128, 218);" aria-selected="true">
                  <span class="van-tab__text Navbutton" @click="pag = 0">{{ $t('overview') }}</span>
                </div>
                <div role="tab" class="van-tab van-tab--complete" style="color: rgb(89, 97, 107);">
                  <span class="van-tab__text Navbutton" @click="pag = 1">{{ $t('chat') }}</span>
                </div>
                <div role="tab" class="van-tab van-tab--complete" style="color: rgb(89, 97, 107);">
                  <span class="van-tab__text Navbutton" @click="pag = 2">{{ $t('analysis') }}</span>
                </div>
                <div role="tab" class="van-tab van-tab--complete" style="color: rgb(89, 97, 107);">
                  <span class="van-tab__text Navbutton" @click="pag = 3">{{ $t('line') }}</span>
                </div>
                <div role="tab" class="van-tab van-tab--complete" style="color: rgb(89, 97, 107);">
                  <span class="van-tab__text Navbutton" @click="pag = 4">{{ $t('text_live') }}</span>
                </div>
                <!--<div class="van-tabs__line" style="">
                  <div role="tabpanel" class="van-tab__pane" style=""></div>
                  <div role="tabpanel" class="van-tab__pane" style="display: none;"></div>
                  <div role="tabpanel" class="van-tab__pane" style="display: none;"></div>
                  <div role="tabpanel" class="van-tab__pane" style="display: none;"></div>
                  <div role="tabpanel" class="van-tab__pane" style="display: none;"></div>
                  <div role="tabpanel" class="van-tab__pane" style="display: none;"></div>
                  <div role="tabpanel" class="van-tab__pane" style="display: none;"></div>
                </div>-->
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    <!-- 分頁 CODE End -->


  <!--聊天室-->
  <div v-if="pag == 0 || pag == 1">
    <div data-v-d37f9274="" class="VSOptionTitle"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-dots-fill" viewBox="0 0 16 16">
      <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
    </svg>&nbsp;聊天室</div>
    <!-- 聊天室 標題 Title End -->
      
    <!-- 聊天室 iframe Start -->
    <iframe src="https://befunscore.com/livemessage/message.html" width="100%" height="450px" frameborder="0" scrolling="no">
    </iframe>
  </div>

  <!-- 技術分析資料 -->
  <div v-if="pag == 0 || pag == 2">
    <div v-if="detail_date.length == 0">
      <div id="">
        <div class="VSOptionTitle">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard2-data-fill" viewBox="0 0 16 16">
            <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5"/>
            <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5M10 7a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm4-3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1"/>
          </svg>&nbsp;{{ $t('analysis') }}
        </div>
        <div class="">
          <div class="HomeNameTitle"><img style="width: 1.1rem; height: 1.1rem;" :src="getImageTeam(posts?.homeId)"> <a style="color: 333333; text-decoration:none;" class="">{{ getLeagueName(posts,'home') }}</a></div>
          <div class="AwayNameTitle"><a style="color: 333333; text-decoration:none;" class="">{{ getLeagueName(posts,'away') }}</a> <img style="width: 1.1rem; height: 1.1rem;" :src="getImageTeam(posts?.awayId)"></div>
        </div>
        <div class="" style="clear: both;"></div>
      </div>

      <div class="NoValueFrame">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
          <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
        </svg><br>尚無技術分析資料
      </div>
    </div>
    <div v-else>
      
      <div id="">
        <div class="VSOptionTitle">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard2-data-fill" viewBox="0 0 16 16">
            <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5"/>
            <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5M10 7a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm4-3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1"/>
          </svg>&nbsp;{{ $t('analysis') }}
        </div>
        <div class="">
          <div class="HomeNameTitle"><img style="width: 1.1rem; height: 1.1rem;" :src="getImageTeam(posts?.homeId)"> <a style="color: 333333; text-decoration:none;" class="">{{ getLeagueName(posts,'home') }}</a></div>
          <div class="AwayNameTitle"><a style="color: 333333; text-decoration:none;" class="">{{ getLeagueName(posts,'away') }}</a> <img style="width: 1.1rem; height: 1.1rem;" :src="getImageTeam(posts?.awayId)"></div>
        </div>
        <div class="" style="clear: both;"></div>
      </div>

      <div v-for="(data,index) in detail_date" :key="index">
        <div class="detailBox">
          <div style="width: 20%; text-align: left; text-decoration:none;">
            <!--主隊：--><a style="color: #333333; text-decoration:none;" :class="{ 'highlight_blue': data.homeValue > data.awayValue }">{{ data.homeValue }}</a>
          </div>
          <div style="width: 60%; text-align: center; text-decoration:none;">{{ $t(data.parameter) }}</div>
          <div style="width: 20%; text-align: right; text-decoration:none;">
            <!--客隊：--><a style="color: #333333; text-decoration:none;" :class="{ 'highlight_yellow': data.awayValue > data.homeValue }">{{ data.awayValue }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 文字直播 Start -->
  <div v-if="pag == 0 || pag == 4">
    <div v-if="beforeTXT.length == 0">
      <div id="">
        <div class="VSOptionTitle">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar4-range" viewBox="0 0 16 16">
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
            <path d="M9 7.5a.5.5 0 0 1 .5-.5H15v2H9.5a.5.5 0 0 1-.5-.5zm-2 3v1a.5.5 0 0 1-.5.5H1v-2h5.5a.5.5 0 0 1 .5.5"/>
          </svg>&nbsp;{{ $t('text_live') }}
        </div>
        <div class="">
          <div class="HomeNameTitle"><img style="width: 1.1rem; height: 1.1rem;" :src="getImageTeam(posts?.homeId)"> <a style="color: 333333; text-decoration:none;" class="">{{ getLeagueName(posts,'home') }}</a></div>
          <div class="AwayNameTitle"><a style="color: 333333; text-decoration:none;" class="">{{ getLeagueName(posts,'away') }}</a> <img style="width: 1.1rem; height: 1.1rem;" :src="getImageTeam(posts?.awayId)"></div>
        </div>
        <div class="" style="clear: both;"></div>
      </div>

      <div class="NoValueFrame">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
          <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
        </svg><br>尚無比賽資料
      </div>
    </div>
    <div v-else>
      
      <div id="">
        <div class="VSOptionTitle">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar4-range" viewBox="0 0 16 16">
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
            <path d="M9 7.5a.5.5 0 0 1 .5-.5H15v2H9.5a.5.5 0 0 1-.5-.5zm-2 3v1a.5.5 0 0 1-.5.5H1v-2h5.5a.5.5 0 0 1 .5.5"/>
          </svg>&nbsp;{{ $t('text_live') }}
        </div>
        <div class="">
          <div class="HomeNameTitle"><img style="width: 1.1rem; height: 1.1rem;" :src="getImageTeam(posts?.homeId)"> <a style="color: 333333; text-decoration:none;" class="">{{ getLeagueName(posts,'home') }}</a></div>
          <div class="AwayNameTitle"><a style="color: 333333; text-decoration:none;" class="">{{ getLeagueName(posts,'away') }}</a> <img style="width: 1.1rem; height: 1.1rem;" :src="getImageTeam(posts?.awayId)"></div>
        </div>
        <div class="" style="clear: both;"></div>
      </div>

      <div class="LiveTextFrame">
          <div><a class="LiveTitleTHFT">FT</a><div class="textBox">{{ posts?.homeScore }} - {{ posts?.awayScore }}</div></div>
          <div v-for="data in afterTXT" :key="data.id">
            <div v-if="distinguish(data.teamID) == 2" class="homeFlex">
              <div class="teamBox">
                
                <div class="LiveTimeHome divFloatL2">
                    <div class="routerImg divFloatL1">
                    <!--<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
                      <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
                      <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
                      <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
                    </svg>-->
                    {{ data.happenTime }}<a class="TimeAnimation TimeAnimationColorHome">&nbsp;'</a>&nbsp;
                    </div>
                    {{ data.content }}
                </div>

                <div class="clear"></div>
              </div>
            </div>
            <div v-if="distinguish(data.teamID) == 1" class="awayFlex">
              <div class="teamBox">
                  <div class="LiveTimeAway divFloatR2">{{ data.content }}&nbsp;

                    <div class="routerImg divFloatR1">
                      &nbsp;{{ data.happenTime }}<a class="TimeAnimation TimeAnimationColorAway">&nbsp;'</a>
                      <!--<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
                        <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
                        <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
                        <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
                      </svg>-->
                    </div> 

                  </div>
                  
                  

                  <div class="clear"></div>
              </div>
            </div>
          </div>
          <div><a class="LiveTitleTHFT">HT</a></div>
          <div v-for="data in beforeTXT" :key="data.id">
            <div v-if="distinguish(data.teamID) == 2" class="homeFlex">
              <div class="teamBox">
                
                <div class="LiveTimeHome divFloatL2">{{ data.content }}

                  <div class="routerImg divFloatL1">
                  <!--<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
                  </svg>-->
                  {{ data.happenTime }}<a class="TimeAnimation TimeAnimationColorHome">&nbsp;'</a>&nbsp;
                  </div>

                </div>
                <div class="clear"></div>
              </div>
            </div>
            <div v-if="distinguish(data.teamID) == 1" class="awayFlex">
              <div class="teamBox">
                <div class="LiveTimeAway divFloatR2">
                  <div class="divFloatR1">
                  <div class="routerImg">
                    &nbsp;&nbsp;{{ data.happenTime }}<a class="TimeAnimation TimeAnimationColorAway">&nbsp;'</a>
                  <!--<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
                  </svg>-->
                  </div>
                </div>
                
                &nbsp;{{ data.content }}</div>
                

                <div class="clear"></div>
              </div>
            </div>
            <!-- 比賽開始 start -->
            <div v-if="distinguish(data.teamID) == 3">
              <svg data-v-509583f2="" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16" style="color: #79c32c;">
                <path data-v-509583f2="" d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"></path>
              </svg>
              <br>
              <!--比赛开始-->
              <div class="divCenter">{{ data.content }}</div>
              <!-- 比賽開始 end -->
            </div>
            <!-- 比賽開始 end -->
          </div>
      </div>
    </div>
  </div>
  <!-- 文字直播 End -->



  <!-- 陣容資料 -->
  <div v-if="pag == 0 || pag == 3">
    <div v-if="dataLine.length == 0">
      <div id="">
        <div class="VSOptionTitle">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-vcard-fill" viewBox="0 0 16 16">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96q.04-.245.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0"/>
          </svg>&nbsp;{{ $t('line') }}
        </div>
        <div class="">
          <div class="HomeNameTitle"><img style="width: 1.1rem; height: 1.1rem;" :src="getImageTeam(posts?.homeId)"> <a style="color: 333333; text-decoration:none;" class="">{{ getLeagueName(posts,'home') }}</a></div>
          <div class="AwayNameTitle"><a style="color: 333333; text-decoration:none;" class="">{{ getLeagueName(posts,'away') }}</a> <img style="width: 1.1rem; height: 1.1rem;" :src="getImageTeam(posts?.awayId)"></div>
        </div>
        <div class="" style="clear: both;"></div>
      </div>

      <div class="NoValueFrame">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
          <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
        </svg><br>尚無陣容資料
      </div>
    </div>
    
    <div v-else>

      <div id="">
        <div class="VSOptionTitle">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-vcard-fill" viewBox="0 0 16 16">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96q.04-.245.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0"/>
          </svg>&nbsp;{{ $t('line') }}
        </div>
        <div class="">
          <div class="HomeNameTitle"><img style="width: 1.1rem; height: 1.1rem;" :src="getImageTeam(posts?.homeId)"> <a style="color: 333333; text-decoration:none;" class="">{{ getLeagueName(posts,'home') }}</a></div>
          <div class="AwayNameTitle"><a style="color: 333333; text-decoration:none;" class="">{{ getLeagueName(posts,'away') }}</a> <img style="width: 1.1rem; height: 1.1rem;" :src="getImageTeam(posts?.awayId)"></div>
        </div>
        <div class="" style="clear: both;"></div>
      </div>




      <div class="LineupFrame">
        <div v-for="line in dataLine" :key="line.matchId" class="lineBd">
          <div class="VSLineup1st-Title">首發陣容</div>
          <div class="mlineBox">

            <div class="VSLineup1st-col">
              
              <!-- <div>主隊陣行{{ line.homeArray }}</div> -->
              <!--<div class="VSLineup1st-TitleSub">主隊首發</div>-->
              <div class="">
                <div v-for="home in line.homeLineup" :key="home.positionId" class="VSLineup1st-col">
                  <a class="NumberBgHome">{{ home.number }}</a>&nbsp;
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill ColorHome" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                  </svg>&nbsp;{{ getLeagueName(home,'name') }}
                </div>
              </div>
              <!--<div class="straight-line"></div>-->
            </div>

            <div class="VSLineup1st-col">
              
              <!-- <div class="">客隊陣行{{ line.awayArray }}</div> -->
              <!--<div class="VSLineup1st-TitleSub">客隊首發</div>-->
              <div v-for="away in line.awayLineup" :key="away.positionId" class="VSLineup1st-col">
                <a class="NumberBgAway">{{ away.number }}</a>&nbsp;
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill ColorAway" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                  </svg>&nbsp;{{ getLeagueName(away,'name') }}
              </div>
              <!--<div class="straight-line"></div>-->
            </div>


          </div>
          
        </div>




        <div v-for="line in dataLine" :key="line.matchId" class="lineBd">
          <div class="VSLineup1st-Title">替補陣容</div>
          <div class="mlineBox">

            <div class="VSLineup1st-col">
              
              <!-- <div>主隊陣行{{ line.homeArray }}</div> -->
              <!--<div class="VSLineup1st-TitleSub">主隊替補</div>-->
              <div class="">
                <div v-for="home in line.homeBackup" :key="home.positionId" class="VSLineup1st-col">
                  <a class="NumberBgHome">{{ home.number }}</a>&nbsp;
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill ColorHome" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                  </svg>&nbsp;{{ getLeagueName(home,'name') }}
                </div>
              </div>
              <!--<div class="straight-line"></div>-->
            </div>

            <div class="VSLineup1st-col">
              
              <!-- <div class="">客隊陣行{{ line.awayArray }}</div> -->
              <!--<div class="VSLineup1st-TitleSub">客隊替補</div>-->
              <div v-for="away in line.homeBackup" :key="away.positionId" class="VSLineup1st-col">
                <a class="NumberBgAway">{{ away.number }}</a>&nbsp;
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill ColorAway" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                  </svg>&nbsp;{{ getLeagueName(away,'name') }}
              </div>
              <!--<div class="straight-line"></div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <mFootView/>
</template>

<script>
// @ is an alias to /src
import headView from '@/components/m/mHeadView.vue'
import mFootView from '@/components/m/mFootView.vue'
import { ref, onMounted  } from 'vue'
import md5 from 'js-md5'; // Assuming you use crypto-js for hashing
import { useRoute } from 'vue-router';
import { fetchPosts } from '@/composables/useApi.js';
import { getImageTeam  } from '@/composables/useImage.js';
import { useI18n } from 'vue-i18n';

export default {
  name: 'mLive',
  setup() {
    const accessKey = ref('aJLBMV5nq4henA3cDQvcK4YuIpKIFzmCx0q5');
    const secret = ref('Z4DoZcPnCPb1fFU5D7KnJlq1SJN9Y8UIJ6oW');
    const ts = ref(Math.floor(Date.now())); // Unix timestamp
    const auth = ref('');
    const url = ref('');
    const route = useRoute();

    const matchId = ref(String(route.params.id));
    const specity_date = ref(String(route.params.date));

    let posts = ref({ matchList: [] });

    const beforeTXT = ref([]);
    const afterTXT = ref([]);

    const dataLine = ref([]);

    const detail_date = ref("");

    const { locale } = useI18n(); //翻譯

    const pag = ref(0);

    // 主客ID
    const awayId = ref(0)
    const homeId = ref(0)

    // 動畫畫面
    const updateUrl  = () => {
      auth.value = md5(accessKey.value + ts.value + secret.value).toUpperCase();
      url.value = `https://zhibo.feijing88.com/football/detail.html?matchId=${matchId.value}&accessKey=${accessKey.value}&ts=${ts.value}&auth=${auth.value}&statsPanel=HIDE`;
    }

    // 翻譯
    const getLeagueName = (post, fieldName) => {
      const langMap = {
        en: 'En',
        zh_cn: 'Chs',
        zh_hk: 'Cht'
      };
      const langSuffix = langMap[locale.value] || 'En'; // 默認英文
      const key = `${fieldName}${langSuffix}`;  // 動態生成鍵名，例如 leagueNameEn, homeEn, awayEn
      const fallbackKey = `${fieldName}En`; 

      return post[key] || post[fallbackKey];
    };

    // 抓不同日期資料
    const dateUrl = async() => {
      try {
        const response = await fetchPosts(`https://befenscore.net/api/get-data`);
        const matchIdNum = Number(matchId.value);
        const data = response.matchList.filter(post => post.matchId === matchIdNum);

        if (data.length > 0) {
          posts.value = data[0];
          awayId.value = data[0].awayId;
          homeId.value = data[0].homeId
        }else{
          //非當日資料
          const response = await fetchPosts(`https://befenscore.net/football/get-data`);
          const matchIdNum = Number(matchId.value);
          const data = response.matchList.filter(post => post.matchId === matchIdNum);
          posts.value = data[0];
          awayId.value = data[0].awayId;
          homeId.value = data[0].homeId
        }
        
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    //抓取文字
    const txtData = async() => {
      try {
        const response = await fetchPosts(`https://befenscore.net/api/matchTXT/${matchId.value}`);
        beforeTXT.value = response.list.sort((a, b) => b.id - a.id).filter(data=> Number(data.state) == 1);
        afterTXT.value = response.list.sort((a, b) => b.id - a.id).filter(data=> Number(data.state) == 3);
        console.log(response)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    //抓取陣容
    const line = async() => {
      try {
        const response = await fetchPosts(`https://befenscore.net/api/lines/${specity_date.value}`);
        const matchIdNum = Number(matchId.value);
        dataLine.value = response.filter(data => Number(data.matchId) === matchIdNum);
        console.log(dataLine)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    // 抓取技術分析資料
    const detail = async() => {
      try {
        const response = await fetchPosts(`https://befenscore.net/api/detail`);
        const matchIdNum = Number(matchId.value);
        const data = response.technic.filter(data => Number(data.matchId) === matchIdNum);
        if (data.length > 0) {
          // 將 technicCount 分析並存儲到 detail_date
          const allData = parseTechnicData(data[0]['technicCount']);
          detail_date.value = allData.filter(data => data !== null);
          console.log(detail_date.value);
        } else {
          // 假如今日無
          try{
            const response = await fetchPosts(`https://befenscore.net/api/all_detail/${specity_date.value}`);
            const matchIdNum = Number(matchId.value);
            const data = response.technic.filter(data => Number(data.matchId) === matchIdNum);
            if (data.length > 0) {
            // 將 technicCount 分析並存儲到 detail_date
            const allData = parseTechnicData(data[0]['technicCount']);
            detail_date.value = allData.filter(data => data !== null);
            }else{
              console.warn('找不到匹配的比賽數據');
            }
          }catch(error){
            console.error('日期搜索比賽數據錯誤:', error);
          }
 
        }
      } catch (error) {
        console.error('搜索當日比賽數據錯誤:', error);
      }
    }

    // 參數映射表
    const parameterMap = {
      14: 'possession',       //控球率
      3: 'shoot',             //射門
      34: 'miss_shot',        //射門不中
      4: 'shot_on',           //射正
      6: 'corner_kick',       //角球
      45: 'half_corner_kick', //半場角球
      11: 'yellow_card',      //黃牌
      43: 'attack',           //進攻
      44: 'dangerous_attack', //危險進攻
      37: 'shot_blocked',     //射門被擋
      8: 'free_kick',         //任意球
      41: 'pass_the_ball',    //傳球
      42: 'pass_success_rate',  //傳球成功率
      5: 'foul',               //犯規
      9: 'offside',               //越位
      16: 'save',               //救球
      38: 'tackle',               //鏟球
      39: 'extraordinary',               //過人
      40: 'throw_in',               //界外球
      35: 'center_column',               //中柱
      19: 'successful_steal',               //成功搶斷
      20: 'intercept',               //阻截
      21: 'long_pass',               //長傳
    };

    // 分析字串並更新 detail_date
    const parseTechnicData = (technicString) => {
      const result = technicString.split(';').map(item => {
        const [parameter, homeValueRaw, awayValueRaw] = item.split(',');

        // 檢查參數是否在映射表中
        if (!parameterMap[parameter]) {
          return null; // 不在映射表中的參數返回 null
        }

        // 嘗試將數值轉換為數字，如果轉換失敗則保持原本的字串
        const homeValue = isNaN(Number(homeValueRaw)) ? homeValueRaw : Number(homeValueRaw);
        const awayValue = isNaN(Number(awayValueRaw)) ? awayValueRaw : Number(awayValueRaw);
        return {
          parameter: parameterMap[parameter],
          homeValue,
          awayValue
        };
      });
      return result;
    };


    // 比賽進行時間
    const proTime = (time) =>{
      const newTime = new Date();
      const differentTime = newTime - new Date(time);
      const matchMinutes = Math.floor(differentTime / 60000);
      return matchMinutes;
    }

    //處理陣行
    const parseFormation = (line) =>{
      return line.split('').map(Number);
    }

    // 判斷主客隊
    const distinguish = (teamId) =>{
      const team = Number(teamId)
      if(team == awayId.value){
        return 1
      }
      if(team == homeId.value){
        return 2
      }
      if(team == "0"){
        return 3
      }
    }

    onMounted(() => {
      updateUrl();
      dateUrl();
      txtData();
      line();
      detail();
      setInterval(dateUrl, 60000);
    });

    // watch(ts, () => {
    //   updateUrl();
    // });

    return {
      proTime,
      posts,
      dateUrl,
      getImageTeam,
      afterTXT,
      beforeTXT,
      dataLine,
      parseFormation,
      detail_date,
      awayId,
      homeId,
      distinguish,
      getLeagueName,
      pag,
      url
    }
  },
  components: {
    headView,
    mFootView
  },
}
</script>

<style scoped>
.btnBox.active {
  padding: 5px 15px 5px 15px;
  background-color: #eda100 !important;
  color: #ffffff !important;
  height: 2rem;
  font-size: 0.9rem;
  margin: 0px 5px 0px 5px;
}

.mbodyListBox {
  display: flex;
  justify-content: space-between;
}

.liveTitleBox{
  display: flex;
  flex-direction:column;
  width: 100%; 
  justify-content: space-between;
}



.mlineBox{
  display: flex;
  width: 100%;
  justify-content:space-around;
}

.mColumnW18, .mColumnW62, .mColumnW10 {
  display: flex;
  flex-direction: column;
}

.mrightBox {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}


.mleftBox {
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.leftBox {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.rightBox {
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner {
  width: 100%;
  height: auto;
}

.bannerBox {
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.teamBd{
  display: flex;
  gap:0.5rem;
  padding: .1rem 0;
}

.teamImgBox{
  width: 18px;
  height: 18px;
  margin: -.2rem 0px 0px 0px;
}

.proBox{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}



.detailBox{
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #dddddd;
  height: 2.4rem;
  padding: 5px .8rem;
}

/* 比對資料 */
.highlight_blue {
  color: #ffffff !important;
  background-color: #3a7ed3;
  padding: 2px 5px;
  border-radius: .2rem;
  text-decoration:none;
}

.highlight_yellow {
  color: #333333 !important;
  background-color: #f3b140;
  padding: 2px 5px;
  border-radius: .2rem;
  text-decoration:none;
}

.homeFlex{
  display: flex;
  flex-direction:row;
}

.awayFlex{
  display: flex;
  flex-direction:row-reverse;
}

.teamBox{
  display: flex;
  flex-direction:column;
}


/********** New K design start ***********/

.LiveMTop{
  margin-top: 2rem !important;
}

.straight-line{
    width: 100%;
    height: 2px;
    background-color: #EEEEEE;
}

.innerMatchInfo .matchTop {
    width: 100%;
    padding: .3rem .64rem 0rem .64rem;
    height: 4.92rem;
    /*background: #299442;*/
    box-sizing: border-box;
    position: relative;
}

.innerMatchInfo .matchInfo .teamName {
    font-size: .32rem;
    font-family: Roboto;
    font-weight: 400;
    color: #333333;
    max-width: 2.5rem;
    margin-top: .3rem;
    text-align: center;
}

.titleImgBox{
    width: 8.5rem;
    height: 5rem;
    font-size: 0.8rem;
    line-height: .95rem;
}
.titleImgBox img{
    width: 5rem;
    padding: 6px 7px 0px 7px;
}
.titleImgBox a{
    margin: -5px 0 0 0;
    text-decoration:none;
    color: #333333;
}

.mGameTitleName{
    background: #ddefee;
    padding: .1rem 0;
}
.liveTitleScore{
    /*display: flex;
    justify-content: space-around;
    align-items: center;*/
    color: #555555 !important;
    
}
.scoreBox .textBox {
    /*font-weight: 700;*/
    font-size: 2.2rem !important;
}

.vs_{
    font-size: 2rem;
}





.HomeNameTitle{
  font-size: .85rem;
  color: 333333 !important;
	border-left: 5px solid #3a7ed3;
  padding: .5rem 0 .5rem .5rem;
  /*margin: .5rem 0 .5rem 0;*/
	background-color: #ffffff;
	text-align: left;
	width: 50%;
	float: left;
  background-image: linear-gradient(to bottom, rgb(255 255 255) 0%, rgb(255 255 255) 50%, #f0f0f0 100%);
  line-height: 1rem;
  height: 44px;
  /*display: flex;*/
  align-items: center;
}
	
.AwayNameTitle{
  font-size: .85rem;
  color: 333333 !important;
  border-right: 5px solid #f3b140;
  padding: .5rem .5rem .5rem 0rem;
  /*margin: .5rem 0 .5rem 0;*/
	background-color: #ffffff;
	text-align: right;
	width: 50%;
	float: left;
  background-image: linear-gradient(to bottom, rgb(255 255 255) 0%, rgb(255 255 255) 50%, #f0f0f0 100%);
  line-height: 1rem;
  height: 44px;
  /*display: flex;*/
  align-items: center;
}
	
.LiveTimeHome{
  border-radius: 8px;
  padding: 5px;
  margin: 4px;
}

.LiveTimeAway{
  border-radius: 8px;
  padding: 5px;
  margin: 4px;
}

.LiveTextFrame{
  padding: .2rem .5rem .2rem .5rem;
}
.LiveTitleTHFT{
    color: rgb(121, 195, 44);
    font-size: 1.2rem;
    font-weight: bold;
    text-decoration:none;
    margin: .5rem;
}



.TimeAnimation {
    color: rgb(88, 88, 88);
    text-decoration:none;
    animation-duration: 1s;
    animation-name: blink;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
}
@keyframes TimeAnimation {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

.LineupFrame{
  /*padding: .2rem .5rem .2rem .5rem;*/
}



.divFloatL1{
  color: #3a7ed3;
  text-align: left;
  float:left;
  margin: 0px 5px 0px 0px;
  line-height: .82rem;
  font-size: .82rem;
}
.divFloatL2{
  text-align: left;
  float:left;
  margin: 0px 0px 0px 0px;
  line-height: .82rem;
  font-size: .82rem;
}
.divFloatR1{
  color: #f3b140;
  text-align: right;
  float:right;
  margin: 0px 0px 0px 5px;
  line-height: .82rem;
  font-size: .82rem;
}
.divFloatR2{
  text-align: right;
  float:right;
  margin: 0px 0px 0px 0px;
  line-height: .82rem;
  font-size: .82rem;
}
.divCenter{
  text-align: center;
  margin: 5px 0px 5px 0px;
  line-height: .82rem;
  font-size: .82rem;
}


.TimeAnimationColorHome{
  color: #3a7ed3 !important;
}
.TimeAnimationColorAway{
  color: #f3b140 !important;
}

.ColorHome{
  color: #3a7ed3;
  margin: 0 0 0 16px;
}


.ColorAway{
  color: #f3b140;
  margin: 0 0 0 16px;
}


.ColorHomeSub{
  color: #81aee6;
  margin: 0 0 0 16px;
}


.ColorAwaySub{
  color: #f1d9af;
  margin: 0 0 0 16px;
}


.LineupPlayerFInfo{
	text-align: left;
  padding: .5rem;
  border: 1px solid #dbdbdb;
  font-size: .5rem;
  background-image: linear-gradient(to bottom, rgb(255 255 255) 0%, rgb(255 255 255) 50%, #f0f0f0 100%);
}
.LineupPlayerFInfo a{
  color: #333333;
  text-decoration:none;
  font-size: .9rem;
	text-align: left;
}

.NoValueFrame{
  padding: 50px;
  width: 100%;
  height: 150px;
  text-align: center;
  align-items: center;
  display: inline-block;
  vertical-align: middle;
  /***background-image: linear-gradient(to top, rgb(255 255 255) 0%, rgb(196, 196, 196) 50%, #5e5e5e 100%);***/
}

.NoValueFrame svg{
  color: #999999;
  width: 2rem;
  height: 2rem;
  text-align: center;
  margin-bottom: 5px;
}


.VSOptionTitle{
  color: #ffffff;
  background-color: #003e5d;
  margin: .2rem 0 0 0;
  padding: .3rem;
  font-size: 1rem;
  text-align: left;
  font-weight: bold;
}


.VSLineup1st-Title{
  font-size: small;
  text-align: center;
  color: #333333;
  padding: .2rem;
  background-image: linear-gradient(to bottom, rgb(255 255 255) 0%, rgb(233, 233, 233) 50%, #e6e6e6 100%);
}
.VSLineup1st-TitleSub{
  font-size: small;
  text-align: left;
  color: #333333;
  padding: .2rem;
  background-image: linear-gradient(to bottom, rgb(255 255 255) 0%, rgb(233, 233, 233) 50%, #e6e6e6 100%);
}

.VSLineup1st-col{
  font-size: .74rem;
  padding: .3rem 0rem .3rem 0rem;
  text-align: left;
  color: #333333;
  width: 100%;
  border-bottom: 1px solid #dddddd;
}
/*
.VSLineup1st-col:last-child{
  border-bottom: none;
}
*/


.NumberBgHome{
  color: #ffffff;
  text-decoration:none;
  text-align: center;
  font-size: .8rem;
  width: 1rem;
  height: 1rem;
  background: #3a7ed3;
  border-radius: 50%;
  margin: 0 0 0 5px;
  position: absolute;
}
.NumberBgAway{
  color: #333333;
  text-decoration:none;
  text-align: center;
  font-size: .8rem;
  width: 1rem;
  height: 1rem;
  background: #f3b140;
  border-radius: 50%;
  margin: 0 0 0 5px;
  position: absolute;
}

.LineupPlayerFNumber{
  width: 20px;
}

.clear{
  clear: both;
}
/********** New K design end ***********/


/***********  Nav menu button - Start  ************/	
.w100 {
    width: 100%;
}
.van-tab__text-wrapper, .van-tabs {
    position: relative;
}
.van-tabs--line .van-tabs__wrap {
    height: 1.1rem !important;
    box-shadow: 0 5px 10px -5px #d6d6d6;
}

.van-tabs--line .van-tabs__wrap {
  height: 35px !important;
  line-height: 35px !important;
}
.van-tabs__wrap {
    overflow: hidden;
}
.van-tabs__wrap--scrollable .van-tabs__nav {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
}
.van-tabs__nav--line {
    box-sizing: content-box !important;
}
.van-tabs__nav--line {
    box-sizing: content-box;
    height: 100%;
    padding-bottom: 15px;
}
.van-tabs__nav {
    position: relative;
    display: flex;
    background-color: #fff;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.van-tabs__wrap--scrollable .van-tab {
    padding: 0 .5rem;
}
.van-tabs__wrap--scrollable .van-tab--complete {
    flex: 1 0 auto;
}
.van-tabs__wrap--scrollable .van-tab {
    flex: 0 0 20%; /*Nav menu WIDTH*/
}
.van-tab {
    line-height: .96rem;
    font-family: Roboto-Regular, Roboto;
    font-weight: 500;
    color: #333;
}
.van-tab {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 4px;
    color: #646566;
    cursor: pointer;
}	
.van-tab {
    line-height: .96rem;
    font-family: Roboto-Regular, Roboto;
    font-weight: 500;
    color: #333;
}

.van-tab {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 4px;
    color: #646566;
    cursor: pointer;
}
	
.van-tab__text{
	font-size: .85rem !important;
  padding: 8px 0;
  display: flex;
  height: 35px;
  align-items: center;
}

.van-tabs__line{
	background-color: rgb(15, 128, 218);
	width: 37.5px;
	transform: translateX(37.5px) translateX(-50%);
	height: 2px;
	border-radius: 2px;
	transition-duration: 0.3s;
}


.van-sticky{}

.Navbutton{
  font-size: 1.1rem;
  color: #333333;
  height: 30px;
  padding: 1px 0;
}

.Navbutton:hover{
  color: #009bb6;
  border-bottom: 2px solid #009bb6;
}

.Navbutton:active{
  color: #1476c5;
}

.Navbutton::before{
  content:'';
  position: absolute;
  width: 100%;
  height: 0%;
  background-color: #ff8891;
  left: 0;
  top: 0;
  border-radius: 0 0 50% 50%;
  z-index: -1;
  transition: .5s;
}

.Navbutton:hover:before{
  
}



/***********  Nav menu button - End  ************/	

	


















#footer {
    text-align: center;
    color: #ffffff;
    background: #003e5d;
    padding: 30px 5px 5px 5px;
    height: 80px;
    font-size: 0.8rem;
}

</style>