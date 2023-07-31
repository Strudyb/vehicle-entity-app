import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VehicleDetailsView from '../views/VehicleDetailsView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'VehicleListing',
    component: HomeView
  },
  {
    path: '/vehicle/:id',
    name: 'VehicleDetails',
    component: VehicleDetailsView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
