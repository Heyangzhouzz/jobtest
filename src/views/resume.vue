<template>
  <div class="home">
    <div class="banner"></div>
    <div class="main" v-loading="loading">
      <div class="left">
        <scroll-list :list="resumeList"></scroll-list>
      </div>
      <div class="right">
        <resume-from v-if='resumeList.length>0' :resumeForm="resumeForm" :list='resumeList'></resume-from>
      </div>
    </div>
  </div>
</template>

<script>
import resumeFrom from '@/components/resumeForm'
import scrollList from '@/components/scrollList'
import api from '@/api'
export default {
  data () {
    return {
      resumeList: [],
      resumeForm: {},
      loading: true
    }
  },
  components: {
    resumeFrom,
    scrollList
  },
  methods: {
    getResumeList () {
      this.loading = true
      api.getResumeList().then(res => {
        this.resumeList = res.data
        this.initResumeForm()
        this.loading = false
      })
    },
    initResumeForm () {
      this.resumeList.forEach(item => {
        let typeForm = {}
        item.list.forEach(li => {
          if (li.type === 'select' || li.type === 'radio') {
            this.$set(typeForm, li.value, li.list[0].value)
          } else if (li.type === 'monthSelect') {
            this.$set(typeForm, li.value, '1990-01')
          } else if (li.type === 'multipleSelect' || li.type === 'monthRange') {
            this.$set(typeForm, li.value, [])
          } else {
            this.$set(typeForm, li.value, '')
          }
        })
        this.$set(this.resumeForm, item.value, typeForm)
      })
      this.$set(this.resumeForm, 'vldCode', '')
    }
  },
  created () {
    this.getResumeList()
  }
}
</script>

<style lang="scss" scoped>
  .home{
    .banner{
      height: 250px;
      background: url('../assets/banner.png') no-repeat center;
      background-size: cover;
      @media screen and (max-width: 768px) {
        display: none;
      }
    }
    .main{
      margin: 0 auto;
      min-height: 250px;
      padding-left: 15px;
      padding-right: 15px;
      max-width: 1130px;
      display: flex;
      .left{
        width: 180px;
        margin-right: 30px;
      }
      .right{
        flex: 1;
      }
       @media screen and (max-width: 768px) {
        flex-wrap: wrap;
        .left{
          width: 100%;
        }
        .right{
          width: 100%;
        }
      }
    }
  }
</style>
