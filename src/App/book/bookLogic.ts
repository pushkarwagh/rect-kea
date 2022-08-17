import { actions, kea, path, reducers, listeners, afterMount, beforeUnmount, selectors } from 'kea'
import { BooksList } from '../../data2'

import type { bookLogicType } from './bookLogicType'

export const bookLogic = kea<bookLogicType>([
  path(['App', 'book', 'bookLogic']),
  actions({
    addBook: (book) => ({ book }),
    deleteBook: (id) => ({ id }),
    editBook: (book) => ({ book }),
  }),
  reducers({
    books: [
      [],
      {
        addBook: (state, { book }) => state.concat(book),
        deleteBook: (state, { id }) => state.filter((bk) => bk.id !== id),
        editBook: (state, { book }) => state.map((bk) => bk.id === book.id ? book : bk),
      },
    ],
  }),
    listeners(({ actions }) => ({
        addBook: async (_, breakpoint) => {
        console.log('inside listener addbook?')
        await breakpoint(100)
        console.log('after breakpoint addbook listener!')
      },
      editBook: async (_, breakpoint) => {
        console.log('inside listener editbook?')
        await breakpoint(100)
        console.log('after breakpoint editbook listener!')
      },
      deleteBook: async (_, breakpoint) => {
        console.log('inside listener deletebook?')
        await breakpoint(100)
        console.log('after breakpoint deletebook listener!')
      },
    })),
  afterMount(({ actions, cache }) => {
    console.log('--------mounted')
    actions.addBook(BooksList)
    console.log(BooksList)
  }),
  beforeUnmount(({ actions, cache }) => {
    console.log('--------unmounted')
    actions.addBook('')
  }),
  // selectors({
  //   findById: [
  //     (selectors) => [selectors.books],
  //     (books:any) => (id: number) => books.find((book:any) => book.id === id),
  //   ],
  // })
])
