<template>
	<div class="contaniner">
		<div class="mian-box">
			<el-scrollbar wrap-class="list" view-class="view-box" :native="false">
				<div class="wraper">
					<swiper class="carousel-inner " :options="swiperOption"  ref="mySwiper">
						<swiper-slide class="item" >
							<div class="banner" data-banner-name="小说连载">
								<a target="_blank" href="https://www.jianshu.com/p/c7d9037eba2f?utm_medium=index-banner&amp;utm_source=desktop"><img
									 src="//upload.jianshu.io/admin_banners/web_images/4529/d8d780d8dd4a32485655815c2cb4e367b61cb15c.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"
									 alt="540" /></a>
							</div>
						</swiper-slide>
						<swiper-slide class="item ">
							<div class="banner" data-banner-name="音频连载">
								<a target="_blank" href="https://www.jianshu.com/p/ea92638c0833?utm_medium=index-banner&amp;utm_source=desktop"><img
									 src="//upload.jianshu.io/admin_banners/web_images/4524/65fb6e8f81ccbbc7dacf5c380e0366a003ba7881.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"
									 alt="540" /></a>
							</div>
						</swiper-slide>
						<swiper-slide class="item ">
							<div class="banner" data-banner-name="简书钻">
								<a target="_blank" href="https://www.jianshu.com/p/0359f7d253a2?utm_medium=index-banner&amp;utm_source=desktop"><img
									 src="//upload.jianshu.io/admin_banners/web_images/4533/fc384bd68d23df5114c41c3ef12ba12dd000e244.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"
									 alt="540" /></a>
							</div>
						</swiper-slide>
						<swiper-slide class="item ">
							<div class="banner" data-banner-name="行距杯征文大赛">
								<a target="_blank" href="https://www.jianshu.com/mobile/campaign/common/hangju?utm_medium=index-banner&amp;utm_source=desktop"><img
									 src="//upload.jianshu.io/admin_banners/web_images/4486/240ebd0212e4fce11577abbe3169c9345637ee58.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"
									 alt="540" /></a>
							</div>
						</swiper-slide>
						<swiper-slide class="item ">
							<div class="banner" data-banner-name="简书周爆">
								<a target="_blank" href="https://www.jianshu.com/p/b5141cda9fd7?utm_medium=index-banner&amp;utm_source=desktop"><img
									 src="//upload.jianshu.io/admin_banners/web_images/4514/a9212731b77ad524cb832c35d314348ec0b66235.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"
									 alt="540" /></a>
							</div>
						</swiper-slide>
						<swiper-slide class="item ">
							<div class="banner" data-banner-name="新书推广 | 当你想要学民乐web">
								<a target="_blank" href="http://product.dangdang.com/25574123.html?unionid=p-107512535m"><img src="//upload.jianshu.io/admin_banners/web_images/4539/814816838070065013af51fac80e6a03e453a660.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"
									 alt="540" /></a>
							</div>
						</swiper-slide>
						<swiper-slide class="item ">
							<div class="banner" data-banner-name="众乐纪填词征集">
								<a target="_blank" href="https://www.jianshu.com/p/910215a8ae5f?utm_medium=index-banner&amp;utm_source=desktop"><img
									 src="//upload.jianshu.io/admin_banners/web_images/4528/cfbfae092b2d7f29a4bc52e906dfd89a5e8ac16d.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"
									 alt="540" /></a>
							</div>
						</swiper-slide>
						<swiper-slide class="item ">
							<div class="banner" data-banner-name="新书推广 | 共情">
								<a target="_blank" href="http://product.dangdang.com/25546724.html"><img src="//upload.jianshu.io/admin_banners/web_images/4537/e4fc8843fabbf17e6f5660eea8ce0661b00b3089.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"
									 alt="540" /></a>
							</div>
						</swiper-slide>
						<div class="swiper-pagination" slot="pagination"></div>
					</swiper>
					<el-button @click="changeType()">{{msg}}</el-button>
				</div>
			</el-scrollbar>

		</div>

		
	</div>

</template>

<script>
	import Vue from 'vue'
	import {swiper,swiperSlide} from 'vue-awesome-swiper'
	export default {
		components:{
			swiper,
			swiperSlide,
			hasLogin:true
		},
		props:{
			msg:{
				type: String,
				require:true
			}
		},
		data() {
			return {
				swiperOption: {
						direction: 'horizontal',
				autoplay: {
					disableOnInteraction: false,
				},
				 navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				loop: true,
				// 如果需要分页器
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
        }
			}
		},
		methods: {
			changeType:function(){
				let token = sessionStorage.getItem('token');
				if(token!=null&&token!=undefined){
					this.hasLogin = false
					this.$emit('change','213')
				}
			}
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper
			}
		},
		mounted: function () {
			console.log(swiper)
		},
		created: function () {

		},
		updated: function () {

		},
		beforeCreate:function(){

			}
		}
</script>

<style scoped>

	body {
		background: #fff;
	}

	.wraper {
		max-width: 800px;
		margin: auto;
		height: 100vh;

	}
	.carousel-inner{
		width: 625px;
		margin-left: 0;
	}
	.list {
		overflow-x: hidden;
		height: calc(100vh - 80px);
	}

	.banner {
		width: 625px;

	}
	.banner a img {
		width: 100%;
		object-fit: cover;
		height: 250px;
	}
</style>