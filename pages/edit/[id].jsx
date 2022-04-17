import { useRouter } from 'next/router'

import { Form, Field } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import * as phonesSlice from '../../store/slices/phonesSlice'

const Edit = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const phones = useSelector(phonesSlice.selectPhones)
  const isSubmitting = useSelector(phonesSlice.selectIsSubmitting)
  const currentPhone = phones.find(p => p.id === parseInt(router.query.id))

  const onSubmit = phone => {
    dispatch(phonesSlice.edit(phone))
  }

  const required = value => (value ? undefined : 'Required')
  const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
  const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined)


  return (
    <div className='container-lg mt-5'>
      <h1 className='display-6'>Edit number for sale</h1>
      <Form
        onSubmit={onSubmit}
        initialValues={currentPhone}
        render={({ handleSubmit, submitting, pristine, invalid }) => (
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <Field
                name="value"
                component="input"
                type="text"
                placeholder="Phone number"
                validate={required}
              >
                {({ input, meta }) => (
                  <div>
                    <label htmlFor='value'>Phone number</label>
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
            <div className='mb-4'>
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
            <div className='mb-4'>
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
            <div className='mb-4'>
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
                Submit
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
  )
}

export default Edit
