import Vue from "vue";
import svgIcon from '@/icons/SvgIcon'
Vue.component('svg-icon',svgIcon)

// 解析svg格式文件代码
const req = require.context('./svg', false, /\.svg$/);
const requireAll = (requireContext) => {
  return requireContext.keys().map(requireContext)
};
requireAll(req);