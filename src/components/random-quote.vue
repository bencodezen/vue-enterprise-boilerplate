<script>
import axios from 'axios'
import RandomQuoteDetailsSection from './random-quote-details-section.vue'

export default {
  page: {
    title: 'Random Quote',
  },
  components: {
    RandomQuoteDetailsSection,
  },
  data() {
    return {
      quotes: [],
      currentQuoteIndex: -1,
      characters: [],
      movies: [],
      quoteText: '',
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      axios
        .get('https://the-one-api.dev/v2/quote?limit=1000000', {
          headers: {
            Authorization: 'Bearer uzUMPxE8664bijd0sxRi',
          },
        })
        .then((res) => {
          this.quotes = res.data.docs
        })
      axios
        .get('https://the-one-api.dev/v2/character', {
          headers: {
            Authorization: 'Bearer uzUMPxE8664bijd0sxRi',
          },
        })
        .then((res) => {
          this.characters = res.data.docs
        })
      axios
        .get('https://the-one-api.dev/v2/movie', {
          headers: {
            Authorization: 'Bearer uzUMPxE8664bijd0sxRi',
          },
        })
        .then((res) => {
          this.movies = res.data.docs
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
        return
      }

      let foundQuote = this.quotes[this.currentQuoteIndex]?.dialog
      if (foundQuote.length > 200) {
        this.getRandomQuoteIndex()
        foundQuote = this.quotes[this.currentQuoteIndex]?.dialog
      }
      this.quoteText = foundQuote
      return this.quotes[this.currentQuoteIndex]
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
      <div>
        <h3>
          {{ quoteText }}
        </h3>
        <RandomQuoteDetailsSection
          :quote="getRandomQuote()"
          :movies="movies"
          :characters="characters"
          :quote-text="quoteText"
        />
      </div>
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
