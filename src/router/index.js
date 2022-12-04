import Vue from "vue"
import VueRouter from "vue-router"
import ConverterPage from "@/pages/ConverterPage"
import CurrencyPage from "@/pages/CurrencyPage"
import TestPage from "@/pages/TestPage"
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
    {
        path: "/test",
        component: TestPage,
        meta: {
            layout: "MainLayout",
        },
    },
]

export const router = new VueRouter({
    routes,
    mode: "history",
})
