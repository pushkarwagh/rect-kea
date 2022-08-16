import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiLink } from '@elastic/eui'
import { useActions, useValues } from 'kea'
import { useEffect, useState } from 'react'
import { bookLogic } from './bookLogic'
import BookModal from './BookModal'

// type BookInfo = {
//   id: number
//   author: string
//   country: string
//   imageLink: string
//   language: string
//   link: string
//   pages: number
//   title: string
//   year: number
// }

interface footerProps {
  ab: string
  id: number
}

function CardFooterContent(props: footerProps) {
    const [bookDetails, setBookDetails] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)

  const { editBook, deleteBook } = useActions(bookLogic)
  const { books } = useValues(bookLogic)
  const { id } = props

  //   console.log('------->props', props)

  const handleEdit = () => {
    console.log('---. edit')
    setIsEdit(!isEdit)
    setIsModalVisible(!isModalVisible)

    // editBook(props.id, )
  }
  const handleModal = () => setIsModalVisible(!isModalVisible)
  const handleShow = () => {
      setIsEdit(false)
    //   setBookDetails((sb) => (sb = books.find((b) => b.id == id)))
    setIsModalVisible(!isModalVisible)
  }
  useEffect(() => {
      setBookDetails((sb) => (sb = books.find((b) => b.id == id)))
      console.log('-------useEffect', bookDetails)
  }, [])

  return (
    <>
      <EuiFlexGroup justifyContent="spaceEvenly" gutterSize="s" responsive={false} wrap>
        <EuiFlexItem grow={false}>
          <EuiButton color="success" iconType="eye" onClick={handleShow}>
            {' '}
            show{' '}
          </EuiButton>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiButton color="text" onClick={handleEdit}>
            {' '}
            edit{' '}
          </EuiButton>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiButton color="danger" onClick={() => deleteBook(id)}>
            {' '}
            delete{' '}
          </EuiButton>
        </EuiFlexItem>
        {/* </EuiFlexGroup>

        <EuiFlexGroup justifyContent="flexEnd"> */}
        <EuiFlexItem grow={false}>
          <EuiLink href={props.ab} target="_blank">
            <EuiButton> More details... </EuiButton>
          </EuiLink>
        </EuiFlexItem>
      </EuiFlexGroup>
      {isModalVisible ? (
        <BookModal
          isEdit={isEdit}
          bookDetails={bookDetails}
          isModalVisible={isModalVisible}
          handleModal={handleModal}
        />
      ) : (
        ''
      )}
    </>
  )
}

export default CardFooterContent
