import { createApp, h } from 'vue'
import { Head, Link, createInertiaApp } from '@inertiajs/vue3'
import Layout from './Shared/Layout.vue';


createInertiaApp({
  progress: false, //depois colocar de novo
  // progress: {
  //   delay: 300,
  // },
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
    
    let page = pages[`./Pages/${name}.vue`].default

    if(page.layout === undefined) {
      page.layout = Layout
    }

    return pages[`./Pages/${name}.vue`]
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .mixin({ methods: { route } })
      .use(plugin)
      .component('Link', Link)
      .component('Head', Head)
      .mount(el)
  },
})