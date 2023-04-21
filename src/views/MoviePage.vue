<template>
  Movie Page
  {{ movie }}
</template>

<script>
import { getMovies } from '@/api/getMovies'

export default {
  name: 'MoviePage',
  data() {
    return {
      movie: {}
    }
  },
  async mounted() {
    const { response } = await getMovies()
    console.log(response)
    this.movie = response.data.results[this.$route.params.id - 1]

    // this.error = true;
  }
}
</script>

<style></style>
