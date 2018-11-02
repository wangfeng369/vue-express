<template>
	<div class="contaniner">
		<div class="mian-box">
			<el-scrollbar wrap-class="list" view-class="view-box" :native="false">
				<div class="wraper">
					<div class="left-warp">
						<swiper class="carousel-inner " :options="swiperOption" ref="mySwiper">
							<swiper-slide class="item">
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
						<div id="listContainer">
							<ul class="note-list" infinite-scroll-url="/">
								<li id="note-33195705" data-note-id="33195705" class="have-img" v-for="(item,index) in items" :key="item.id">
									<a class="wrap-img" href="/p/9aa79f0cffc7" target="_blank">
										<img class="  img-blur-done" src="//upload-images.jianshu.io/upload_images/12631447-634db5602cdcc946.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240"
										 alt="120">
									</a>
									<div class="content">
										<a class="title" target="_blank" href="/p/9aa79f0cffc7">{{item.title}}</a>
										<p class="abstract">
											{{item.content}}
										</p>
										<div class="meta">
											<a class="nickname" target="_blank" href="/u/b15b81aa0573">{{item.author}}</a>
											<a target="_blank" href="/p/9aa79f0cffc7#comments">
												<i class="iconfont icon-message"></i> {{item.comment}}
											</a> <span><i :class="['iconfont','icon-heart','animated',item.isLike ==0 ? 'icon-heart-on heartZoom':'']"
												 :data-index=item.isLike @click="like(index,item.isLike)"></i> {{item.like}}</span>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="right-wraper">
						<div class="col-xs-7 col-xs-offset-1 aside">
							<div class="board">
								<a target="_blank" href="/trending/weekly?utm_medium=index-banner-s&amp;utm_source=desktop"><img src="//cdn2.jianshu.io/assets/web/banner-s-3-7123fd94750759acf7eca05b871e9d17.png"
									 alt="Banner s 3"></a>
								<a target="_blank" href="/trending/monthly?utm_medium=index-banner-s&amp;utm_source=desktop"><img src="//cdn2.jianshu.io/assets/web/banner-s-4-b70da70d679593510ac93a172dfbaeaa.png"
									 alt="Banner s 4"></a>
								<a utm_medium="index-banner-s" target="_blank" href="/mobile/books?category_id=284"><img src="//cdn2.jianshu.io/assets/web/banner-s-7-1a0222c91694a1f38e610be4bf9669be.png"
									 alt="Banner s 7"></a>
								<a utm_medium="index-banner-s" target="_blank" href="/publications"><img src="//cdn2.jianshu.io/assets/web/banner-s-5-4ba25cf5041931a0ed2062828b4064cb.png"
									 alt="Banner s 5"></a>
								<a target="_blank" href="/c/e048f1a72e3d?utm_medium=index-banner-s&amp;utm_source=desktop"><img src="//cdn2.jianshu.io/assets/web/banner-s-6-c4d6335bfd688f2ca1115b42b04c28a7.png"
									 alt="Banner s 6"></a>
							</div>

							<!-- 首页右侧 App 下载提示 -->
							<a id="index-aside-download-qrbox" class="col-xs-8 download" data-toggle="popover" data-placement="top"
							 data-html="true" data-trigger="hover" data-content="<img src=&quot;//cdn2.jianshu.io/assets/web/download-index-side-qrcode-cb13fc9106a478795f8d10f9f632fccf.png&quot; alt=&quot;Download index side qrcode&quot; />"
							 href="/apps?utm_medium=desktop&amp;utm_source=index-aside-click" data-original-title="" title="">
								<img class="qrcode" src="//cdn2.jianshu.io/assets/web/download-index-side-qrcode-cb13fc9106a478795f8d10f9f632fccf.png"
								 alt="Download index side qrcode">
								<div class="info">
									<div class="title">下载W-blogApp<i class="iconfont ic-link"></i></div>
									<div class="description">随时随地发现和创作内容</div>
								</div>
							</a>
							<!-- 推荐作者 -->
							<div class="recommended-authors">
								<div class="title"><span>推荐作者</span> <a class="page-change"><i class="iconfont ic-search-change" style="transform: rotate(360deg);"></i>
										换一批
									</a></div>
								<ul class="list">
									<li><a href="/u/c5580cc1c3f4?utm_source=desktop&amp;utm_medium=index-users" target="_blank" class="avatar"><img
											 src="//upload.jianshu.io/users/upload_avatars/3627484/eb973bb9-37ba-4d07-acec-850c0a66d1bb.png?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp"></a>
										<a class="follow" state="0"><i class="iconfont ic-follow"></i>关注
										</a> <a href="/u/c5580cc1c3f4?utm_source=desktop&amp;utm_medium=index-users" target="_blank" class="name">
											简书大学堂
										</a>
										<p>
											写了1380k字 · 24.3k喜欢
										</p>
									</li>
									<li><a href="/u/b91cc2d507d0?utm_source=desktop&amp;utm_medium=index-users" target="_blank" class="avatar"><img
											 src="//upload.jianshu.io/users/upload_avatars/8972166/065e6770-aacc-4365-9abf-c46a59cdf7f6.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp"></a>
										<a class="follow" state="0"><i class="iconfont ic-follow"></i>关注
										</a> <a href="/u/b91cc2d507d0?utm_source=desktop&amp;utm_medium=index-users" target="_blank" class="name">
											冰千里
										</a>
										<p>
											写了432.6k字 · 6.8k喜欢
										</p>
									</li>
									<li><a href="/u/631131ed01af?utm_source=desktop&amp;utm_medium=index-users" target="_blank" class="avatar"><img
											 src="//upload.jianshu.io/users/upload_avatars/2564926/88bfdbeeb083.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp"></a>
										<a class="follow" state="0"><i class="iconfont ic-follow"></i>关注
										</a> <a href="/u/631131ed01af?utm_source=desktop&amp;utm_medium=index-users" target="_blank" class="name">
											王老师八卦美术史
										</a>
										<p>
											写了137.6k字 · 892喜欢
										</p>
									</li>
									<li><a href="/u/080bb4eac1c9?utm_source=desktop&amp;utm_medium=index-users" target="_blank" class="avatar"><img
											 src="//upload.jianshu.io/users/upload_avatars/13213889/7314c5cc-ca7f-4542-b914-2c8dffaf324d.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp"></a>
										<a class="follow" state="0"><i class="iconfont ic-follow"></i>关注
										</a> <a href="/u/080bb4eac1c9?utm_source=desktop&amp;utm_medium=index-users" target="_blank" class="name">
											无限猴子
										</a>
										<p>
											写了98.1k字 · 313喜欢
										</p>
									</li>
									<li><a href="/u/62eb2baf2c62?utm_source=desktop&amp;utm_medium=index-users" target="_blank" class="avatar"><img
											 src="//upload.jianshu.io/users/upload_avatars/10849033/a3e12f47-c81c-4659-9c80-117f8b337408.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp"></a>
										<a class="follow" state="0"><i class="iconfont ic-follow"></i>关注
										</a> <a href="/u/62eb2baf2c62?utm_source=desktop&amp;utm_medium=index-users" target="_blank" class="name">
											lostdays
										</a>
										<p>
											写了164.1k字 · 1.2k喜欢
										</p>
									</li>
								</ul> <a href="/recommendations/users?utm_source=desktop&amp;utm_medium=index-users" target="_blank" class="find-more">
									查看全部<i class="iconfont ic-link"></i></a>
							</div>
						</div>
					</div>
				</div>
			</el-scrollbar>

		</div>


	</div>

</template>

<script>
	import Vue from 'vue'
	import {
		swiper,
		swiperSlide
	} from 'vue-awesome-swiper'
	export default {
		components: {
			swiper,
			swiperSlide,
			hasLogin: true,
		},
		props: {
			msg: {
				type: String,
				require: true
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
				},
				items: [{
						id: '1',
						title: '独占一块大陆的澳大利亚，为何不能成为中美一样的大国？',
						content: '纵观世界，没有哪个国家像澳大利亚一样，几乎独占整块大陆。不仅如此，澳大利亚四面环海，周边都是一些弱小的岛国，没有一个国家能够威胁到他，地缘环境相...',
						author: '庐州冢虎',
						comment: '5',
						like: '999',
						isLike: 0
					},
					{
						id: '2',
						title: '独占一块大陆的澳大利亚，为何不能成为中美一样的大国？',
						content: '纵观世界，没有哪个国家像澳大利亚一样，几乎独占整块大陆。不仅如此，澳大利亚四面环海，周边都是一些弱小的岛国，没有一个国家能够威胁到他，地缘环境相...',
						author: '庐州冢虎',
						comment: '5',
						like: '999',
						isLike: 1
					},
					{
						id: '3',
						title: '独占一块大陆的澳大利亚，为何不能成为中美一样的大国？',
						content: '纵观世界，没有哪个国家像澳大利亚一样，几乎独占整块大陆。不仅如此，澳大利亚四面环海，周边都是一些弱小的岛国，没有一个国家能够威胁到他，地缘环境相...',
						author: '庐州冢虎',
						comment: '5',
						like: '999',
						isLike: 1
					},
					{
						id: '4',
						title: '独占一块大陆的澳大利亚，为何不能成为中美一样的大国？',
						content: '纵观世界，没有哪个国家像澳大利亚一样，几乎独占整块大陆。不仅如此，澳大利亚四面环海，周边都是一些弱小的岛国，没有一个国家能够威胁到他，地缘环境相...',
						author: '庐州冢虎',
						comment: '5',
						like: '999',
						isLike: 1
					},
					{
						id: '5',
						title: '独占一块大陆的澳大利亚，为何不能成为中美一样的大国？',
						content: '纵观世界，没有哪个国家像澳大利亚一样，几乎独占整块大陆。不仅如此，澳大利亚四面环海，周边都是一些弱小的岛国，没有一个国家能够威胁到他，地缘环境相...',
						author: '庐州冢虎',
						comment: '5',
						like: '999',
						isLike: 1
					}
				],

			}
		},
		methods: {
			changeType: function () {
				let token = sessionStorage.getItem('token');
				if (token != null && token != undefined) {
					this.hasLogin = false
					this.$emit('change', this.hasLogin)
				}
			},
			like: function (index, isLike) {
				if (isLike == 0) {
					this.items[index].isLike = 1
					this.items[index].like--
				} else {
					this.items[index].isLike = 0
					this.items[index].like++
				}
			},
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
		beforeCreate: function () {

		}
	}
</script>

<style scoped>
	body {
		background: #fff;
	}

	.wraper {
		max-width: 960px;
		margin: auto;
		height: calc(100vh - 61px);
		display: flex;
		margin-top: 30px;
	}

	.carousel-inner {
		width: 625px;
		margin-left: 0;
	}

	.list {
		overflow-x: hidden;
		height: calc(100vh - 80px);
	}
	.left-warp{
	}
	.banner {
		width: 625px;

	}

	.banner a img {
		width: 100%;
		object-fit: cover;
		height: 250px;
	}

	#listContainer {
		border-top: 1px solid #e1e1e1;
		margin-top: 20px;
		width: 625px;
	}

	.note-list {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.note-list li.have-img {
		min-height: 140px;
	}

	.note-list li {
		position: relative;
		width: 625px;
		margin: 0 0 15px;
		padding: 15px 2px 20px 0;
		border-bottom: 1px solid #f0f0f0;
		word-wrap: break-word;
		box-sizing: border-box;
	}

	.note-list .have-img .wrap-img {
		position: absolute;
		top: 50%;
		margin-top: -60px;
		right: 0;
		width: 125px;
		height: 100px;
	}

	.note-list .have-img .wrap-img img {
		width: 100%;
		height: 100%;
		border-radius: 4px;
		border: 1px solid #f0f0f0;
		vertical-align: middle;
	}

	.note-list .have-img>div {
		padding-right: 140px;
	}

	.note-list .title.visited {
		color: #969696;
	}

	.note-list .title {
		margin: -7px 0 4px;
		display: inherit;
		font-size: 18px;
		font-weight: 700;
		line-height: 1.5;
	}

	.note-list .abstract {
		margin: 0 0 8px;
		font-size: 13px;
		line-height: 24px;
		color: #999;
	}

	.note-list .meta {
		padding-right: 0 !important;
		font-size: 12px;
		font-weight: 400;
		line-height: 20px;
	}

	.note-list .meta a {
		margin-right: 10px;
		color: #b4b4b4;
	}

	.note-list .meta a,
	.note-list .meta a:hover {
		transition: .1s ease-in;
		-webkit-transition: .1s ease-in;
		-moz-transition: .1s ease-in;
		-o-transition: .1s ease-in;
		-ms-transition: .1s ease-in;
	}

	.note-list .meta span {
		margin-right: 10px;
		color: #b4b4b4;
	}

	.icon-heart-on {
		color: #d81e06;
	}

	@keyframes heartZoom {
		0% {
			box-shadow: 1px 1px 10px 1px #d81e06;
			background: transparent;
		}

		50% {
			box-shadow: 1px 1px 20px 1px #d81e06;
			background: transparent;
		}

		75% {
			box-shadow: 1px 1px 10px 1px #d81e06;
			background: transparent;
		}

		100% {
			box-shadow: 0;
		}
	}

	.heartZoom {
		-webkit-animation-name: heartZoom;
		animation-name: heartZoom;
		animation-duration: 1s;
	}
	.right-wraper{
		width: 280px;
		display: flex;
		flex-direction: column;
	}
	.aside {
		margin-left: 20px;
	}

	.aside .board {
		margin-top: -4px;
		padding-bottom: 4px;
		min-height: 228px;
	}

	.aside .board img {
		width: 100%;
		min-height: 50px;
		margin-bottom: 6px;
		border-radius: 4px;
	}

	.aside .download {
		margin-bottom: 30px;
		padding: 10px 22px;
		width: 250px;
		border: 1px solid #f0f0f0;
		border-radius: 6px;
		background-color: #fff;
		display: flex;
		box-sizing: border-box;
	}

	.aside .download .qrcode {
		width: 60px;
		height: 60px;
		opacity: .85;
	}

	.aside .download .info {
		display: inline-block;
		vertical-align: middle;
		margin-left: 7px;
	}

	.aside .download .info .title {
		font-size: 15px;
		color: #333;
	}

	.aside .download .info .description {
		margin-top: 4px;
		font-size: 13px;
		color: #999;
	}

	.recommended-authors {
		margin-bottom: 20px;
		padding-top: 0;
		font-size: 13px;
		text-align: center;
	}

	.recommended-authors .title {
		text-align: left;
	}

	.recommended-authors .title span {
		font-size: 14px;
		color: #969696;
	}

	.recommended-authors .title .page-change {
		float: right;
		display: inline-block;
		font-size: 14px;
		color: #969696;
	}

	.recommended-authors .title .page-change i {
		display: inline-block;
		line-height: 1;
		transition: .5s ease;
	}

	.recommended-authors .list {
		margin: 0 0 20px;
		text-align: left;
		list-style: none;
	}

	.recommended-authors .list li {
		margin-top: 15px;
		line-height: 18px;
		margin-bottom: 20px;
	}

	.avatar {
		width: 24px;
		height: 24px;
		display: block;
		cursor: pointer;
	}

	.avatar img {
		width: 100%;
		height: 100%;
		border: 1px solid #ddd;
		border-radius: 50%;
	}

	.recommended-authors .list .avatar {
		float: left;
		width: 48px;
		height: 48px;
		margin-right: 10px;
	}

	.recommended-authors .list .follow,
	.recommended-authors .list .follow-cancel,
	.recommended-authors .list .follow-each,
	.recommended-authors .list .following {
		float: right;
		margin-top: 5px;
		padding: 0;
		font-size: 13px;
		color: #42c02e;
	}

	.follow {
		border-color: #42c02e;
	}

	.recommended-authors .list .name {
		padding-top: 5px;
		margin-right: 60px;
		font-size: 14px;
		display: block;
	}

	.recommended-authors .list p {
		margin-top: 2px;
		font-size: 12px;
		color: #969696;
	}

	.recommended-authors .find-more {
		position: absolute;
		padding: 7px 7px 7px 12px;
		left: 0;
		width: 100%;
		font-size: 13px;
		color: #787878;
		background-color: #f7f7f7;
		border: 1px solid #dcdcdc;
		border-radius: 4px;
	}
</style>