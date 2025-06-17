<script setup lang="ts">
import { getAllTickets } from '@/services/ticket.service'
import type { Ticket } from '@/types/ticket'
import { onMounted, ref } from 'vue'

const tickets = ref<Ticket[]>([])

onMounted(async () => {
  try {
    tickets.value = await getAllTickets()
  } catch (error) {
    console.error('Failed to fetch tickets:', error)
  }
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-if="tickets.length === 0">
        <v-alert type="info">You haven't booked any tickets yet.</v-alert>
      </v-col>
      <v-col cols="12" v-else v-for="ticket in tickets" :key="ticket.id">
        <v-card>
          <v-card-title>{{ ticket.event.title }}</v-card-title>
          <v-card-text>Date: {{ ticket.event.date }}</v-card-text>
          <v-card-text>Price: {{ ticket.price }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
