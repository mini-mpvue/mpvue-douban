import { getBoardData } from '@/utils/api'
import { BOARD_MOVIE_LIST } from '@/store/mutations-type'

const state = {
  boards: [
    // { key: 'top250' },
    // { key: 'us_box' },
    // { key: 'in_theaters' },
    { key: 'coming_soon' }
  ],
  movies: []
}

const mutations = {
  [BOARD_MOVIE_LIST] (state, { boards }) {
    let data
    state.boards = state.boards.map((board, i) => {
      data = boards[i]
      board.title = data.title
      board.movies = data.subjects
      return board
    })
    console.log(state.boards)
    state.movies = state.boards[0].movies
  }
}

const actions = {
  async getBoards ({state, commit}) {
    const tasks = state.boards.map(board => {
      return getBoardData({ board: board.key, page: 1, count: 8 })
    })
    let boards = await Promise.all(tasks)
    commit(BOARD_MOVIE_LIST, { boards })
  }
}

export default {
  state,
  mutations,
  actions
}
