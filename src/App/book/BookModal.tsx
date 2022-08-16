import {
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiModalHeaderTitle,
  useGeneratedHtmlId,
} from '@elastic/eui'
import BookForm from './BookForm'

type BookInfo = {
  id: number
  author: string
  country: string
  imageLink: string
  language: string
  link: string
  pages: number
  title: string
  year: number
}

interface ModalProps {
  bookDetails?: BookInfo
  isEdit?: boolean
  isAdd?: boolean
  isModalVisible: boolean
  handleModal: () => void
}

const BookModal = (props: ModalProps) => {
  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' })

  const { handleModal, isModalVisible, bookDetails, isEdit, isAdd } = props

  let modal

  if (isModalVisible) {
    modal = (
      <EuiModal onClose={handleModal} initialFocus="[name=popswitch]">
        <EuiModalHeader>
          <EuiModalHeaderTitle>
            <h1>
              {isAdd ? 'Add' : isEdit ? 'Edit' : 'View'} - {isAdd ? '' : `Id:${bookDetails?.id}`}{' '}
            </h1>
          </EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
          <BookForm
            modalFormId={modalFormId}
            det={bookDetails}
            isEdit={isEdit}
            isAdd={isAdd}
            handleModal={handleModal}
          />
        </EuiModalBody>

        {/* <EuiModalFooter>
          <EuiButtonEmpty onClick={handleModal}>Cancel</EuiButtonEmpty>

          {isEdit || isAdd ? (
            <EuiButton type="submit" form={modalFormId} onClick={handleModal} fill>
              Save
            </EuiButton>
          ) : (
            ''
          )}
        </EuiModalFooter> */}
      </EuiModal>
    )
  }
  return <div>{modal}</div>
}
export default BookModal
