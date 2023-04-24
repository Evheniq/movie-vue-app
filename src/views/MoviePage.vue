<template>
  <div class="back-button">
    <router-link to="/">
      <img src="@/assets/icons/back-arrow.svg" alt="back">
    </router-link>
  </div>

  <div class="info-block">
    <div class="title">{{ movie.title }}</div>
    <div class="release-year">({{ movie.release_year }})</div>
    <div class="description">{{ movie.description }}</div>
    <div class="tags">
      <span class="tag-group">
        <span class="tag-item" v-for="(genre, index) in movie.genres" :key="genre.id">{{ genre.title }}<span v-if="index !== movie.genres.length - 1">, </span>
        </span>
      </span>
      |
      <span class="tag-group">
        <span class="tag-item">
          {{ movie.mpa_rating }}
        </span>
      </span>
      |
      <span class="tag-group">
        {{ formatFilmDuration(movie.duration) }}
      </span>
    </div>
    <div class="authors">
      <div>
        <span>Director: </span>
        <template v-for="(director, index) in movie.directors" :key="director.id">
          {{ director.first_name }} {{ director.last_name }}<span v-if="index !== movie.directors.length - 1">, </span>
        </template>
      </div>
      <div>
        <span>Writers: </span>
        <template v-for="(writer, index) in movie.writers" :key="writer.id">
          {{ writer.first_name }} {{ writer.last_name }}<span v-if="index !== movie.writers.length - 1">, </span>
        </template>
      </div>
      <div>
        <span>Stars: </span>
        <template v-for="(star, index) in movie.stars" :key="star.id">
          {{ star.first_name }} {{ star.last_name }}<span v-if="index !== movie.stars.length - 1">, </span>
        </template>
      </div>
    </div>
  </div>

  <div class="bottom-bar">
    <div class="bottom-bar-inner">
      <div class="imbdb-rating-block">
        IBDb rating
        <div class="stars-block">
          <img src="@/assets/icons/star.svg" alt="star">
          <span class="rating">{{ movie.imdb_rating }}</span>
          <span class="from-stars">/10</span>
        </div>
      </div>
      <a href="https://www.youtube.com/watch?v=oZn3qSgmLqI&ab_channel=RottenTomatoesTV">
        <ButtonComponent rectangle>
          Watch trailer
        </ButtonComponent>
      </a>
    </div>
  </div>

  <div class="back-img" :style="{ backgroundImage: `url(${movie.bg_picture})` }">
    <div class="shadow"></div>
  </div>
</template>

<script>
import { getMovies } from '@/api/getMovies'
import {formatFilmDuration} from "../components/helpers/formatFilmDuration.js";
import ButtonComponent from "@/components/UI/ButtonComponent.vue";

export default {
  name: 'MoviePage',
  components: {ButtonComponent},
  methods: {formatFilmDuration},
  data() {
    return {
      movie: {}
    }
  },
  async mounted() {
    // Get movie info
    const moviePage = Math.floor(this.$route.params.id / 8)
    const { response } = await getMovies(moviePage)

    if (!response || this.$route.params.id > response.data.total) {
      this.$router.push('/error')
    }

    this.movie = response.data.results.filter(movie => {
      return this.$route.params.id === String(movie.id)
    })[0]

    // Create parallax effect for shadow
    // const shadow = ref('shadow') // not working
    const shadow = document.querySelector('.shadow');

    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      shadow.style.background = `linear-gradient(
        180deg,
        rgba(22, 22, 22, ${ scrollPosition / window.outerHeight * 2 }) 10%,
        rgba(22, 22, 22, 1) ${ 100 - (scrollPosition / window.outerHeight) * 2.2 * 100 }%
      )`;
    });

    // this.error = true;
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";

.back-button{
  position: fixed;
  top: 34px;
  left: 25px;
  z-index: 1;
  cursor: pointer;
}

.info-block{
  margin-top: 500px;
  padding: 0 24px;
  min-height: 600px;

  .title{
    font-size: 28px;
    font-family: 'KronaOne', sans-serif;
    line-height: 35px;
    font-weight: 400;
  }

  .release-year{
    font-weight: 700;
    font-size: 18px;
  }

  .description {
    margin: 24px 0;
    line-height: 140%;
  }

  .tags {
    margin: 24px 0;
    font-weight: 500;
    color: #A6A6A6;

    .tag-group{
      margin: 0 7px;
      color: $white;

      &:first-child{
        margin-left: 0;
      }
    }
  }

  .authors{
    div {
      margin: 8px 0;
      line-height: 140%;
      font-weight: 500;

      span {
        font-weight: 400;
      }
    }
  }
}

.back-img{
  height: 570px;
  width: 100%;
  top: 0;
  z-index: -1;

  position: fixed;
  background-position: center;
  background-size: cover;

  .shadow{
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(22, 22, 22, 0) 10%, rgba(22, 22, 22, 1) 100%);
  }
}

.bottom-bar{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100px;
  background: #161616;

  &-inner{
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
  }

  .imbdb-rating-block{
    display: flex;

    flex-wrap: wrap;
    flex-direction: column;
    align-items: start;
    color: #E2E2E2;
    font-weight: 700;

    .stars-block{
      display: flex;
      align-items: center;
      margin-top: 5px;

      img{
        width: 20px;
        height: 20px;
        margin-right: 7px;
      }

      .rating{
        font-weight: 500;
        font-size: 28px;
        line-height: 33px;
      }

      .from-stars{
        font-size: 16px;
        line-height: 19px;
        color: #bcbcbc;
        padding-top: 10px;
        font-weight: 400;
      }
    }
  }
}
</style>
