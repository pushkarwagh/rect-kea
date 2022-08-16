import { EuiButton, EuiButtonEmpty, EuiFieldText, EuiForm, EuiFormRow, EuiModalFooter, useEuiBackgroundColor } from '@elastic/eui'
import { useActions } from 'kea'
import { useEffect, useState } from 'react'
import { bookLogic } from './bookLogic'

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

interface FromProps {
  modalFormId: string
  det?: BookInfo
  isEdit?: boolean
  isAdd?: boolean
  handleModal?: () => void
}

function BookForm(props: FromProps) {
  const { editBook, addBook } = useActions(bookLogic)
  const { modalFormId, det, isEdit, isAdd } = props
  const unique_id = localStorage.getItem("id");
  const [state, setState] = useState({
    id: 0,
    title: '',
    author: '',
    country: '',
    language: '',
    pages: 0,
    year: 0,
  })

  useEffect(() => {
    console.log('----det', det)

    if (det !== undefined) {
      setState({
        ...state,
        id: Number(det?.id),
        title: det?.title,
        author: det?.author,
        country: det?.country,
        language: det?.language,
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

  const handleSubmit = (e:any) => {
    e.preventDefault()
    const {  title, author, country, language, pages, year } = state
    if (isEdit) {
      console.log("----modal form",isEdit);      
      editBook(state)
     return  props.handleModal
    }
    if (isAdd) {
      const new_id = Number(unique_id) + 1
      setState({...state, id: new_id})
      console.log("------>",typeof new_id);
      
      if (title !== '' || author !== '' || country !== '' || language !== '' || pages >= 0 || year >= 0) {
         addBook(state)
         return props.handleModal
      } else {
        alert('fields cannot be empty')
      }
    }
    console.log('------submitting')
    // props.handleModal
  }

  console.log('-----stae', state)

  return (
    <>
      <EuiForm id={modalFormId} component="form">
        <EuiFormRow label="Title">
          <EuiFieldText
            name="title"
            value={state.title}
            onChange={(e) => handleChange(e)}
            disabled={isAdd ? false : isEdit ? false : true}
          />
        </EuiFormRow>
        <EuiFormRow label="Author">
          <EuiFieldText
            name="author"
            value={state.author}
            onChange={(e) => handleChange(e)}
            disabled={isAdd ? false : isEdit ? false : true}
          />
        </EuiFormRow>
        <EuiFormRow label="Country">
          <EuiFieldText
            name="country"
            value={state.country}
            onChange={(e) => handleChange(e)}
            disabled={isAdd ? false : isEdit ? false : true}
          />
        </EuiFormRow>
        <EuiFormRow label="Language">
          <EuiFieldText
            name="language"
            value={state.language}
            onChange={(e) => handleChange(e)}
            disabled={isAdd ? false : isEdit ? false : true}
          />
        </EuiFormRow>
        <EuiFormRow label="Pages">
          <EuiFieldText
            name="pages"
            type="number"
            value={state.pages}
            onChange={(e) => handleChange(e)}
            disabled={isAdd ? false : isEdit ? false : true}
          />
        </EuiFormRow>
        <EuiFormRow label="Year">
          <EuiFieldText
            name="year"
            type="number"
            value={state.year}
            onChange={(e) => handleChange(e)}
            disabled={isAdd ? false : isEdit ? false : true}
          />
        </EuiFormRow>
      </EuiForm>

      <EuiModalFooter style={{ marginTop: '10px' }}>
        <EuiButtonEmpty onClick={props.handleModal}>Cancel</EuiButtonEmpty>

        {isEdit || isAdd ? (
          <EuiButton type="submit" form={modalFormId} onClick={(e)=>handleSubmit(e)} fill>
            Save
          </EuiButton>
        ) : (
          ''
        )}
      </EuiModalFooter>
    </>
  )
}

export default BookForm
