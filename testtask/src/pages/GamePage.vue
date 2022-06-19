<template>
  <div @submit.prevent>
    <p class="Errors" id="errorNumbers"><strong> Errors: {{ errorsCount }}</strong></p>
    <q-separator/>
    <p class="Pairs">{{ status }} | Score: {{ score }}</p>
    <q-banner >
      <template v-slot:action>

      </template>
    </q-banner>

    <section class="game-board">
      <CardComponent v-for="(card, index) in cardList"
      :key="`${index}`"
      :value="card.value"
      :visible="card.visible"
      :hit="card.hit"
      :position="index"
      @click-card="changeCard"
      />
    </section>

  </div>
  <div style="text-align:center;">
      <q-btn class="restartBtn" @click="restart" push color="primary" label="Restart"/><q-space/><br>
      <q-btn class="homeBtn" to='/' push color="secondary" label="Home" />
  </div>
    <ResultComponent v-model="modal" :result="res"/>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import { ref, watch, computed } from 'vue';
import CardComponent from '../components/CardComponent.vue';
import { useCounterStore } from '../stores/myStore'
import ResultComponent from 'src/components/ResultComponent.vue';
  export default {
    components: {
      CardComponent,
      ResultComponent
},
    setup() {
      const storeCounter = useCounterStore();
      const errorsCount = ref(storeCounter.errors);
      const size  = storeCounter.size;
      const cardList : any = ref([]);
      const userClick : any = ref([]);
      const modal = ref(false);
      const res = ref(false);
      const score = ref(storeCounter.score);

      const cardItems = ['1','2','3','4','5',
      '6','7','8','9','10','11','12','13','14','15','16','17','18']
      const sizeleft = cardItems.length - size;
      cardItems.splice(0,sizeleft)
      const status = computed(() => {
        if (pairsLeft.value === 0) {
          openModal(true)
          restart()
          return 'End of the game'
        } else {
          if (errorsCount.value === 0) {
              openModal(false)
              restart()
              return 'End of the game'
            }
          return `Pairs left: ${pairsLeft.value}`
        }
      })
      cardItems.forEach(item => {
        cardList.value.push ({
            value: item,
            visible: false,
            hit: false,
          })
          cardList.value.push ({
            value: item,
            visible: false,
            hit: false,
          })
      })
      const openModal = async (result: boolean) => {
        res.value = result
        modal.value = !modal.value
      }

      cardList.value = cardList.value.map((card:any,
      index:any) => {
        return {
          ...card,
          position: index
        }
      })

      const pairsLeft = computed(() => {
        const cardLeft = cardList.value.filter
        ((card:any) => card.hit === false).length

        return Math.floor(cardLeft / 2)
      })

      const restart = () => {
        shuffle()
        errorsCount.value = storeCounter.errors;
        score.value = 0;
        cardList.value = cardList.value.map((card:any, index:number) => {
          return {
            ...card,
            hit: false,
            position: index,
            visible: false,
          }
        })
      }

      const shuffle = () => {
        cardList.value = _.shuffle(cardList.value)
      }

      const changeCard = (item:any) => {
        cardList.value[item.position].visible = true

        if (userClick.value[0]) {
          if ((userClick.value[0].position == item.position) &&
          (userClick.value[0].faceValue === item.faceValue)){
            return
          } else {
            userClick.value[1] = item
          }
        } else {
          userClick.value[0] = item
        }
      }

      watch(
        userClick,
        (currentValue) => {
        if (currentValue.length === 2) {
          const firstCard = currentValue[0]
          const secondCard = currentValue[1]

          if (firstCard.faceValue === secondCard.faceValue) {
            cardList.value[firstCard.position].hit = true
            cardList.value[secondCard.position].hit = true
            score.value +=10
          } else {
            errorsCount.value--
            setTimeout(() => {
              cardList.value[firstCard.position].visible = false
              cardList.value[secondCard.position].visible = false
              if (score.value != 0) score.value--
            }, 600)
          }
          userClick.value.length = 0
        }
      }, {deep: true})

      shuffle()

      return {
        cardList,
        changeCard,
        userClick,
        status,
        shuffle,
        restart,
        errorsCount,
        storeCounter,
        modal,
        openModal,
        res,
        score
      }
    }
  }
</script>

<style lang="scss" scoped>
  .game-board {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(120px, 1fr));
    padding-bottom: 40px;
    padding-left: 400px;
    padding-right: 400px;
    grid-gap: 7px;
    height: auto;
  }

  .Errors {
    font-family: Helvetica, sans-serif;
    text-align: center;
    font-size: 170%;
    padding-top: 10px;
    color: #26A69A
  }

  .Pairs {
    font-family: Helvetica, sans-serif;
    text-align: center;
    font-size: 140%;
  }

  .restartBtn {
    height: 50px;
    width: 150px;
    font-size: larger;
  }
  .homeBtn {
    height: 50px;
    width: 150px;
    font-size: larger;
  }
  .btn {
    position: relative;
    left: 50%;
  }
</style>
