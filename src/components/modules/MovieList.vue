<template>
  <div v-if="isLoading" class="skeleton">
    <div v-for="id in 10" class="skeleton-film-item" :key="id">
      <div class="picture animated"></div>
      <div class="title animated"></div>
      <div class="describe animated"></div>
      <div class="describe animated"></div>
    </div>
  </div>

  <template v-else>
    <div class="list-title">Popular <span>series</span></div>

    <div class="movie-list">
      <div v-for="movie of listMovies" class="movie-item" :key="movie.id">
        <div class="preview-film" @click="redirectToMovie(movie.id)">
          <img :src="movie.poster" />
        </div>
        <div class="text">
          <div class="stars">
            <img src="../../assets/icons/star.svg" alt="star" />
            {{ movie.imdb_rating }} <span>/10</span>
          </div>
          <div class="film-name">{{ movie.title }}</div>
        </div>
      </div>
      <div class="movie-item more-movies" @click="handleMoreMovies">
        <div class="more-movies-inner">
          +
          <div>more movies</div>
        </div>
      </div>
    </div>
  </template>
</template>

<script>
import { getMovies } from '@/api/getMovies'

export default {
  name: 'MovieList',
  data() {
    return {
      listMovies: [],
      isLoading: true,
      error: false,

      currentPage: 0
    }
  },
  methods: {
    redirectToMovie(id) {
      this.$router.push(`/api/v1/movies/${id}`)
    },
    async handleMoreMovies() {
      this.currentPage += 1
      const { response } = await getMovies(this.currentPage)
      this.listMovies = [...this.listMovies, ...response.data.results]
    }
  },
  mounted() {
    setTimeout(async () => {
      const { response, error } = await getMovies()
      if (error) {
        this.error = true
      } else {
        console.log(response)
        this.listMovies = response.data.results
      }
      this.isLoading = false
      // this.error = true;
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.skeleton {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 60px;

  .animated {
    opacity: 1; /* Начальный цвет */
    animation: 1s linear infinite alternate-reverse color-cycle; /* Анимация циклической смены цветов */
  }

  @keyframes color-cycle {
    0% {
      opacity: 1; /* Начальный цвет */
    }
    100% {
      opacity: 0.7; /* Начальный цвет */
    }
  }

  &-film-item {
    margin-bottom: 16px;

    .picture {
      height: 215px;
      width: 163px;
      margin: 0 5px;
      margin-bottom: 12px;
      background-color: #303030;
    }

    .title {
      height: 22px;
      width: 45%;
      margin: 0 5px;
      margin-bottom: 8px;
      background-color: #3d3d3d;
    }

    .describe {
      height: 22px;
      width: 80%;
      margin: 0 5px;
      margin-bottom: 4px;
      background-color: #4d4d4d;

      &:last-child {
        margin-bottom: 0;
        width: 60%;
      }
    }
  }
}

.list-title {
  font-weight: 700;
  font-size: 24px;
  padding-top: 40px;

  span {
    color: rgba(218, 22, 23, 1);
  }
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 21px;

  .more-movies {
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 3px;
    text-align: center;
    height: 265px !important;

    &-inner {
      padding-top: 110px;
    }
  }

  .movie-item {
    display: flex;
    flex-direction: column;
    justify-content: start;
    height: 290px;
    min-width: 163px;
    width: 163px;
    margin: 0 5px;
    margin-bottom: 25px;

    @media (min-width: 400px) and (max-width: 900px) {
      width: 22%;
      //margin: 0 1%;
      margin-bottom: 25px;
    }

    .preview-film {
      > img {
        width: 100%;
        height: 215px;
      }
    }

    .text {
      margin-top: 14px;
      width: 100%;
      text-align: left;
      font-size: 18px;

      .stars {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 3px;

        img {
          height: 14px;
          width: 14px;
          display: inline-block;
        }

        span {
          font-weight: 400;
          font-size: 12px;
        }
      }

      .film-name {
        font-weight: 600;
      }
    }
  }
}
</style>
