<template>
  <div class="filter-list" :class="{fixed}">
    <el-collapse>
      <el-collapse-item v-for='item in list' :key='item.value' :name="item.value">
        <template slot="title">
          <icon :name='item.value'></icon>{{item.label}}
        </template>
        <ul>
          <li class="cld-item" @click="select(item.value,cld.value)" :class="{active:filterForm[item.value]===cld.value}" v-for="cld in item.list" :key='cld.value'>{{cld.label}}</li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    filterForm: Object
  },
  model: {
    prop: 'filterForm',
    event: 'change'
  },
  data () {
    return {
      fixed: false
    }
  },
  methods: {
    select (key, value) {
      if (this.filterForm[key] !== value) {
        this.filterForm[key] = value
        this.$emit('change', this.filterForm)
      }
    },
    scrollEvent () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.fixed = scrollTop > 250
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollEvent, false)
  }
}
</script>

<style lang="scss" scoped>
  .filter-list{
    .el-collapse-item::v-deep{
      color: #666;
      .el-collapse-item__header{
        font-size: 15px;
        svg{
          margin-right: 10px;
        }
      }

    }
    .cld-item{
      line-height: 40px;
      padding-left: 30px;
      border-left: 3px solid transparent;
      cursor: pointer;
      &:hover{
        color: #69C72B;
      }
      &.active{
        border-color: #69C72B;
        background:rgba(246,246,246,1);
        color: #333;
      }
    }
    @media screen and (min-width: 769px) {
        &.fixed{
          position: fixed;
          top:100px;
          width: 180px;
        }
      }
  }
</style>
