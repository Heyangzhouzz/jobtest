<template>
  <div class="job-list">
    <el-collapse v-model="activeNames">
      <el-collapse-item v-for='item in list' :key='item.id' :name="item.id">
        <template slot="title">
          <span class="title">{{item.title}}</span>
          <el-button @click="$emit('apply-click',item.id)" class="apply" size="mini" type="primary">申请</el-button>
        </template>
        <div class="content">
          <div class="tips">
            <span class="time">更新时间： {{item.update_time}}</span>
            <span class="city">工作地点： {{item.city}}</span>
          </div>
          <div v-for="dtl in item.detail" :key="dtl.value"  class="detail">
            <div class="label">{{dtl.label}} :</div>
            <p v-for="(p,idx) in dtl.list" :key="idx">
              {{idx + 1 + '丶'+ p }}
            </p>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeNames: []
    }
  },
  props: {
    list: Array
  },
  watch: {
    list: {
      handler () {
        this.activeNames = this.list.map(item => item.id)
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .job-list{
    padding: 40px 0;
    .el-collapse-item::v-deep{
      .el-collapse-item__header{
        padding-left: 30px;
        position: relative;
        background:rgba(246,246,246,1);
        .title{
          color: #69C72B
        }
        .apply{
          position: absolute;
          right:40px;
          top: 10px;
        }
      }
    }
    .content{
      padding: 0 15px;
      .tips{
        display: flex;
        justify-content: space-between;
        line-height: 50px;
        font-size: 12px;
        color:#999;
      }
      .detail{
        .label{
          font-size: 13px;
          color: #666;
          line-height: 24px;
        }
        p{
          padding: 0 15px;
          font-size: 12px;
          color: #999;
          line-height: 24px;
        }
      }
    }
  }
</style>
