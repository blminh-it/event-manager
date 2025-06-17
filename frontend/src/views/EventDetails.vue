<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const eventId = route.params.id

const event = ref({
  id: eventId,
  name: 'Sample Event',
  description: 'This is a detailed event description.',
  date: '2025-07-01',
})
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>{{ event.name }}</v-card-title>
      <v-card-text>
        {{ event.description }}
        <br />
        Date: {{ event.date }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="success">Book Ticket</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
