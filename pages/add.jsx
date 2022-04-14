import { Form, Field } from 'react-final-form'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import * as phonesSlice from '../store/slices/phonesSlice'

const Add = () => {
  const dispatch = useDispatch()

  const onSubmit = phone => {
    dispatch(phonesSlice.add(phone))
  }

  const required = value => (value ? undefined : 'Required')
  const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
  const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined)


  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="value"
            component="input"
            type="text"
            placeholder="Phone number"
            validate={required}
          >
            {({ input, meta }) => (
              <div>
                <label htmlFor='value'>Value</label>
                <input {...input} id='value' type="text" placeholder="Value" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field
            name="monthlyPrice"
            component="input"
            type="text"
            placeholder="Monthly Price"
            validate={composeValidators(required, mustBeNumber)}
          >
            {({ input, meta }) => (
              <div>
                <label htmlFor='monthlyPrice'>Monthly Price</label>
                <input {...input} id='monthlyPrice' type="text" placeholder="0.00" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field
            name="setupPrice"
            component="input"
            type="text"
            placeholder="Setup Price"
            validate={composeValidators(required, mustBeNumber)}
          >
            {({ input, meta }) => (
              <div>
                <label htmlFor='setupPrice'>Setup Price</label>
                <input {...input} id='setupPrice' type="text" placeholder="0.00" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field
            name="currency"
            component="input"
            type="text"
            placeholder="Price currency"
            validate={required}
          >
            {({ input, meta }) => (
              <div>
                <label htmlFor='currency'>Currency</label>
                <input {...input} id='currency' type="text" placeholder="U$" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <button type="submit" disabled={submitting || pristine}>
            Submit
          </button>
          <div>
            <Link href="/">
              <a> RETURN HOME </a>
            </Link>
          </div>
        </form>
      )}
    />
  )
}

export default Add
