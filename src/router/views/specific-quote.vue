<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main.vue'
import SpecificQuoteDetailsSection from '@components/specific-quote-details-section.vue'
import axios from 'axios'

export default {
  page: {
    title: 'Quote',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, SpecificQuoteDetailsSection },
  data() {
    return {
      quote: null,
      author: '',
      movie: '',
    }
  },
  mounted() {
    this.fetchQuote()
  },
  methods: {
    async fetchQuote() {
      const quoteId = this.$route.params.id
      let quote
      if (quoteId) {
        await axios
          .get(`https://the-one-api.dev/v2/quote/${quoteId}`, {
            headers: {
              Authorization: 'Bearer uzUMPxE8664bijd0sxRi',
            },
          })
          .then((res) => {
            quote = res.data.docs[0]
          })
      }
      if (quote && quote.movie && quote.character) {
        await axios
          .get(`https://the-one-api.dev/v2/character/${quote.character}`, {
            headers: {
              Authorization: 'Bearer uzUMPxE8664bijd0sxRi',
            },
          })
          .then((res) => {
            this.author = res.data.docs[0].name
          })
        await axios
          .get(`https://the-one-api.dev/v2/movie/${quote.movie}`, {
            headers: {
              Authorization: 'Bearer uzUMPxE8664bijd0sxRi',
            },
          })
          .then((res) => {
            this.movie = res.data.docs[0].name
          })
      }
      this.quote = quote
    },
  },
}
</script>

<template>
  <Layout>
    <div :class="$style.quoteContainer">
      <div :class="$style.startQuote">"</div>
      <div>
        <h3>
          {{ quote ? quote.dialog : '' }}
        </h3>
        <SpecificQuoteDetailsSection
          :quote-text="quote ? quote.dialog : ''"
          :quote-id="quote ? quote._id : ''"
          :movie="movie"
          :author="author"
        />
      </div>
      <div :class="$style.endQuote">"</div>
    </div>
  </Layout>
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
