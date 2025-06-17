<script setup lang="ts">
import { getAllEvents } from '@/services/event.service'
import type { Event } from '@/types/event'
import { onMounted, ref } from 'vue'

const events = ref<Event[]>([])

onMounted(async () => {
  try {
    events.value = await getAllEvents()
  } catch (error) {
    console.error('Failed to fetch events:', error)
  }
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-for="event in events" :key="event.id">
        <v-card>
          <v-card-title>{{ event.title }}</v-card-title>
          <v-card-text>{{ event.description }}</v-card-text>
          <v-card-text>Location: {{ event.location }} - Date: {{ event.date }}</v-card-text>
          <v-card-actions>
            <v-btn :to="`/events/${event.id}`" color="primary">View Details</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
