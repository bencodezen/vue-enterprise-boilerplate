<script>
import { favouritesComputed, favouritesMethods } from '@state/helpers'

export default {
  page: {
    title: 'Favourites',
  },
  computed: {
    ...favouritesComputed,
  },
  methods: {
    ...favouritesMethods,
  },
}
</script>

<template>
  <div class="tile is-parent is-vertical">
    <div
      v-for="quote in favouriteQuotes"
      :key="quote.id"
      :class="['card', $style.quoteCard]"
    >
      <div class="card-content">
        <p class="title">
          {{ quote.text }}
        </p>
        <p class="subtitle"> {{ quote.author }} - {{ quote.movie }} </p>
      </div>
      <footer class="card-footer">
        <p class="card-footer-item">
          <span
            :class="$style.removeButton"
            @click="deleteFavouriteQuote(quote)"
          >
            <img
              :class="$style.heartIcon"
              alt="Remove favourite"
              src="@assets/icons/iconmonstr-favorite-14.svg"
            />
            Remove from favourites
          </span>
        </p>
        <p class="card-footer-item">
          <span>
            Share with a friend
          </span>
        </p>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" module>
@import '@design';

.quoteCard {
  margin-bottom: 8px;
}

.removeButton {
  display: flex;
  align-items: center;
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
