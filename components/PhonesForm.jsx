import * as validators from '../lib/validators'
import classes from './PhonesForm.module.css'
import Layout from './Layout'
import { FORM_ERROR } from 'final-form'
import { Form, Field } from 'react-final-form'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const ignore = () => {}

const phoneNumberField = () => {
  return (
    <div className={`${classes.responsiveWidth} mt-3 mb-4`}>
      <Field
        name='value'
        component='input'
        type='text'
        placeholder='Phone number'
        validate={validators.required}
      >
        {({ input, meta }) => (
          <div>
            <label htmlFor='phone'>Phone number</label>
            <input
              {...input}
              id='phone'
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
    <div className={`${classes.responsiveWidth} mb-4`}>
      <Field
        name='monthyPrice'
        component='input'
        type='text'
        placeholder='Monthly Price'
        validate={validators.compose(validators.required, validators.mustBeNumber)}
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
    <div className={`${classes.responsiveWidth} mb-4`}>
      <Field
        name='setupPrice'
        component='input'
        type='text'
        placeholder='Setup Price'
        validate={validators.compose(validators.required, validators.mustBeNumber)}
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
    <div className={`${classes.responsiveWidth} mb-4`}>
      <Field
        name='currency'
        component='input'
        type='text'
        placeholder='Price currency'
        validate={validators.required}
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

export default function PhonesForm({ initialValues, action, title }) {
  const router = useRouter()
  const dispatch = useDispatch()

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

  return (
    <Layout>
      <h1 className='display-6'>{`${title} number for sale`}</h1>

      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
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
                <div className={`${classes.responsiveWidth} d-flex justify-content-between`}>
                  {form.submitting ? (
                    <button className='btn btn-primary' type='button' disabled>
                      <span
                        className='spinner-border spinner-border-sm'
                        role='status'
                        aria-hidden='true'
                      ></span>
                      <span className='visually-hidden'>Loading submission...</span>
                    </button>
                  ) : (
                    <button
                      type='submit'
                      className='btn btn-primary'
                      disabled={form.submitting || form.pristine || form.hasValidationErrors}
                    >
                      {title}
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
