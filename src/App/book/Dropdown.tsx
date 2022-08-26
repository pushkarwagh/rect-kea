import { Fragment, useState } from 'react'
import { EuiSuperSelect, EuiText } from '@elastic/eui'
import { useValues } from 'kea'
import { dropbookLogic } from './dropdownlogic'

const BookDropDown = () => {
  const { users } = useValues(dropbookLogic)
  console.log('---users', users)

  const options = [
    {
      value: `${users[0]?.name}`,
      inputDisplay: 'option_four',
      dropdownDisplay: (
        <Fragment>
          <strong>{users[0]?.name}</strong>
          <EuiText size="s" color="subdued">
            <p>{users[0]?.city}</p>
          </EuiText>
        </Fragment>
      ),
    },
    {
      value: `${users[1]?.name}`,
      inputDisplay: 'Option one',
      dropdownDisplay: (
        <Fragment>
          <strong>{users[1]?.name}</strong>
          <EuiText size="s" color="subdued">
            <p>{users[1]?.city}</p>
          </EuiText>
        </Fragment>
      ),
    },
    {
      value: `${users[2]?.name}`,
      inputDisplay: 'Option two',
      dropdownDisplay: (
        <Fragment>
          <strong>{users[2]?.name}</strong>
          <EuiText size="s" color="subdued">
            <p>{users[2]?.city}</p>
          </EuiText>
        </Fragment>
      ),
    },
    {
      value: `${users[3]?.name}`,
      inputDisplay: 'option_three',
      dropdownDisplay: (
        <Fragment>
          <strong>{users[3]?.name}</strong>
          <EuiText size="s" color="subdued">
            <p>{users[3]?.city}</p>
          </EuiText>
        </Fragment>
      ),
    },
  ]

  const [value, setValue] = useState(options[0]?.value)

  const onChange = (value: any) => {
    setValue(value)
  }
  console.log('---value: ', value, '---options', options)

  return <EuiSuperSelect options={options} valueOfSelected={value} onChange={(value) => onChange(value)} />
}

export default BookDropDown
