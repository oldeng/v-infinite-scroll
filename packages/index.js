import Plugin from './src/index.vue';

const components = [
  Plugin
]

export const  {
  Plugin: Plugin
}

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
