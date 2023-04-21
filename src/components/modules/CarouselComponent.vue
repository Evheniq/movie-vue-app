<template>
  <carousel
    :items-to-show="7"
    :wrapAround="false"
    :touchDrag="true"
    :snapAlign="'center-even'"
    :mouseDrag="true"
    :transition="500"
    class="film-slider"
    v-model="currentSlide"
    ref="filmCarousel"
  >
    <slide class="film-item fake" style="border: 0" />
    <slide class="film-item" style="border: 0" />

    <slide
      v-for="film in listMovies"
      :key="film.id"
      class="film-item"
      @click="
        () => {
          currentSlide = film.id + 1
        }
      "
    >
      <div class="preview-film">
        <img :src="film.poster" />
      </div>
      <div class="text">
        <div class="stars">
          <img src="../../assets/icons/star.svg" alt="star" />
          {{ film.imdb_rating }} <span>/10</span>
        </div>
        <div class="film-name">{{ film.title }}</div>
      </div>
    </slide>
    <slide class="film-item" @click="handleMoreMovies">
      +
      <div class="more-text">View more</div>
    </slide>

    <slide class="film-item" style="border: 0" />
    <slide class="film-item" style="border: 0" />

    <template #addons>
      <navigation />
    </template>
  </carousel>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

export default {
  name: 'carouselComponent',
  emits: ['selectMovie', 'moreMovies'],
  components: {
    Carousel,
    Slide,
    Navigation
  },
  data() {
    return {
      currentSlide: 5
    }
  },
  props: {
    listMovies: {
      type: Array,
      required: true
    }
  },
  mounted() {
    this.currentSlide = 4
  },
  watch: {
    currentSlide: function (val) {
      this.$emit('selectMovie', this.listMovies[val - 2])
    }
  },
  methods: {
    handleMoreMovies() {
      console.log('++')
      this.$emit('moreMovies')
    }
  }
}
</script>

<style lang="scss">
.carousel__viewport {
  padding: 13px 0px;
}

.carousel__track {
  margin-left: -30px;
}

.carousel__slide--sliding {
  transition: 0.2s;
}

.carousel__slide {
  transform: rotateY(-20deg) scale(0.9);
  margin: 0 3px;
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--active {
  transform: rotateY(0) scale(1.1);
  margin: 0 16px;
}

.carousel {
  button {
    color: #e2e2e2;
    width: 30px;
    height: 30px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 30px;
    margin: 0 50px !important;
  }
}

.film-slider {
  margin-top: 40px;
  margin-bottom: 52px;
  padding: 0 90px;

  .film-item {
    display: flex;
    flex-direction: column;
    height: 260px;

    &.fake {
      display: none;
    }

    .preview-film {
      height: 80%;

      > img {
        width: 170px;
        height: 100%;
        padding-bottom: 5px;
        //display: block;
      }
    }

    .text {
      width: 100%;
      text-align: left;

      .stars {
        font-size: 14px;
        font-weight: 600;

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

    .more-text {
      font-weight: 400;
      font-size: 14px;
    }
  }
}
</style>
