<template>
  <div class="home">
    <div class="banner"></div>
    <div class="main">
      <div class="left">
        <filter-list :list='filterList' v-model='filterForm' @change='filterChange'></filter-list>
      </div>
      <div class="right">
        <job-list @apply-click='applyFor' v-if='jobList.length>0' :list='jobList'></job-list>
      </div>
    </div>
  </div>
</template>

<script>
import filterList from '@/components/filterList'
import jobList from '@/components/jobList'
import api from '@/api'
export default {
  data () {
    return {
      filterList: [],
      jobList: [],
      filterForm: {}
    }
  },
  components: {
    filterList,
    jobList
  },
  methods: {
    initPage () {
      this.getfilterList().then(() => {
        this.getJobList()
      })
    },
    getfilterList () {
      return new Promise((resolve, reject) => {
        api.getFilterList().then(res => {
          this.filterList = res.data
          this.initfilterForm()
          resolve()
        })
      })
    },
    initfilterForm () {
      this.filterList.forEach(item => {
        this.$set(this.filterForm, item.value, item.list[0].value)
      })
    },
    getJobList () {
      api.getJobList(this.filterForm).then(res => {
        this.jobList = res.data
      })
    },
    filterChange (form) {
      this.getJobList()
    },
    applyFor (id) {
      this.$router.push({
        path: `/resume?id=${id}`
      })
    }
  },
  created () {
    this.initPage()
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
          .job-list{
            padding: 10px 0;
          }
        }
      }
    }
  }
</style>
