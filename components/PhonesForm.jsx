import { Form, Field } from 'react-final-form'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import * as phonesSlice from '../store/slices/phonesSlice'
import Layout from './Layout'
import { FORM_ERROR } from 'final-form'

const ignore = () => {}

const required = (value) => (value ? undefined : 'Required field')
const mustBeNumber = (value) => (isNaN(value) ? 'Price must be a number' : undefined)

const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce((error, validator) => error || validator(value), undefined)

const phoneNumberField = () => {
  return (
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
              className={meta.touched && meta.error ? 'form-control is-invalid' : 'form-control'}
            />
            {meta.error && meta.touched && <span className='invalid-feedback'>{meta.error}</span>}
          </div>
        )}
      </Field>
    </div>
  )
}

const monthlyPriceField = () => {
  return (
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
              className={meta.touched && meta.error ? 'form-control is-invalid' : 'form-control'}
            />
            {meta.error && meta.touched && <span className='invalid-feedback'>{meta.error}</span>}
          </div>
        )}
      </Field>
    </div>
  )
}

const setupPriceField = () => {
  return (
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
              className={meta.touched && meta.error ? 'form-control is-invalid' : 'form-control'}
            />
            {meta.error && meta.touched && <span className='invalid-feedback'>{meta.error}</span>}
          </div>
        )}
      </Field>
    </div>
  )
}

const currencyField = () => {
  return (
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
              className={meta.touched && meta.error ? 'form-control is-invalid' : 'form-control'}
            />
            {meta.error && meta.touched && <span className='invalid-feedback'>{meta.error}</span>}
          </div>
        )}
      </Field>
    </div>
  )
}

export default function PhonesForm({ formInitialValues, action, title }) {
  const currentPhone = useSelector(phonesSlice.selectCurrentPhone)
  const router = useRouter()
  const dispatch = useDispatch()
  const capitalizedTitle = title[0].toUpperCase() + title.slice(1).toLowerCase()

  const onSubmit = (phone) => {
    return dispatch(action(phone))
      .unwrap()
      .then(ignore)
      .catch((error) => {
        return {
          [FORM_ERROR]: error
        }
      })
  }

  const formValues = () => {
    if (capitalizedTitle === 'Edit' && !formInitialValues) {
      return currentPhone
    } else {
      return formInitialValues
    }
  }

  useEffect(() => {
    if (router.isReady && capitalizedTitle === 'Edit' && !formInitialValues) {
      dispatch(phonesSlice.find(router.query.id))
    }
  }, [router.isReady])

  return (
    <Layout>
      <h1 className='display-6'>{`${capitalizedTitle} number for sale`}</h1>

      <Form
        onSubmit={onSubmit}
        initialValues={formValues()}
        render={(form) => {
          useEffect(() => {
            if (router.isReady && form.submitSucceeded) {
              router.back()
            }
          }, [router.isReady, form.submitSucceeded])

          return (
            <>
              {form.submitError && (
                <div className='w-50 alert alert-danger text-center'>
                  <span>An error has occurred:</span> {form.submitError.message}
                </div>
              )}

              <form onSubmit={form.handleSubmit}>
                {phoneNumberField()}
                {monthlyPriceField()}
                {setupPriceField()}
                {currencyField()}
                <div className='d-flex justify-content-between w-50'>
                  {form.submitting ? (
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
                      disabled={form.submitting || form.pristine || form.hasValidationErrors}
                    >
                      {capitalizedTitle}
                    </button>
                  )}
                  <button
                    type='button'
                    onClick={() => router.back()}
                    className='btn btn-secondary '
                    disabled={form.submitting}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )
        }}
      />
    </Layout>
  )
}
