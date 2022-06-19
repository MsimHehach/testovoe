<template>
  <div>

    <h1 style="text-shadow: -4px 4px 0px #2dcebe70;">Main menu</h1>
    <q-banner >
        <q-input standout="bg-purple text-white" :rules="[ val => val <= 18 && val > 0 || 'Number of pairs must be between 1 and 18' ]" v-model="storeCounter.size" class="input" type="text" label="Number of pairs" />
        <q-input standout="bg-purple text-white" :rules="[ val => val > 0 || 'Number of errors must be > 0' ]" v-model="storeCounter.errors" class="input" id="errors" type="text" label="Number of errors" />
        <br>
        <q-btn color="secondary" label="Start" to="/GamePage" />
    </q-banner>

  </div>
</template>

<script lang="ts">
import { useCounterStore } from '../stores/myStore'

export default {
  setup() {
    const storeCounter = useCounterStore();

  return {
    storeCounter
  }
  }
}

</script>

<style scoped>
  .q-input {
    font-size: larger;
    width: 260px;
    text-align: center;

  }
  .q-btn {
    font-size: larger;
    position: relative;
    left: 67%;
  }
  div {
    display:flex;
    padding-left: 26%;
    padding-right: 25%;
    padding-top: 10%;
  }

  .container {
  width: 10em;
  height: 10em;
  border: 2px dotted white;
  transform-style: preserve-3d;
  animation: rotate 10s infinite linear;
  }
</style>
