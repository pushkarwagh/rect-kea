import { EuiModal, EuiModalBody, EuiModalHeader, EuiModalHeaderTitle, useGeneratedHtmlId } from '@elastic/eui'
import BookForm from './BookForm'
import { BookInfo } from './types'

interface ModalProps {
  bookDetails?: BookInfo
  isEdit?: boolean
  isShow?: boolean
  isAdd?: boolean
  isModalVisible: boolean
  handleModal: () => unknown
}

const BookModal = (props: ModalProps) => {
  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' })

  const { handleModal, isModalVisible, bookDetails, isEdit, isAdd, isShow } = props

  const formSample = (
    <BookForm
      modalFormId={modalFormId}
      det={bookDetails}
      isEdit={isEdit}
      isShow={isShow}
      isAdd={isAdd}
      handleModal={handleModal}
    />
  )

  let modal

  if (isModalVisible) {
    modal = (
      <EuiModal onClose={handleModal} initialFocus="[name=popswitch]">
        <EuiModalHeader>
          <EuiModalHeaderTitle>
            <h1>
              <i>Book_Details</i> - <small>{isAdd && !isEdit && !isShow ? ':' : `Id:${bookDetails?.id}`} </small>
            </h1>
          </EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody> { formSample } </EuiModalBody>
      </EuiModal>
    )
  }
  return <div>{modal}</div>
}
export default BookModal
