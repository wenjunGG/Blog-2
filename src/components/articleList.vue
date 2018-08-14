<template>
  <section class="content container mt20">
    <listCom :type="type" :para="para" :id="id" :preid="preid"></listCom>
    <column></column>
  </section>
</template>
<script>
export default {
  name: 'articleList',
  data () {
    return {
      type: this.$route.params.type,
      preid: this.$route.params.preid,
      sedid: this.$route.params.id,
      para: ''
    }
  }
}
</script>
