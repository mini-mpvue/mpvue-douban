import { getMovieData } from '@/utils/api'
import { ITEM_MOVIE_DETAIL, ITEM_CLEAR_MOVIE } from '@/store/mutations-type'

const state = {
  movie: {},
  movieDetails: [] // 缓存电影详情数据
}

const mutations = {
  [ITEM_MOVIE_DETAIL]: (state, { data, match }) => {
    if (!match) {
      state.movieDetails.unshift(data)
    }
    state.movie = data
  },
  [ITEM_CLEAR_MOVIE]: (state) => {
    state.movie = {}
  }
}

const actions = {
  async getMovie ({ state, commit }, { id }) {
    const movieDetails = state.movieDetails
    const matchMovies = movieDetails.find(v => v.id === id)
    if (matchMovies) {
      return commit(ITEM_MOVIE_DETAIL, {
        data: matchMovies,
        match: true
      })
    }
    let movie = await getMovieData(id)
    if (!movie) return
    commit(ITEM_MOVIE_DETAIL, {
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
