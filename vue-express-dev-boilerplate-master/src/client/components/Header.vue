<template>
  <div class="head">
    <div id="mobile-bar" class="top">
      <a class="menu-button"></a>
      <a class="logo" href="/"></a>
    </div>
    <div id="header">
      <a id="logo" href="/">
        <img src="../static/images/timg.gif">
        <span class="siyuan">blog</span>
      </a>
      <ul id="nav">
        <li>
          <form id="search-form">
            <input type="text" id="search-query-nav" class="search-query st-default-search-input">
          </form>
        </li>
        <li>
          <a href="javascript:void(0)" class="nav-link index" @click="goIndex">首页</a>
        </li>
        <li>
          <a href="javascript:void(0)" class="nav-link login" @click="goLogin">登录/注册</a>
         
        </li>
        <li class="nav-dropdown-container learn">
          <a class="nav-link">学习</a><span class="arrow"></span>
          <ul class="nav-dropdown">
            <li>
              <ul>
                <li><a href="/v2/guide/" class="nav-link">教程</a></li>
                <li><a href="/v2/api/" class="nav-link">API</a></li>
                <li><a href="/v2/style-guide/" class="nav-link">风格指南</a></li>
                <li><a href="/v2/examples/" class="nav-link">示例</a></li>
                <li><a href="/v2/cookbook/" class="nav-link">Cookbook</a></li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="sidebar">
      <div class="sidebar-inner-index">
        <ul class="main-menu">
          <li>
            <form id="search-form">
              <input type="text" id="search-query-sidebar" class="search-query st-default-search-input">
            </form>
          </li>
          <li class="nav-dropdown-container learn">
            <a class="nav-link">学习</a><span class="arrow"></span>
            <ul class="nav-dropdown">
              <li>
                <ul>
                  <li><a href="/v2/guide/" class="nav-link">教程</a></li>
                  <li><a href="/v2/api/" class="nav-link">API</a></li>
                  <li><a href="/v2/style-guide/" class="nav-link">风格指南</a></li>
                  <li><a href="/v2/examples/" class="nav-link">示例</a></li>
                  <li><a href="/v2/cookbook/" class="nav-link">Cookbook</a></li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="">
      <router-view></router-view>
    </div>

  </div>

</template>

<script>
  import * as common from '../static/js/common.js'
  // const common = require('../static/js/common.js')
  export default {
    data() {
      return {
        tab: 0
      }
    },
    methods: {
      initMobileMenu: function () {
        var mobileBar = document.getElementById('mobile-bar')
        var sidebar = document.querySelector('.sidebar')
        var menuButton = mobileBar.querySelector('.menu-button')

        menuButton.addEventListener('click', function () {
          sidebar.classList.toggle('open')
        })
        document.body.addEventListener('click', function (e) {
          if (e.target !== menuButton && !sidebar.contains(e.target)) {
            sidebar.classList.remove('open')
          }
        })
      },
      goLogin: function(){
         this.$router.push({'path':'./login'})
      },
      goIndex : function(){
         this.$router.push({'path':'./index'})
      }
    },
    mounted: function () {
      this.initMobileMenu()
    }
  }
</script>

<style scoped>
  @import url('../static/css/index.css');
  @import url('../static/css/search.css');
  @import url(//at.alicdn.com/t/font_899268_lwy8gbrhmn.css);
  .siyuan{
    font-family: fantasy;
  }
  .icon-iconkuozhan_wodepre-{
    font-size: 30px;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
  }

</style>