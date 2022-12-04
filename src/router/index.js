import Vue from "vue"
import VueRouter from "vue-router"
import ConverterPage from "@/pages/ConverterPage"
import CurrencyPage from "@/pages/CurrencyPage"
Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        component: ConverterPage,
        meta: {
            layout: "MainLayout",
        },
    },
    {
        path: "/currency",
        component: CurrencyPage,
        meta: {
            layout: "MainLayout",
        },
    },
]

export const router = new VueRouter({
    routes,
    mode: "history",
})
