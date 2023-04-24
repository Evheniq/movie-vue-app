<template>
  <main>
    <div class="main-inner">
      <movie-info v-if="showOnLaptop && currentFilm" :film-object="currentFilm" />

      <movie-list v-if="!showOnLaptop" />

      <carousel-component
        v-if="showOnLaptop"
        :list-movies="listMovies"
        @selectMovie="handleMovieSelect"
        @moreMovies="handleMoreMovies"
      />
    </div>
    <template v-if="showOnLaptop">
      <transition>
        <img v-if="showImage" :src="currentFilm.bg_picture" alt="bg_picture" />
      </transition>
    </template>

  </main>
</template>

<script>
import { formatFilmDuration } from '@/components/helpers/formatFilmDuration'
import CarouselComponent from '@/components/modules/CarouselComponent.vue'
import MovieInfo from '@/components/modules/MovieInfo.vue'
import MovieList from '@/components/modules/MovieList.vue'
import { getMovies } from '@/api/getMovies'

export default {
  name: 'MainComponent',
  components: { MovieList, MovieInfo, CarouselComponent },
  data() {
    return {
      windowWidth: 0,
      currentFilm: {},
      showImage: true,
      listMovies: [],
      currentPage: 0
    }
  },
  methods: {
    formatFilmDuration,
    handleMovieSelect(movie) {
      this.currentFilm = movie
    },
    handleSize() {
      this.windowWidth = window.outerWidth
    },
    changeImage() {
      this.showImage = false
      setTimeout(() => {
        this.showImage = true
      }, 100) // Wait for fade-out to complete
    },
    async handleMoreMovies() {
      this.currentPage += 1
      const { response } = await getMovies(this.currentPage)
      this.listMovies = [...this.listMovies, ...response.data.results]
    }
  },
  computed: {
    showOnLaptop() {
      return this.windowWidth >= 1152
    }
  },
  watch: {
    currentFilm() {
      this.changeImage()
    }
  },
  async created() {
    const { response } = await getMovies()
    this.listMovies = response.data.results

    this.currentFilm = this.listMovies[0]
  },
  mounted() {
    this.handleSize()
    window.addEventListener('resize', this.handleSize)
  },
  unmounted() {
    // window.removeEventListener('resize', this.handleSize)
  }
}
</script>

<style lang="scss" scoped>
@import './src/assets/scss/variables.scss';

a {
  display: block;
  background: #da1617;
  box-shadow: 2px 2px 4px rgba(61, 61, 61, 0.05);
  border-radius: 2px;
  width: 160px;
  font-weight: 700;
  font-size: 14px;
  padding: 10px 28px 10px 0;

  img {
    display: inline-block;
    margin: 0 14px;
  }
}

main {
  position: relative;
  background: #161616;

  .main-inner {
    position: relative;
    margin: 0 auto;
    padding: 0 10px;
    min-height: 100vh;
  }
}

@media (min-width: 1152px) {
  main {
    background: linear-gradient(
      180deg,
      rgba(22, 22, 22, 0) 0%,
      rgba(22, 22, 22, 0.89) 67.19%,
      #161616 100%
    );

    > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -1;
    }

    .main-inner {
      padding: 0 7%;
      display: flex;
      flex-direction: column;
      justify-content: end;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
