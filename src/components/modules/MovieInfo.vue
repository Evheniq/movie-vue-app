<template>
  <section class="film-info">
    <div class="rating">
      <div class="imbd-rating">IBDb rating</div>
      <div class="stars">
        <img src="@/assets/icons/star.svg" alt="star" />
        {{ filmObject.imdb_rating }} <span>/10</span>
      </div>
    </div>

    <div class="film-content">
      <div class="film-main-info">
        <div class="film-name">
          {{ filmObject.title }}
          <span>(2019)</span>
        </div>
        <div class="film-description">
          {{ filmObject.description }}
        </div>
        <div class="film-tags">
          <span>
            <template v-for="genre in filmObject.genres" :key="genre.id">
              {{ genre.title }}
            </template>
          </span>
          |
          <span>
            {{ filmObject.mpa_rating }}
          </span>
          |
          <span>
            {{ formatFilmDuration(filmObject.duration) }}
          </span>
        </div>
      </div>

      <div class="outside-info">
        <div>
          <span>Director: </span>
          <template v-for="(director, index) in filmObject.directors" :key="director.id">
            {{ director.first_name }} {{ director.last_name }}
            <span v-if="index !== filmObject.directors.length - 1">, </span>
          </template>
        </div>
        <div>
          <span>Writers: </span>
          <template v-for="(writer, index) in filmObject.writers" :key="writer.id">
            {{ writer.first_name }} {{ writer.last_name }}
            <span v-if="index !== filmObject.writers.length - 1">, </span>
          </template>
        </div>
        <div>
          <span>Stars: </span>
          <template v-for="(star, index) in filmObject.stars" :key="star.id">
            {{ star.first_name }} {{ star.last_name }}
            <span v-if="index !== filmObject.stars.length - 1">, </span>
          </template>
        </div>
      </div>
    </div>
    <a
      href="https://www.youtube.com/watch?v=5ldIQtgCYzk&list=RDMMtCZyEQXDFio&index=32&ab_channel=CostelVanDein-Topic"
    >
      <button-component style="margin-top: 15px" rectangle> Watch trailer </button-component>
    </a>
  </section>
</template>

<script>
import {formatFilmDuration} from '../helpers/formatFilmDuration.js'
import ButtonComponent from '@/components/UI/ButtonComponent.vue'

export default {
  name: 'MovieInfo',
  components: { ButtonComponent },
  methods: { formatFilmDuration },
  props: {
    filmObject: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.film-info {
  min-height: 370px;
  width: 100%;
  margin-bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: end;

  .rating {
    .imbd-rating {
      color: $gray;
      margin-bottom: 2px;
    }

    .stars {
      font-size: 28px;
      font-weight: 600;

      img {
        height: 22px;
        width: 22px;
        display: inline-block;
      }

      span {
        font-weight: 400;
        color: $gray;
      }
    }
  }

  .film-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 0;

    .film-main-info {
      max-width: 560px;

      .film-name {
        font-size: 40px;
        font-family: 'KronaOne', sans-serif;
        font-weight: 700;

        span {
          font-size: 18px;
        }
      }
      .film-description {
        margin: 12px 0;
      }
      .film-tags {
        span {
          display: inline-block;
          margin: 0 20px;
          font-weight: 500;

          &:first-child {
            margin-left: 0;
          }
        }
      }
    }
    .outside-info {
      //margin-top: 100px;

      width: 320px;
      font-weight: 500;

      div {
        margin: 8px 0;

        span {
          color: $gray;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
