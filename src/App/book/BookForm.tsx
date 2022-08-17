import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiModalFooter,
} from '@elastic/eui'
import { useActions } from 'kea'
import { useEffect, useState } from 'react'
import { bookLogic } from './bookLogic'
import { BookInfo } from './types'

interface FromProps {
  modalFormId: string
  det?: BookInfo
  isEdit?: boolean
  isShow?: boolean
  isAdd?: boolean
  handleModal?: (() => unknown) | undefined
}

function BookForm(props: FromProps) {
  const { handleModal } = props
  const { editBook, addBook } = useActions(bookLogic)
  const { modalFormId, det, isEdit, isAdd, isShow } = props
  const [state, setState] = useState({
    id: 0,
    title: '',
    author: '',
    country: '',
    imageLink: '',
    language: '',
    link: 'https://keajs.org/docs/',
    pages: 0,
    year: 0,
  })

  useEffect(() => {
    // console.log('----det', det)

    if (det !== undefined) {
      setState({
        ...state,
        id: Number(det?.id),
        title: det?.title,
        author: det?.author,
        country: det?.country,
        imageLink: det?.imageLink,
        language: det?.language,
        link: det?.link,
        pages: Number(det?.pages),
        year: Number(det?.year),
      })
    }
  }, [])

  const handleChange = (e: any) => {
    e.preventDefault()
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { title, author, country, language, pages, year } = state

    if (isEdit) {
      console.log('----modal form', isEdit, state)
      editBook(state)
      handleModal?.()
    }

    if (isAdd) {
      const new_id = Math.floor(Math.random() * 100) + 11
      // setState({...state, id: new_id})
      console.log('------>', state, new_id)

      if (title !== '' || author !== '' || country !== '' || language !== '' || pages >= 0 || year >= 0) {
        addBook({ ...state, id: new_id })
        handleModal?.()
      } else {
        alert('fields cannot be empty')
      }
    }
    // console.log('------submitting')
  }

  return (
    <>
      <EuiForm id={modalFormId} component="form">
        <EuiFormRow label="Title">
          <EuiFieldText name="title" value={state.title} onChange={(e) => handleChange(e)} disabled={isShow} />
        </EuiFormRow>
        <EuiFormRow label="Author">
          <EuiFieldText name="author" value={state.author} onChange={(e) => handleChange(e)} disabled={isShow} />
        </EuiFormRow>
        <EuiFormRow label="Country">
          <EuiFieldText name="country" value={state.country} onChange={(e) => handleChange(e)} disabled={isShow} />
        </EuiFormRow>
        <EuiFormRow label="Language">
          <EuiFieldText name="language" value={state.language} onChange={(e) => handleChange(e)} disabled={isShow} />
        </EuiFormRow>
        <EuiFormRow label="Pages">
          <EuiFieldText
            name="pages"
            type="number"
            value={state.pages}
            onChange={(e) => handleChange(e)}
            disabled={isShow}
          />
        </EuiFormRow>
        <EuiFormRow label="Year">
          <EuiFieldText
            name="year"
            type="number"
            value={state.year}
            onChange={(e) => handleChange(e)}
            disabled={isShow}
          />
        </EuiFormRow>

        <EuiModalFooter style={{ marginTop: '10px' }}>
          <EuiButtonEmpty  color="danger" onClick={props.handleModal}>Cancel</EuiButtonEmpty>

          {!isShow ? (
            <EuiButton  color="success" type="submit" form={modalFormId} onClick={(e) => handleSubmit(e)} fill>
              Save
            </EuiButton>
          ) : (
            ''
          )}
        </EuiModalFooter>
      </EuiForm>
    </>
  )
}

export default BookForm
