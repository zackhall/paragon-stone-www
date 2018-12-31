import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { navigate } from 'gatsby'

const BrochureFormSchema =
  Yup.object().shape({
    // 'form-name': Yup.string()
    //   .required(),
    name: Yup.string()
      .min(2, 'Name is too short.')
      .max(50, 'Name is too long.')
      .required('Name is required'),
    company: Yup.string(),
    email: Yup.string()
      .email('Invalid email')
      .required('E-mail is required.'),
    phone: Yup.string()
      .matches(/^[(]{0,1}[0-9]{3}[-)]{0,1}[\s]{0,1}[0-9]{3}[\s-]{0,1}[0-9]{4}$/, 'Invalid phone number. Use format XXX-XXX-XXXX.'),
    streetAddressLine1: Yup.string()
      .min(5, 'Street address is too short.')
      .required('Street address is required.'),
    streetAddressLine2: Yup.string(),
    city: Yup.string().required('City is required.'),
    state: Yup.string('State is required.'),
    zipCode: Yup.string('Zip Code is required.'),
    message: Yup.string(),
  })

const encode = (data) => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
}

const BrochureRequestForm = () => (
  <div>
    <form name="request-brochure" data-netlify="true" netlify-honeypot="bot-field" hidden>
      <input type="text" name="name" />
      <input type="text" name="company" />
      <input type="email" name="email" />
      <input type="tel" name="phone" />
      <input type="text" name="streetAddressLine1" />
      <input type="text" name="streetAddressLine2" />
      <input type="text" name="city" />
      <input type="text" name="state" />
      <input type="text" name="zipCode" />
      <textarea name="message"></textarea>
    </form>
    <Formik
      initialValues={{
        name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
        streetAddressLine1: '',
        streetAddressLine2: '',
        city: '',
        state: '',
        zipCode: '',
      }}
      validationSchema={BrochureFormSchema}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({ "form-name": "request-brochure", ...values })
        }).then(() => navigate('/brochure/thanks'))
          .catch(error => alert(error));
      }}
    >
      {({ errors, touched, handleSubmit }) => (
        <Form
          name="brochure"
          onSubmit={handleSubmit}
        >
          <div className="columns">
            <div className="column">
              <label htmlFor="name">First & Last Name*</label>
              <Field name="name" className="full-width" />
              <div className="has-text-danger"><ErrorMessage name="name" /></div>
            </div>
            <div className="column">
              <label htmlFor="company">Company</label>
              <Field name="company" type="text" className="full-width" />
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <label htmlFor="email">E-mail*</label>
              <Field name="email" type="email" className="full-width" />
              <div className="has-text-danger"><ErrorMessage name="email" /></div>
            </div>
            <div className="column">
              <label htmlFor="phone">Phone Number</label>
              <Field name="phone" type="tel" className="full-width" />
              <div className="has-text-danger"><ErrorMessage name="phone" /></div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <label htmlFor="streetAddressLine1">Address*</label>
              <Field name="streetAddressLine1" type="text" className="full-width"></Field>
              <div className="has-text-danger"><ErrorMessage name="streetAddressLine1" /></div>
            </div>
            <div className="column">
              <label htmlFor="streetAddressLine2">Address Line 2 (Apt/Unit)</label>
              <Field name="streetAddressLine2" type="text" className="full-width"></Field>
            </div>
          </div>
          <div className="columns">
            <div className="column is-half">
              <label htmlFor="city">City*</label>
              <Field name="city" type="text" className="full-width" />
            </div>
            <div className="column">
              <label htmlFor="state">State*</label>
              <Field name="state" type="text" className="full-width" />
            </div>
            <div className="column">
              <label htmlFor="zipCode">Zip Code*</label>
              <Field name="zipCode" type="text" className="full-width" />
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <label htmlFor="message">Additional comments or questions</label>
              <Field component="textarea" name="message" className="full-width" />
              <div className="has-text-danger"><ErrorMessage name="message" /></div>
            </div>
          </div>
          <button
            className="button"
            type="submit"
            disabled={Object.keys(touched).length === 0 || (errors && Object.keys(errors).length > 0)}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
)

export default BrochureRequestForm