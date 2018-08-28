<template>
  <section class="content container mt110 mb20">
    <div class="main artshow mb20">
      <div class="enter">
        <h2>评论</h2>
        <textarea name="" id="" cols="80" rows="8" v-model="comTxt"></textarea>
        <input type="button" value="发表评论" @click="commentFn">
      </div>
    </div>
    <comment type="guestbook" :id="id" ref="comment"></comment>
    <column></column>
  </section>
</template>
<script>
import comment from './mods/comment'
export default {
  name: 'guestbook',
  data () {
    return {}
  },
  components: {
    comment
  }
}
</script>
