<template>
  <div class="card" @click="clickCard">
    <div v-if="visible" class="cardFace Front" >
      <img class="imag" :src="`/images/${value}.png`" :alt="value"/>
      <img v-if="hit" class="checkmark" src="../../public/images/checkIcon/check.png"/>
    </div>
    <div v-else class="cardFace Back">
    </div>
  </div>

</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
    props: {
    hit: {
      type: Boolean,
      default: false,
    },
    position: {
      type: Number,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    }
  },
  setup(props : any, context : any) {
    const clickCard = () => {
      context.emit('click-card', {
        position: props.position,
        faceValue: props.value
      })
    }
    return {
      clickCard
    }
  },
}
</script>

<style scoped>
  .card {
      border: 4px solid rgb(223, 223, 223);
      border-radius: 7px;
      cursor: pointer;
      font-family: Helvetica, sans-serif;
      text-align: center;
      position: relative;
      min-height: 120px;
      min-width: 120px;

  }

  .cardFace.Front {
    background: rgb(197, 197, 197);;
    color: white;
  }

  .cardFace.Back {
    background: rgb(70, 70, 70);
    color: white;
  }

  .checkmark {
    position: absolute;
    right: 2px;
    bottom: 2px;
  }
  .imag{
    width: 95px;
  }
  .cardFace {
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
