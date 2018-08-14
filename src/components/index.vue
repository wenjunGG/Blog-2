<template>
  <div>
    <section class="container mt110 clearfix">
      <banner></banner>
      <div class="blog-about">
        <article class="search">
          <h1>搜索本站</h1>
          <p><input type="text"><i class="iconfont">&#xe6a8;</i></p>
        </article>
        <article class="about">
          <h1>关于博客</h1>
          <p>lolowu：名字取自陋室铭，愿本站能成为一个前端学习者交流学习的园地，达到“山不在高，有仙则名”的境界。</p>
          <p>本站前端页面主要采用原生JS、JQ结合css完成布局和特效，采用vue.js做数据处理，后台用node.js搭建，数据库为SQLserver，源码地址：<a href="https://github.com/xiuyer/lolowu.git">https://github.com/xiuyer/lolowu.git</a></p>
        </article>
      </div>
    </section>
    <section class="content container mt20">
      <listCom type="all"></listCom>
      <column></column>
    </section>
  </div>
</template>
<script>
import banner from './mods/banner'
import listCom from './mods/listComponent'
import column from './mods/column'
export default {
  name: 'index',
  components: {
    banner,
    listCom,
    column
  }
}
</script>
