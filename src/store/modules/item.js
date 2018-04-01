import { getMovieData } from '@/utils/api'
import { MOVIE_DETAIL, CLEAR_MOVIE } from '@/store/mutations-type'

const state = {
  movie: {},
  movieDetails: [] // 缓存电影详情数据
}

const mutations = {
  [MOVIE_DETAIL]: (state, { data, match }) => {
    if (!match) {
      data = JSON.parse(data)
      state.movieDetails.unshift(data)
    }
    state.movie = data
  },
  [CLEAR_MOVIE]: (state) => {
    state.movie = {}
  }
}

const actions = {
  async getMovie ({ state, commit }, { id }, cb) {
    const movieDetails = state.movieDetails
    const matchMovies = movieDetails.find(v => v.id === id)
    if (matchMovies) {
      return commit(MOVIE_DETAIL, {
        data: matchMovies,
        match: true
      })
    }
    let movie = await getMovieData(id)
    if (!movie) return
    commit(MOVIE_DETAIL, {
      data: movie,
      match: false
    })
  }
}

export default {
  state,
  mutations,
  actions
}
