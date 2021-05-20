<script>
import { isEmpty } from 'lodash'
import { favouritesComputed, favouritesMethods } from '@state/helpers'

export default {
  props: {
    quote: {
      type: Object,
      default: () => ({
        id: '',
        text: '',
        character: '',
        movie: '',
      }),
    },
    characters: {
      type: Array,
      default: () => [],
    },
    movies: {
      type: Array,
      default: () => [],
    },
    quoteText: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      quoteAuthor: '',
      quoteMovie: '',
    }
  },
  computed: {
    ...favouritesComputed,
  },
  watch: {
    quote: {
      immediate: true,
      handler() {
        this.getQuoteDetails()
      },
    },
  },
  methods: {
    ...favouritesMethods,
    getQuoteDetails() {
      if (!isEmpty(this.characters)) {
        const author = this.characters.find(
          (character) => character._id === this.quote?.character
        )
        this.quoteAuthor = author?.name || ''
      }

      if (!isEmpty(this.movies)) {
        const movieOfOrigin = this.movies.find(
          (movie) => movie?._id === this.quote?.movie
        )
        this.quoteMovie = movieOfOrigin?.name || ''
      }
    },
    getCurrentQuoteObject() {
      return {
        id: this.quote?._id,
        text: this.quoteText,
        author: this.quoteAuthor,
        movie: this.quoteMovie,
      }
    },
    addToFavourites() {
      this.addFavouriteQuote(this.getCurrentQuoteObject())
    },
    removeFromFavourites() {
      this.deleteFavouriteQuote(this.getCurrentQuoteObject())
    },
    isFavourited() {
      let isFav = false
      if (!isEmpty(this.favouriteQuotes)) {
        this.favouriteQuotes.map((favouriteQuote) => {
          if (favouriteQuote.id === this.quote._id) {
            isFav = true
          }
        })
      }
      return isFav
    },
  },
}
</script>

<template>
  <div>
    <div v-if="quote._id" :class="$style.quoteDetails">
      <p>{{ quoteAuthor ? `~ ${quoteAuthor}` : '' }}</p>
      <p :class="$style.quoteMovie">{{ quoteMovie }}</p>
      <section
        v-if="!isFavourited()"
        :class="$style.favouriteSection"
        @click="addToFavourites"
      >
        <img
          :class="$style.heartIcon"
          alt="Add favourite"
          src="@assets/icons/iconmonstr-favorite-10.svg"
        />
        Add to favourites
      </section>
      <section
        v-if="isFavourited()"
        :class="$style.favouriteSection"
        @click="removeFromFavourites"
      >
        <img
          :class="$style.heartIcon"
          alt="Remove favourite"
          src="@assets/icons/iconmonstr-favorite-14.svg"
        />
        Remove from favourites
      </section>
    </div>
  </div>
</template>

<style lang="scss" module>
@import '@design';
.quoteDetails {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.quoteMovie {
  margin-top: 0;
  font-style: italic;
}

.favouriteSection {
  display: flex;
  align-items: center;
  margin-top: 8px;
  cursor: pointer;

  &:hover {
    transition: all 0.3s ease-in-out;
    transform: scale(1.3);
  }
}

.heartIcon {
  width: 20px;
  height: auto;
  margin-right: 8px;
}
</style>
