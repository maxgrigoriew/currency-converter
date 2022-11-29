import Vue from 'vue'
import VueRouter from 'vue-router'
import ConverterPage from '@/pages/ConverterPage'
import CurrencyOnlinePage from '@/pages/CurrencyOnlinePage'
Vue.use(VueRouter)

const routes = [
  {
        path: "/",
        component: ConverterPage,
        meta: {
            layout: 'MainLayout'
        }
  },
  {
          path: "/currencyonlinepage",
          component: CurrencyOnlinePage,
           meta: {
                      layout: 'MainLayout'
                  }
  }
];

export const router = new VueRouter({
  routes,
  mode: "history",
});
