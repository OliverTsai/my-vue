<template>
    <header class="headerBd p-3">
		<div class="headerBox1">
			<div class="leftBox">
				<div class="">
					<div class="imgBox">
						<img src="../assets/logo.png" class="h-100">
					</div>
				</div>
			</div>
			<div class="rightBox">
				<div class="btnBox">
					<button type="button" class="btn text-light border" @click="setLocale('zh')">中文</button>
					<button type="button" class="text-light btn border" @click="setLocale('en')">English</button>
				</div>
			</div>
		</div>
	</header>
	<header class="headerBd p-3">
		<div class="headerBox2">
			<router-link to="/" :class="{ active: $route.name === 'home' }">
				<button type="button" class="btn text-light">{{ $t('home') }}</button>
			</router-link>
			<router-link to="/soccer" :class="{ active: $route.name === 'soccer' }">
				<button type="button" class="btn text-light">{{ $t('soccer') }}</button>
			</router-link>
			<router-link to="/basketball" :class="{ active: $route.name === 'basketball' }">
				<button type="button" class="btn text-light">{{ $t('basketball') }}</button>
			</router-link>
		</div>
	</header>
</template>

<script>
    export default {
        methods: {
            setLocale(locale) {
            this.$i18n.locale = locale;
            }
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
	}

	.btnBox{
		color: rgb(0, 0, 0);
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

</style>