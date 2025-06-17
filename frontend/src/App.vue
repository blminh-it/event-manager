<script setup lang="ts">
import { ref } from 'vue'
const drawer = ref(true)

const navItems = [
  { title: 'Home', to: '/' },
  { title: 'Events', to: '/events' },
  { title: 'My Tickets', to: '/my-tickets' },
  { title: 'Login', to: '/login' },
  { title: 'Register', to: '/register' },
]
</script>

<template>
  <VLocaleProvider>
    <v-app>
      <v-navigation-drawer app v-model="drawer" width="240">
        <v-list nav dense>
          <v-list-item v-for="(item, index) in navItems" :key="index" :to="item.to" link>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon @click="drawer = !drawer" />
        <v-toolbar-title>🎫 Event Manager</v-toolbar-title>
      </v-app-bar>

      <v-main>
        <v-container class="py-4">
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </VLocaleProvider>
</template>
