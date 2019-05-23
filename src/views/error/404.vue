<template>
  <div class="error-found">
    <div class="pic fadeInLeft">
      <img :src="img" alt="">
    </div>
    <div class="btn fadeInRight">
      <h1>{{$t('remind.errorPath')}}</h1>
      <el-button type="primary">
        <router-link :to="{path: '/'}" tag="span">{{$t('index.backHome')}}</router-link>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'not-found',
  data () {
    return {
      img: require('../../assets/404_bg.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.error-found {
  box-sizing: border-box;
  height: 100%;
  display: flex;
  justify-content: center;
  background: white;
  padding-top: 150px;
  .pic {
    float: left;
    img {
      height: 200px;
      width: auto;
    }
  }
  .btn {
    overflow: hidden;
    h1 {
      font-size: 26px;
      margin: 30px 0 0 0;
    }
    button {
      margin: 40px 0 0 20px;
    }
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

.fadeInRight {
  animation-name: fadeInRight;
  animation-duration: 1s;
  animation-fill-mode: both;
}

.fadeInLeft {
  animation-name: fadeInLeft;
  animation-duration: 1s;
  animation-fill-mode: both;
}
</style>
