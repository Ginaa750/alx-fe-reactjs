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

  const fieldStyle = { display: 'grid', gap: 6, marginBottom: 12 }
  const inputStyle = {
    padding: '10px 12px',
    borderRadius: 8,
    border: '1px solid #3a4a7a',
    background: '#0f1830',
    color: '#e6ebff',
    outline: 'none',
  }

  return (
    <div style={{ background: '#121c36', padding: 16, borderRadius: 12, border: '1px solid #22315a' }}>
      <h2 style={{ marginTop: 0, marginBottom: 12 }}>Registration (Formik + Yup)</h2>

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
            if (!res.ok) throw new Error('Failed to register. Try again.')
            const data = await res.json()
            setStatus({ type: 'success', message: `Registered! ID: ${data.id}` })
            actions.resetForm()
          } catch (err) {
            setStatus({ type: 'error', message: err.message || 'Network error' })
          } finally {
            actions.setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form noValidate>
            <div style={fieldStyle}>
              <label htmlFor="username">Username</label>
              <Field id="username" name="username" placeholder="e.g. naomi_w" style={inputStyle} autoComplete="username" />
              <ErrorMessage name="username" component="small" style={{ color: '#ff8b8b' }} />
            </div>

            <div style={fieldStyle}>
              <label htmlFor="email">Email</label>
              <Field id="email" name="email" type="email" placeholder="you@example.com" style={inputStyle} autoComplete="email" />
              <ErrorMessage name="email" component="small" style={{ color: '#ff8b8b' }} />
            </div>

            <div style={fieldStyle}>
              <label htmlFor="password">Password</label>
              <Field id="password" name="password" type="password" placeholder="••••••••" style={inputStyle} autoComplete="new-password" />
              <ErrorMessage name="password" component="small" style={{ color: '#ff8b8b' }} />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '10px 12px',
                width: '100%',
                borderRadius: 10,
                background: isSubmitting ? '#2a3b6a' : '#2d61ff',
                color: 'white',
                border: 'none',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                fontWeight: 600,
              }}
            >
              {isSubmitting ? 'Submitting…' : 'Register'}
            </button>

            {status.message && (
              <div
                style={{
                  marginTop: 12,
                  padding: 10,
                  borderRadius: 8,
                  background: status.type === 'success' ? '#13351c' : '#3a1520',
                  border: `1px solid ${status.type === 'success' ? '#2a8a3c' : '#a43d52'}`,
                }}
              >
                {status.message}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}
