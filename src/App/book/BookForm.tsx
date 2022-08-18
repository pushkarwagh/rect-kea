import { EuiButton, EuiButtonEmpty, EuiFieldText, EuiForm, EuiFormRow, EuiModalFooter } from '@elastic/eui'
import { useActions } from 'kea'
import { useEffect, useState } from 'react'
import * as yup from 'yup'
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

const formSchema = yup.object().shape({
  title: yup.string().min(3, 'must conatins atleast 3 characters').required('This field is required'),
  author: yup.string().min(3, 'must conatins atleast 3 characters').required('This field is required'),
  country: yup.string().min(3, 'must conatins atleast 3 characters').required('This field is required'),
  language: yup.string().min(3, 'must conatins atleast 3 characters').required('This field is required'),
  pages: yup.number().min(1, 'must contain atleast 1 page').max(5000).required('This field is required'),
  year: yup.number().min(0, 'please enter year of book').required('This field is required'),
})

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

  const [errors, setErrors] = useState({
    title: '',
    author: '',
    country: '',
    language: '',
    pages: '',
    year: '',
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

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const { title, author, country, language, pages, year } = state

    const isFormValid = await formSchema.isValid(state, {
      abortEarly: false,
    })

    if (isFormValid) {
      console.log('---inside valid')
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
      console.log('---out of valid')
    } else {
      // If form is not valid, check which fields are incorrect:
      formSchema.validate(state, { abortEarly: false }).catch((err) => {
        const errors = err.inner.reduce((acc: any, error: any) => {
          return {
            ...acc,
            [error.path]: error.message,
          }
        }, {})

        // Update form errors state:
        setErrors({ ...errors, $set: errors })
        console.log('error', errors)
      })
    }

    // console.log('------submitting')
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      handleSubmit((e: any) => e)
    }
  }, [errors])

  return (
    <>
      <EuiForm id={modalFormId} component="form">
        <EuiFormRow label="Title">
          <EuiFieldText name="title" value={state.title} onChange={(e) => handleChange(e)} disabled={isShow} />
        </EuiFormRow>
        {errors && <p style={{ color: 'red', margin: '10px 0px' }}>{errors.title}</p>}

        <EuiFormRow label="Author">
          <EuiFieldText name="author" value={state.author} onChange={(e) => handleChange(e)} disabled={isShow} />
        </EuiFormRow>
        {errors && <p style={{ color: 'red', margin: '10px 0px' }}>{errors.author}</p>}

        <EuiFormRow label="Country">
          <EuiFieldText name="country" value={state.country} onChange={(e) => handleChange(e)} disabled={isShow} />
        </EuiFormRow>
        {errors && <p style={{ color: 'red', margin: '10px 0px' }}>{errors.country}</p>}

        <EuiFormRow label="Language">
          <EuiFieldText name="language" value={state.language} onChange={(e) => handleChange(e)} disabled={isShow} />
        </EuiFormRow>
        {errors && <p style={{ color: 'red', margin: '10px 0px' }}>{errors.language}</p>}

        <EuiFormRow label="Pages">
          <EuiFieldText
            name="pages"
            type="number"
            value={state.pages}
            onChange={(e) => handleChange(e)}
            disabled={isShow}
          />
        </EuiFormRow>
        {errors && <p style={{ color: 'red', margin: '10px 0px' }}>{errors.pages}</p>}

        <EuiFormRow label="Year">
          <EuiFieldText
            name="year"
            type="number"
            value={state.year}
            onChange={(e) => handleChange(e)}
            disabled={isShow}
          />
        </EuiFormRow>
        {errors && <p style={{ color: 'red', margin: '10px 0px' }}>{errors.year}</p>}

        <EuiModalFooter style={{ marginTop: '10px' }}>
          <EuiButtonEmpty color="danger" onClick={props.handleModal}>
            Cancel
          </EuiButtonEmpty>

          {!isShow ? (
            <EuiButton color="success" type="submit" form={modalFormId} onClick={(e) => handleSubmit(e)} fill>
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
