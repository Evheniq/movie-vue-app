import axios from 'axios'

export async function getMovies(page = 0) {
  let response = null
  let error = false

  try {
    response = await axios.get('https://live.mocat.amifactory.network/api/v1/movies/', {
      params: {
        page
      }
    })
  } catch (e) {
    console.error(e)
    error = Boolean(e)
  }

  return { response, error }
}
