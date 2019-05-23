<template>
  <div class="error">
    <div class="pic zoomIn">
      <img :src="img" alt="">
    </div>
    <div class="btn fadeInUp">
      <h1>{{$t('remind.error')}}</h1>
      <p>{{$t('remind.TEL')}}</p>
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
.error {
  margin: 150px auto 0 auto;
  height: 200px;
  width: 600px;
  text-align: center;
  .pic {
    img {
      height: auto;
      width: 150px;
    }
  }
  .btn {
    overflow: hidden;
    h1 {
      font-size: 18px;
      margin: 30px 0 0 0;
    }
    p {
      margin: 10px 0;
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

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  50% {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

.zoomIn {
  animation-name: zoomIn;
  animation-duration: 1s;
  animation-fill-mode: both;
}

.fadeInUp {
  animation-name: fadeInUp;
  animation-duration: 1s;
  animation-fill-mode: both;
}
</style>
