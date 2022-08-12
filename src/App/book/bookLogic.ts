import { actions, kea, path, reducers, listeners, afterMount, beforeUnmount, selectors, key } from 'kea'
import { BooksList } from '../../data2'


import type { bookLogicType } from './bookLogicType'

export const bookLogic = kea<bookLogicType>([
  path(['App', 'book', 'bookLogic']),
  actions({
    addBook: (book) => ({book}),
    deleteBook: (id) => ({id}),
    editBook: (book) => ({book}),
  }),
  reducers({
    books: [
      [],
      {
        addBook: (state,{book}) => [...state, ...book],
        deleteBook: (state, { id }) => state.filter(bk => bk.id !== id),
        editBook: (state,{book}) => state.filter(bk => bk.id === book.id ? book : bk)
      },
    ],
  }),
//   listeners(({ actions }) => ({
//     increment: async (_, breakpoint) => {
//       console.log('inside listener increment?')
//       await breakpoint(1000)
//       // actions.decrement()
//       console.log('after breakpoint increment listener!')
//     },
//     decrement: async (_, breakpoint) => {
//       console.log('inside listener decrement?')
//       await breakpoint(1000)
//       // actions.increment()
//       console.log('after breakpoint decrement listener!')
//     },
//   })),
  afterMount(({ actions, cache }) => {
      console.log("--------mounted");
      actions.addBook(BooksList)
      console.log(BooksList);
      
  }),
  beforeUnmount(({ cache }) => {
    cache.incInterval && window.clearInterval(cache.incInterval)
    cache.decInterval && window.clearInterval(cache.decInterval)
  }),
//   selectors({
//     book: [(s) => [s.books], (books,{ id }) => books.find(bk => bk.id === id)],
//   }),
])
