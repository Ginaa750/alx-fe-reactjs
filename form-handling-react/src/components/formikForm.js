import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'

const schema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
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
              const data = await res.json()
              setStatus({ type: 'success', message: 'Registration successful!' })
              actions.resetForm()
            } catch (error) {
              setStatus({ type: 'error', message: 'Registration failed. Please try again.' })
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label htmlFor="username">Username</label>
                <Field name="username" type="text" />
                <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Field name="email" type="email" />
                <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" />
                <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
              </div>
              <button type="submit" disabled={isSubmitting}>Register</button>
              {status.message && (
                <div style={{ color: status.type === 'error' ? 'red' : 'green' }}>{status.message}</div>
              )}
            </Form>
          )}
        </Formik>
      </div>
