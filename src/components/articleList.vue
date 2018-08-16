<template>
  <section class="content container mt20">
    <listCom :type="type" :para="para" :cid="cid"></listCom>
    <column></column>
  </section>
</template>
<script>
export default {
  name: 'articleList',
  data () {
    return {
      type: this.$route.params.type,
      cid: this.$route.params.cid,
      para: this.$route.query.para
    }
  }
}
</script>
