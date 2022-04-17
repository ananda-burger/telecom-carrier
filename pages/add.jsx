import { Form, Field } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import * as phonesSlice from '../store/slices/phonesSlice'
import Layout from '../components/Layout'

const Add = () => {
  const dispatch = useDispatch()
  const isSubmitting = useSelector(phonesSlice.selectIsSubmitting)

  const onSubmit = phone => {
    dispatch(phonesSlice.add(phone))
  }

  const required = value => (value ? undefined : 'Required field')
  const mustBeNumber = value => (isNaN(value) ? 'Price must be a number' : undefined)
  const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined)

  return (
    <Layout >
      <div className='container-lg mt-3'>
        <h1 className='display-6'>New number for sale</h1>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting, pristine, invalid }) => (
            <form onSubmit={handleSubmit}>
              <div className='mb-4 w-50'>
                <Field
                  name="value"
                  component="input"
                  type="text"
                  placeholder="Phone number"
                  validate={required}
                >
                  {({ input, meta }) => (
                    <div>
                      <label htmlFor='value' className='form-label mb-1'>Phone number</label>
                      <input {...input}
                        id='value'
                        type="text"
                        placeholder="Phone number"
                        className={meta.touched && meta.error ? 'form-control is-invalid' : 'form-control'}
                      />
                      {meta.error && meta.touched && <span className='invalid-feedback'>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className='mb-4 w-50'>
                <Field
                  name="monthlyPrice"
                  component="input"
                  type="text"
                  placeholder="Monthly Price"
                  validate={composeValidators(required, mustBeNumber)}
                >
                  {({ input, meta }) => (
                    <div>
                      <label htmlFor='monthlyPrice' className='form-label mb-1'>Monthly Price</label>
                      <input {...input}
                        id='monthlyPrice'
                        type="text"
                        placeholder="0.00"
                        className={meta.touched && meta.error ? 'form-control is-invalid' : 'form-control'}
                      />
                      {meta.error && meta.touched && <span className='invalid-feedback'>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className='mb-4 w-50'>
                <Field
                  name="setupPrice"
                  component="input"
                  type="text"
                  placeholder="Setup Price"
                  validate={composeValidators(required, mustBeNumber)}
                >
                  {({ input, meta }) => (
                    <div>
                      <label htmlFor='setupPrice' className='form-label mb-1'>Setup Price</label>
                      <input {...input}
                        id='setupPrice'
                        type="text"
                        placeholder="0.00"
                        className={meta.touched && meta.error ? 'form-control is-invalid' : 'form-control'}
                      />
                      {meta.error && meta.touched && <span className='invalid-feedback'>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className='mb-4 w-50'>
                <Field
                  name="currency"
                  component="input"
                  type="text"
                  placeholder="Price currency"
                  validate={required}
                >
                  {({ input, meta }) => (
                    <div>
                      <label htmlFor='currency' className='form-label mb-1'>Currency</label>
                      <input {...input}
                        id='currency'
                        type="text"
                        placeholder="U$"
                        className={meta.touched && meta.error ? 'form-control is-invalid' : 'form-control'}
                      />
                      {meta.error && meta.touched && <span className='invalid-feedback'>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              {isSubmitting ? (
                <button className="btn btn-primary" type="button" disabled>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className="visually-hidden">Loading...</span>
                </button>
              ) : (
                <button type="submit" className='btn btn-primary' disabled={submitting || pristine || invalid}>
                  Add
                </button>
              )}
              <div className='mt-5'>
                <Link href="/">
                  <a> RETURN HOME </a>
                </Link>
              </div>
            </form>
          )}
        />
      </div>
    </Layout>
  )
}

export default Add
