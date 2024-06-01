<template>
    <header class="headerBd p-3">
		<div class="headerBox1">
			<div class="leftBox">
				<div class="">
					<div class="imgBox">
						<img src="../../assets/logo1.png" class="h-100">
					</div>
				</div>
			</div>
			<div class="rightBox">
				<div class="btnBox">
					<svg @click="toggleModal" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16">
						<path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
						<path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"/>
					</svg>
				</div>
			</div>
		</div>
	</header>
	<header class="headerBd p-2">
		<div class="headerBox2 px-2">
			<router-link to="/" :class="{ active: $route.name === 'home' }">
				<div class="routerBox">
					<div class="routerImg">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16">
							<path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
						</svg>
					</div>
					<p>{{ $t('home') }}</p>
					<!-- <button type="button" class="btn text-light">{{ $t('home') }}</button> -->
				</div>
			</router-link>
			<router-link to="/soccer" :class="{ active: $route.name === 'soccer' }">
				<div class="routerBox">
					<div class="routerImg">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-life-preserver" viewBox="0 0 16 16">
							<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m6.43-5.228a7.03 7.03 0 0 1-3.658 3.658l-1.115-2.788a4 4 0 0 0 1.985-1.985zM5.228 14.43a7.03 7.03 0 0 1-3.658-3.658l2.788-1.115a4 4 0 0 0 1.985 1.985zm9.202-9.202-2.788 1.115a4 4 0 0 0-1.985-1.985l1.115-2.788a7.03 7.03 0 0 1 3.658 3.658m-8.087-.87a4 4 0 0 0-1.985 1.985L1.57 5.228A7.03 7.03 0 0 1 5.228 1.57zM8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
						</svg>
					</div>
					<p>{{ $t('soccer') }}</p>
				</div>
			</router-link>
			<router-link to="/basketball" :class="{ active: $route.name === 'basketball' }">
				<div class="routerBox">
						<div class="routerImg">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-dribbble" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M8 0C3.584 0 0 3.584 0 8s3.584 8 8 8c4.408 0 8-3.584 8-8s-3.592-8-8-8m5.284 3.688a6.8 6.8 0 0 1 1.545 4.251c-.226-.043-2.482-.503-4.755-.217-.052-.112-.096-.234-.148-.355-.139-.33-.295-.668-.451-.99 2.516-1.023 3.662-2.498 3.81-2.69zM8 1.18c1.735 0 3.323.65 4.53 1.718-.122.174-1.155 1.553-3.584 2.464-1.12-2.056-2.36-3.74-2.551-4A7 7 0 0 1 8 1.18m-2.907.642A43 43 0 0 1 7.627 5.77c-3.193.85-6.013.833-6.317.833a6.87 6.87 0 0 1 3.783-4.78zM1.163 8.01V7.8c.295.01 3.61.053 7.02-.971.199.381.381.772.555 1.162l-.27.078c-3.522 1.137-5.396 4.243-5.553 4.504a6.82 6.82 0 0 1-1.752-4.564zM8 14.837a6.8 6.8 0 0 1-4.19-1.44c.12-.252 1.509-2.924 5.361-4.269.018-.009.026-.009.044-.017a28.3 28.3 0 0 1 1.457 5.18A6.7 6.7 0 0 1 8 14.837m3.81-1.171c-.07-.417-.435-2.412-1.328-4.868 2.143-.338 4.017.217 4.251.295a6.77 6.77 0 0 1-2.924 4.573z"/>
						</svg>
					</div>
					<p>{{ $t('basketball') }}</p>
				</div>
			</router-link>
		</div>
	</header>
	<!-- 语言切换模态框 -->
    <div v-if="isModalVisible" class="modalBox">
      <div class="modal-content">
        <span class="close " @click="toggleModal">&times;</span>
        <div class="mb-2">{{ $t('select_language') }}</div>
		<div class="modalLine"></div>
        <button class="btn px-0" @click="changeLanguage('en')">English</button>
        <button class="btn px-0" @click="changeLanguage('zh')">中文</button>
		<side/>
      </div>
    </div>
</template>

<script>
	import side from '@/components/sideView.vue'

    export default {
		data() {
			return {
				isModalVisible: false,
			};
		},
		components: {
			side,
		},
        methods: {
            // setLocale(locale) {
            // 	this.$i18n.locale = locale;
            // },
			toggleModal() {
				this.isModalVisible = !this.isModalVisible;
			},
			changeLanguage(lang) {
				this.$i18n.locale = lang;
				this.toggleModal();
			},
        }
    }
</script>

<style lang="scss">

	header{
		height: 60px;
		background: #0f80da;
		background-size: contain;
	}

	.headerBd{
		display: flex;
		justify-content: center;
	}

	.headerBox1{
		width: 1200px;
		display: flex;
		justify-content: space-between;
	}

	.headerBox2{
		width: 1200px;
		display: flex;
		gap:2rem;
	}

	.routerBox{
		color: #FFF;
		display: flex;
		flex-direction:column;
		align-items: center;

		&.routerImg{
			width: 20px;
			height: 20px;
		}

		&>p{
			font-size: 0.8rem;
		}
	}

	.btnBox{
		color: rgb(255, 255, 255);
		height: 28px;
	}

	.language{
		color: #FFF;
	}

	.imgBox{
		height: 30px;
	}

	
	.router-link {
		text-decoration: none;
		padding: 10px 15px;
		border-radius: 5px;
		color: white; /* 默认文字颜色 */
	}

	.router-link.active .btn {
		background-color: #ffffff; /* 活动项背景颜色 */
		color: rgb(0, 0, 0); /* 活动项文字颜色 */
	}

	.btn {
		background: none;
		border: none;
		color: white;
	}

	.btn.text-light {
		color: white;
	}

	.modalBox {
		display: block;
		position: fixed;
		z-index: 1;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgb(255, 255, 255);
	}

	.modal-content {
		display: flex;
		flex-direction:column;
		align-items: flex-start;
		background-color: #fefefe;
		padding: 20px;
		border: 1px solid #888;
		width: 100%;

		.close{
			margin-left: 95%;
		}
	}

	.modalLine{
		width: 100%;
		height: 2px; 
		background-color: #e0e1e2; 
	}

	.close {
	color: #aaa;
	float: right;
	font-size: 28px;
	font-weight: bold;
	}

	.close:hover,
	.close:focus {
	color: black;
	text-decoration: none;
	cursor: pointer;
	}

</style>