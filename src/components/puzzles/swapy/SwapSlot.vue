<script setup lang="ts">
const { slotId } = defineProps<{
  slotId: string;
}>();
</script>

<template>
  <div class="slot" :data-swapy-slot="slotId"></div>
</template>
