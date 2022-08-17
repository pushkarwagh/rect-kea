import { EuiButton, EuiFlexGroup, EuiSpacer, EuiTableRow, EuiTitle } from '@elastic/eui'
import { useValues } from 'kea'
import { useState } from 'react'
import BookCard from './BookCard'
import { bookLogic } from './bookLogic'
import BookModal from './BookModal'

function Books() {
  const { books } = useValues(bookLogic)
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

  console.log('----- books', books)

  return (
    <div>
      <EuiTitle size="l">
        <h1 style={{ textAlign: 'center', marginBottom: '10px' }}> Books-Library </h1>
      </EuiTitle>{' '}

      <EuiTableRow style={{ float: 'right', marginRight: '50px' }}>
        <EuiButton color="success" iconType="plus" onClick={handleAdd}>
          {' '}
          ADD{' '}
        </EuiButton>
      </EuiTableRow>
      <EuiSpacer />
      
      <EuiFlexGroup gutterSize="l" style={{ display: 'table-caption', margin: 'auto', width: '50%' }}>
        {books.slice(0, 20).map((book, index) => {
          return <BookCard bookInfo={book} index={index} key={book.id} />
        })}
      </EuiFlexGroup>
      
      {isAdd ? <BookModal isAdd={isAdd} handleModal={handleModal} isModalVisible={isModalVisible} /> : ''}
    </div>
  )
}

export default Books
