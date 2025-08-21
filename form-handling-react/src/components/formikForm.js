import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'

const schema = Yup.object({
  username: Yup.string().trim().min(3, 'Min 3 characters').required('Username is required'),
  email: Yup.string().trim().email('Enter a valid email').required('Email is required'),
  password: Yup.string().min(6, 'Min 6 characters').required('Password is required'),
})

export default function FormikForm() {
  const [status, setStatus] = useState({ type: '', message: '' })

  return (
    <div>
      <h2>Registration (Formik + Yup)</h2>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={schema}
        onSubmit={async (values, actions) => {
          setStatus({ type: '', message: '' })
          try {
            const res = await fetch('https://reqres.in/api/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(values),
            })
            if (!res.ok) throw new Error('Failed to register')
            const data = await res.json()
            setStatus({ type: 'success', message: `Registered! ID: ${data.id}` })
            actions.resetForm()
          } catch (err) {
            setStatus({ type: 'error', message: err.message })
          } finally {
            actions.setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="username">Username</label>
              <Field id="username" name="username" />
              <ErrorMessage name="username" component="small" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field id="email" name="email" type="email" />
              <ErrorMessage name="email" component="small" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field id="password" name="password" type="password" />
              <ErrorMessage name="password" component="small" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting…' : 'Register'}
            </button>
            {status.message && <div>{status.message}</div>}
          </Form>
        )}
      </Formik>
    </div>
  )
}
