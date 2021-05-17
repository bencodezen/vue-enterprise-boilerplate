<script>
import axios from 'axios'

export default {
  page: {
    title: 'Random Quote',
  },
  data() {
    return {
      quotes: [],
      currentQuoteIndex: -1,
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      axios
        .get('https://the-one-api.dev/v2/quote', {
          headers: {
            Authorization: 'Bearer uzUMPxE8664bijd0sxRi',
          },
        })
        .then((res) => {
          this.quotes = res.data.docs
        })
    },
    getRandomQuoteIndex() {
      const max = this.quotes.length
      this.currentQuoteIndex = Math.round(Math.random() * max)
    },
    getRandomQuote() {
      if (
        !this.quotes ||
        this.currentQuoteIndex < 0 ||
        !this.quotes[this.currentQuoteIndex]
      ) {
        return ''
      }
      const foundQuote = this.quotes[this.currentQuoteIndex]?.dialog
      if (foundQuote.length > 200) {
        this.getRandomQuoteIndex()
        return this.quotes[this.currentQuoteIndex]?.dialog
      }
      return foundQuote
    },
  },
}
</script>

<template>
  <div>
    <BaseButton @click="getRandomQuoteIndex">
      Po-ta-toes!
    </BaseButton>
    <div :class="$style.quoteContainer">
      <div v-if="currentQuoteIndex > -1" :class="$style.startQuote">"</div>
      <h3>
        {{ getRandomQuote() }}
      </h3>
      <div v-if="currentQuoteIndex > -1" :class="$style.endQuote">"</div>
    </div>
  </div>
</template>

<style lang="scss" module>
@import '@design';

.quoteContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 90vw;
  height: 70vh;

  h3 {
    width: 80vw;
    line-height: 1.6;
    text-align: center;
  }

  .startQuote,
  .endQuote {
    width: 30px;
    height: 30px;
    margin-right: 45px;
    font-size: 180px;
    font-style: italic;
    color: lightgray;
  }

  .startQuote {
    position: fixed;
    bottom: 30px;
    left: 0;
  }

  .endQuote {
    position: fixed;
    top: 30vh;
    right: 30px;
  }
}
</style>
