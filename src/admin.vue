<template>
<div id="admin">
  <header>
    <a href="/">首页</a>
    <span>退出登录</span>
  </header>
  <section class="content-wrapper">
    <aside>
      <ul>
        <li>
          <router-link to="/">文章管理</router-link>
        </li>
        <li>
          <router-link to="/user">用户管理</router-link>
        </li>
        <li>
          <router-link to="/classify">类别管理</router-link>
        </li>
      </ul>
    </aside>
    <router-view></router-view>
  </section>
</div>
</template>
<script></script>
