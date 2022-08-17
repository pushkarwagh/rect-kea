import { EuiButton, EuiFlexGroup, EuiSearchBar, EuiSpacer, EuiTableRow, EuiTitle } from '@elastic/eui'
import { useValues } from 'kea'
import { useEffect, useState } from 'react'
import BookCard from './BookCard'
import { bookLogic } from './bookLogic'
import BookModal from './BookModal'
import { BookInfo } from './types'

function Books() {
  const initialQuery = EuiSearchBar.Query.MATCH_ALL
  const { books } = useValues(bookLogic)
  const [searchBook, setSearchBook] = useState<any[]>([])
  const [isAdd, setIsAdd] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleModal = () => {
    setIsModalVisible(!isModalVisible)
    setIsAdd(!isAdd)
  }
  const handleAdd = () => {
    setIsAdd(!isAdd)
    setIsModalVisible(!isModalVisible)
  }

  const onChange = ({ query, error }: any) => {
    if (error) {
      console.log('error', error)
    } else {
      console.log('query', query.text)
      setSearchBook(
        books.filter(
          (s) => s.title.toLowerCase().includes(query.text.trim()) || s.author.toLowerCase().includes(query.text.trim())
        )
      )
    }
  }

  useEffect(() => {
    books && setSearchBook(books)
  }, [books])

  console.log('----- books', books)
  console.log('----- searchbooks', searchBook)

  return (
    <div>
      <EuiTitle size="l">
        <h1 style={{ textAlign: 'center', marginBottom: '10px' }}> Books-Library </h1>
      </EuiTitle>{' '}
      <EuiTableRow style={{ float: 'inherit', marginRight: '50px', display: 'flex' }}>
        <EuiSearchBar
          defaultQuery={initialQuery}
          box={{
            placeholder: 'e.g. Search By Tiltle or Author Name',
          }}
          onChange={onChange}
        />

        <EuiButton color="success" iconType="plus" onClick={handleAdd}>
          {' '}
          ADD{' '}
        </EuiButton>
      </EuiTableRow>
      <EuiSpacer />
      <EuiFlexGroup gutterSize="l" style={{ display: 'table-caption', margin: 'auto', width: '50%' }}>
        {searchBook.slice(0, 20).map((book, index) => {
          return <BookCard bookInfo={book} index={index} key={book.id} />
        })}
      </EuiFlexGroup>
      {isAdd ? <BookModal isAdd={isAdd} handleModal={handleModal} isModalVisible={isModalVisible} /> : ''}
    </div>
  )
}

export default Books
