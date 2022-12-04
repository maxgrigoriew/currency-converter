<template>
    <v-app>
        <v-navigation-drawer app expand-on-hover>
            <v-card>
                <v-navigation-drawer v-model="drawer" permanent dark>
                    <v-list height="100vh">
                        <v-list-item v-for="item in items" :key="item.title" link :to="item.link">
                            <v-list-item-icon>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-navigation-drawer>
            </v-card>
        </v-navigation-drawer>
        <v-main>
            <v-container fluid no-guters>
                <router-view />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            drawer: true,
            items: [
                { title: "Конвертор валют", icon: "mdi-home-city", link: "/" },
                { title: "Курс валют", icon: "mdi-account", link: "/currency" },
            ],
            mini: true,
        }
    },
}
</script>

<style scoped></style>
