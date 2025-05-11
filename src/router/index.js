import { createRouter, createWebHistory } from 'vue-router'
import AddressEntryView from '../views/AddressEntryView.vue'
import AddressListView from '../views/AddressListView.vue'

const routes = [
  {
    path: '/',
    name: 'address-entry',
    component: AddressEntryView
  },
  {
    path: '/addresses',
    name: 'address-list',
    component: AddressListView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router