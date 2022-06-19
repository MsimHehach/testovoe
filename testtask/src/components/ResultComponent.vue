<template>
  <q-dialog position="top" :model-value="result" @update:modelValue="$emit('update:result', $event)">
        <q-card class="my-card">
        <q-card-section class="bg-primary text-white">
        <div class="text-h6">{{ props.result? 'You won!!' :'You lost :(' }}</div>
        <!-- <div class="text-subtitle2"></div> -->
        </q-card-section>

    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  const props = defineProps({
    result: Boolean,
  })
  defineEmits(['update:result'])
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
  text-align: center
</style>

