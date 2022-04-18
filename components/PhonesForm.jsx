import { Form, Field } from 'react-final-form'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import * as phonesSlice from '../store/slices/phonesSlice'
import Layout from './Layout'

export default function PhonesForm({ formInitialValues, action, title }) {
  const isSubmitting = useSelector(phonesSlice.selectIsSubmitting)
  const submitError = useSelector(phonesSlice.selectSubmitError)
  const currentPhone = useSelector(phonesSlice.selectCurrentPhone)
  const router = useRouter()
  const dispatch = useDispatch()
  const capitalizedTitle = title[0].toUpperCase() + title.slice(1).toLowerCase()

  const onSubmit = (phone) => {
    dispatch(action(phone))
  }

  const formValues = () => {
    if (capitalizedTitle === 'Edit' && !formInitialValues) {
      return currentPhone
    } else {
      return formInitialValues
    }
  }

  const required = (value) => (value ? undefined : 'Required field')
  const mustBeNumber = (value) => (isNaN(value) ? 'Price must be a number' : undefined)
  const composeValidators =
    (...validators) =>
    (value) =>
      validators.reduce((error, validator) => error || validator(value), undefined)

  useEffect(() => {
    if (router.isReady && capitalizedTitle === 'Edit' && !formInitialValues) {
      dispatch(phonesSlice.find(router.query.id))
    }
  }, [router.isReady])

  return (
    <Layout>
      <h1 className='display-6'>{`${capitalizedTitle} number for sale`}</h1>

      {submitError && (
        <div className='w-50 alert alert-danger text-center'>
          <span>An error has occurred:</span> {submitError.message}
        </div>
      )}

      <Form
        onSubmit={onSubmit}
        initialValues={formValues()}
        render={({ handleSubmit, pristine, invalid, submitSucceeded }) => {
          useEffect(() => {
            if (router.isReady && submitSucceeded) {
              router.back()
            }
          }, [router.isReady, submitSucceeded])

          return (
            <form onSubmit={handleSubmit}>
              <div className='mt-3 mb-4 w-50'>
                <Field
                  name='value'
                  component='input'
                  type='text'
                  placeholder='Phone number'
                  validate={required}
                >
                  {({ input, meta }) => (
                    <div>
                      <label htmlFor='value'>Phone number</label>
                      <input
                        {...input}
                        id='value'
                        type='text'
                        placeholder='Phone number'
                        className={
                          meta.touched && meta.error ? 'form-control is-invalid' : 'form-control'
                        }
                      />
                      {meta.error && meta.touched && (
                        <span className='invalid-feedback'>{meta.error}</span>
                      )}
                    </div>
                  )}
                </Field>
              </div>
              <div className='mb-4 w-50'>
                <Field
                  name='monthyPrice'
                  component='input'
                  type='text'
                  placeholder='Monthly Price'
                  validate={composeValidators(required, mustBeNumber)}
                >
                  {({ input, meta }) => (
                    <div>
                      <label htmlFor='monthlyPrice'>Monthly Price</label>
                      <input
                        {...input}
                        id='monthlyPrice'
                        type='text'
                        placeholder='0.00'
                        className={
                          meta.touched && meta.error ? 'form-control is-invalid' : 'form-control'
                        }
                      />
                      {meta.error && meta.touched && (
                        <span className='invalid-feedback'>{meta.error}</span>
                      )}
                    </div>
                  )}
                </Field>
              </div>
              <div className='mb-4 w-50'>
                <Field
                  name='setupPrice'
                  component='input'
                  type='text'
                  placeholder='Setup Price'
                  validate={composeValidators(required, mustBeNumber)}
                >
                  {({ input, meta }) => (
                    <div>
                      <label htmlFor='setupPrice'>Setup Price</label>
                      <input
                        {...input}
                        id='setupPrice'
                        type='text'
                        placeholder='0.00'
                        className={
                          meta.touched && meta.error ? 'form-control is-invalid' : 'form-control'
                        }
                      />
                      {meta.error && meta.touched && (
                        <span className='invalid-feedback'>{meta.error}</span>
                      )}
                    </div>
                  )}
                </Field>
              </div>
              <div className='mb-4 w-50'>
                <Field
                  name='currency'
                  component='input'
                  type='text'
                  placeholder='Price currency'
                  validate={required}
                >
                  {({ input, meta }) => (
                    <div>
                      <label htmlFor='currency'>Currency</label>
                      <input
                        {...input}
                        id='currency'
                        type='text'
                        placeholder='U$'
                        className={
                          meta.touched && meta.error ? 'form-control is-invalid' : 'form-control'
                        }
                      />
                      {meta.error && meta.touched && (
                        <span className='invalid-feedback'>{meta.error}</span>
                      )}
                    </div>
                  )}
                </Field>
              </div>
              <div className='d-flex justify-content-between w-50'>
                {isSubmitting ? (
                  <button className='btn btn-primary' type='button' disabled>
                    <span
                      className='spinner-border spinner-border-sm'
                      role='status'
                      aria-hidden='true'
                    ></span>
                    <span className='visually-hidden'>Loading...</span>
                  </button>
                ) : (
                  <button
                    type='submit'
                    className='btn btn-primary'
                    disabled={isSubmitting || pristine || invalid}
                  >
                    {capitalizedTitle}
                  </button>
                )}
                <button
                  type='button'
                  onClick={() => router.back()}
                  className='btn btn-secondary '
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          )
        }}
      />
    </Layout>
  )
}
