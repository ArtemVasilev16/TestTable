import Vue from 'vue'
import App from './App.vue'
import LoginPage from './pages/login'
import ProfilePage from './pages/profile'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

const routes = [
  { path: '/', component: LoginPage },
  { path: '/profile', component: ProfilePage },
]

const router = new VueRouter({
  routes // сокращённая запись для `routes: routes`
})

Vue.use(VueRouter)

new Vue({
  router, 
  render: h => h(App),
}).$mount('#app')


