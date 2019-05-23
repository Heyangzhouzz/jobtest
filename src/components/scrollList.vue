<template>
  <div class="scroll-list" :class="{fixed}">
    <ul>
      <li v-for="item in list" :key="item.value"><a :class="{active:activeValue===item.value}" @click="linkClick(item.value)" :href="`#${item.value}`" v-smooth-scroll>{{item.label}}</a></li>
    </ul>
  </div>
</template>

<script>
import { setTimeout } from 'timers'
export default {
  props: {
    list: Array
  },
  data () {
    return {
      fixed: false,
      activeValue: 'information',
      scrollIng: false
    }
  },
  methods: {
    scrollEvent () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.fixed = scrollTop > 250
      if (!this.scrollIng) {
        let linkItems = document.querySelectorAll('.link-item')
        linkItems = Array.prototype.slice.call(linkItems, 0)
        this.activeValue = linkItems.find(item => item.getBoundingClientRect().top >= 0).id
      }
    },
    linkClick (value) {
      this.activeValue = value
      this.scrollIng = true
      setTimeout(() => {
        this.scrollIng = false
      }, 500)
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollEvent, false)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scrollEvent, false)
  }
}
</script>

<style lang="scss" scoped>
  .scroll-list{
    padding-top: 40px;
    a{
      display: block;
      color: #666;
      text-decoration: none;
      line-height: 40px;
      font-size: 16px;
      border-left: 3px solid transparent;
      padding-left: 23px;
    }
    .active{
      background:rgba(246,246,246,1);
      border-left-color: #69C72B;
      color: #333;
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
