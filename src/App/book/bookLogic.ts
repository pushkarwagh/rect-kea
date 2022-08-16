import { actions, kea, path, reducers, listeners, afterMount, beforeUnmount, selectors, key } from 'kea'
import { BooksList } from '../../data2'

import type { bookLogicType } from './bookLogicType'

export const bookLogic = kea<bookLogicType>([
  path(['App', 'book', 'bookLogic']),
  actions({
    // getBook: (id) => ({ id }),
    addBook: (book) => ({ book }),
    deleteBook: (id) => ({ id }),
    editBook: (book) => ({ book }),
  }),
  reducers({
    books: [
      [],
      {
        addBook: (state, { book }) => [...state,...book],
        deleteBook: (state, { id }) => state.filter((bk) => bk.id !== id),
        editBook: (state, { book }) => state.filter((bk) => (bk.id === book.id ? book : bk)),
      },
    ],
    // singleBook: [
    //   0,
    //   {
    //     getBook: (state, { id }) => id,
    //   },
    // ],
  }),
    listeners(({ actions }) => ({
        addBook: async (_, breakpoint) => {
        console.log('inside listener increment?')
        await breakpoint(1000)
        console.log('after breakpoint increment listener!')
      },
      editBook: async (_, breakpoint) => {
        console.log('inside listener decrement?')
        await breakpoint(1000)
        // actions.increment()
        console.log('after breakpoint decrement listener!')
      },
    })),
  afterMount(({ actions, cache }) => {
    console.log('--------mounted')
    actions.addBook(BooksList)
    localStorage.setItem("id",BooksList.length)
    console.log(BooksList)
  }),
  beforeUnmount(({ actions, cache }) => {
    console.log('--------unmounted')
    // actions.addBook('')
    localStorage.removeItem("id")
    console.log(BooksList)
  }),
//   selectors({
//     book: [(s) => [s.books, s.singleBook],
//     (books, singleBook) => books.find((bk) => bk.id === singleBook)],
//   }),
])
