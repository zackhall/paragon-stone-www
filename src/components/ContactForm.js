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
      }}
      validationSchema={ContactFormSchema}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({ "form-name": "contact-page", ...values })
        }).then(() => alert("Success!"))
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
          <div className="columns">
            <div className="column">
              <label htmlFor="message">Message*</label>
              <Field component="textarea" name="message" className="full-width" />
              <div className="has-text-danger"><ErrorMessage name="message" /></div>
            </div>
          </div>
          <button className="button" type="submit">Submit</button>

          {/* <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">From</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control is-expanded">
                  <Field name="name" className="input" placeholder="Full Name" />
                  <ErrorMessage name="name" />
                </p>
              </div>
              <div className="field">
                <p className="control is-expanded">
                  <Field name="email" type="email" className="input" placeholder="E-mail" />
                  <ErrorMessage name="email" />
                </p>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label"></div>
            <div className="field-body">
              <div className="field is-expanded">
                <div className="field has-addons">
                  <p className="control">
                    <a className="button is-static">
                      +1
                    </a>
                  </p>
                  <p className="control is-expanded">
                    <Field name="phone" type="tel" className="input" placeholder="Phone" />
                  </p>
                </div>
              </div>
              <ErrorMessage name="phone" />
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label">
              <label className="label">Details</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control is-expanded">
                  <div className="select" style={{width: '100%'}}>
                    <Field name="role" component="select" placeholder="Your role" style={{width: '100%'}}>
                      <option value="" disabled selected>What's your role?</option>
                      <option value="architect">Architect</option>
                      <option value="builder">Builder</option>
                      <option value="designer">Designer</option>
                      <option value="remodeler">Remodeler</option>
                      <option value="subcontractor">Sub-contractor</option>
                      <option value="homeowner">Homeowner</option>
                    </Field>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control is-expanded">
                  <div className="select" style={{width: '100%'}}>
                    <Field name="referrer" component="select" placeholder="" style={{width: '100%'}}>
                      <option value="" disabled selected>How did you hear about us?</option>
                      <option value="search">Google or Bing</option>
                      <option value="word-of-mouth">Word of Mouth</option>
                      <option value="ads">Advertising</option>
                    </Field>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Message</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <Field component="textarea" name="message" className="textarea" />
                  <ErrorMessage name="message" />
                </div>
              </div>
            </div>
          </div> */}

          {/* <div className="field is-horizontal">
            <div className="field-label">
              <label className="label">How did you hear about us?</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control is-expanded">
                  <div className="select" style={{width: '100%'}}>
                    <Field name="referrer" component="select" placeholder="How did you hear about us?" style={{width: '100%'}}>
                      <option value="search">Google or Bing</option>
                      <option value="word-of-mouth">Word of Mouth</option>
                      <option value="ads">Advertising</option>
                    </Field>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* <div className="field is-horizontal">
            <div className="field-label"></div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <button className="button is-link" type="submit">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </Form>
      )}
    </Formik>
  </div>
)

export default ContactForm