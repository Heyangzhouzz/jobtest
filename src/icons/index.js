import Vue from 'vue'
import SvgIcon from '@/components/Icon'// svg组件

// register globally
Vue.component('icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
