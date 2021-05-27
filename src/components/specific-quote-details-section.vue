<script>
import { isEmpty } from 'lodash'
import { favouritesComputed, favouritesMethods } from '@state/helpers'

export default {
  props: {
    quoteId: {
      type: String,
      default: '',
    },
    quoteText: {
      type: String,
      default: () => '',
    },
    author: {
      type: String,
      default: () => '',
    },
    movie: {
      type: String,
      default: () => '',
    },
  },
  computed: {
    ...favouritesComputed,
  },
  methods: {
    ...favouritesMethods,
    getCurrentQuoteObject() {
      return {
        id: this.quoteId,
        text: this.quoteText,
        author: this.author,
        movie: this.movie,
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
          if (favouriteQuote.text === this.quoteText) {
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
    <div v-if="quoteId" :class="$style.quoteDetails">
      <p>{{ author ? `~ ${author}` : '' }}</p>
      <p :class="$style.quoteMovie">{{ movie }}</p>
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
