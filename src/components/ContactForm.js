import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const ContactFormSchema =
  Yup.object().shape({
    // 'form-name': Yup.string()
    //   .required(),
    name: Yup.string()
      .min(2, 'Name is too short.')
      .max(50, 'Name is too long.')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('E-mail is required.'),
    phone: Yup.string(),
    role: Yup.string(),
    message: Yup.string()
      .min(10, 'Message is too short.')
      .required('Message is required.'),
    referrer: Yup.string(),
  })

const encode = (data) => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
}

const ContactForm = () => (
  <div>
    <Formik
      initialValues={{
        name: '',
        email: '',
        phone: '',
        role: '',
        message: '',
        referrer: '',
      }}
      validationSchema={ContactFormSchema}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({ "form-name": "contact", ...values })
        }).then(() => alert("Success!"))
          .catch(error => alert(error));
      }}
    >
      {({ errors, touched, handleSubmit }) => (
        <Form
          name="contact"
          method="POST"
          action="/"
          data-netlify="true"
          onSubmit={handleSubmit}
        >
          {/* <Field name="form-name" type="hidden" /> */}
          <Field name="name" />
          <ErrorMessage name="name" />
          <Field name="email" type="email" />
          <ErrorMessage name="email" />
          <Field name="phone" type="tel" />
          <ErrorMessage name="phone" />
          <Field component="textarea" name="message" />
          <ErrorMessage name="message" />
          <Field name="role" component="select" placeholder="Your role">
            <option value="architect">Architect</option>
            <option value="builder">Builder</option>
            <option value="designer">Designer</option>
            <option value="remodeler">Remodeler</option>
            <option value="subcontractor">Sub-contractor</option>
            <option value="homeowner">Homeowner</option>
          </Field>
          <Field name="referrer" component="select" placeholder="">
            <option value="search">Google or Bing</option>
            <option value="word-of-mouth">Word of Mouth</option>
            <option value="ads">Advertising</option>
          </Field>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
)

export default ContactForm