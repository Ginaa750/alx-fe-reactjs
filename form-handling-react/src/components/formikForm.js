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
