import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { navigate } from 'gatsby'

const ContactFormSchema =
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
    role: Yup.string(),
    message: Yup.string()
      .min(5, 'Message is too short.')
      .required('Message is required.'),
    referrer: Yup.string(),
    city: Yup.string(),
    state: Yup.string()
  })

const encode = (data) => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
}

const ContactForm = () => (
  <div>
    <form name="contact-page" data-netlify="true" netlify-honeypot="bot-field" hidden>
      <input type="text" name="name" />
      <input type="text" name="company" />
      <input type="email" name="email" />
      <input type="tel" name="phone" />
      <select name="role"></select>
      <textarea name="message"></textarea>
      <select name="referrer"></select>
      <div data-netlify-recaptcha="true"></div>
    </form>
    <Formik
      initialValues={{
        name: '',
        company: '',
        email: '',
        phone: '',
        role: '',
        message: '',
        referrer: '',
        city: '',
        state: '',
      }}
      validationSchema={ContactFormSchema}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({ "form-name": "contact-page", ...values })
        }).then(() => navigate('/brochure/thanks'))
          .catch(error => alert(error));
      }}
    >
      {({ errors, touched, handleSubmit }) => (
        <Form
          name="contact"
          onSubmit={handleSubmit}
        >
          <div className="columns">
            <div className="column">
              <h4 className="title is-4 has-margin-bottom-none">About —</h4>
            </div>
          </div>
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
              <label htmlFor="role">What's your role?</label>
              <Field name="role" component="select" placeholder="Your role" className="full-width">
                <option value="" disabled selected>&nbsp;</option>
                <option value="architect">Architect</option>
                <option value="builder">Builder</option>
                <option value="designer">Designer</option>
                <option value="remodeler">Remodeler</option>
                <option value="subcontractor">Sub-contractor</option>
                <option value="homeowner">Homeowner</option>
              </Field>
            </div>
            <div className="column">
              <label htmlFor="referrer">How did you hear about us?</label>
              <Field name="referrer" component="select" placeholder="" className="full-width">
                <option value="" disabled selected>&nbsp;</option>
                <option value="search">Google or Bing</option>
                <option value="word-of-mouth">Word of Mouth</option>
                <option value="ads">Advertising</option>
              </Field>
            </div>
          </div>
          <div className="columns has-margin-bottom-small">
            <div className="column">
              <h4 className="title is-4 has-margin-bottom-small has-margin-top-small">Location —</h4>
              <p><i>Optional.</i> If you'd like to recommendations for the nearest Paragon Stone distributor, please provide your location.</p>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <label htmlFor="city">City</label>
              <Field name="city" type="text" className="full-width" />
            </div>
            <div className="column">
              <label htmlFor="state">State</label>
              <Field name="state" type="text" className="full-width" />
            </div>
          </div>
          <div className="columns has-margin-bottom-small">
            <div className="column">
              <h4 className="title is-4 has-margin-bottom-small has-margin-top-small">Details —</h4>
              <p>Tell us how we can help your business or project.</p>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <label htmlFor="message">Message*</label>
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

export default ContactForm