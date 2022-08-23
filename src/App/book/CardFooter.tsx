import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiLink } from '@elastic/eui'
import { selectors, useActions, useValues } from 'kea'
import { useEffect, useState } from 'react'
import { bookLogic } from './bookLogic'
import BookModal from './BookModal'
import { BookInfo } from "./types"

interface footerProps {
  nav: string
  id: number
}

function CardFooterContent(props: footerProps) {
  const [bookDetails, setBookDetails] = useState<BookInfo>()
  const [isEdit, setIsEdit] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const { deleteBook } = useActions(bookLogic)
  // const {findById} = useValues(booklogic)
  // use findById instead of books,it returns a single book...
  const { books } = useValues(bookLogic) 
  const { id } = props

  const handleEdit = () => {
    console.log('---. edit')
    // setIsShow(false)
    setIsEdit(true)
    setIsModalVisible(!isModalVisible)
  }

  const handleModal = () => {
    setIsEdit(false)
    setIsShow(false)
    setIsModalVisible(!isModalVisible)
  }

  const handleShow = () => {
    // setIsEdit(false)
    setIsShow(true)
    setIsModalVisible(!isModalVisible)
  }

  useEffect(() => {
    setBookDetails((sb) => (sb = books.find((b) => b.id == id)))
    // or setBookDetils(findById(id))
  }, [handleShow,handleEdit])

  // console.log("------> findbyID",findById(id)); to check values are of correct book. 
  
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

        <EuiFlexItem grow={false}>
          <EuiLink href={props.nav} target="_blank">
            <EuiButton> More details... </EuiButton>
          </EuiLink>
        </EuiFlexItem>

      </EuiFlexGroup>
      {isModalVisible ? (
        <BookModal
          isEdit={isEdit}
          isShow={isShow}
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
