import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { navigate } from 'gatsby'

const BrochureFormSchema =
  Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('E-mail is required.'),
  })

const encode = (data) => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
}

const BrochureDownloadForm = () => (
  <div>
    <form name="download-brochure" data-netlify="true" netlify-honeypot="bot-field" hidden>
      <input type="email" name="email" />
    </form>
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={BrochureFormSchema}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({ "form-name": "download-brochure", ...values })
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
              <label htmlFor="email">E-mail*</label>
              <Field name="email" type="email" className="full-width" />
              <div className="has-text-danger"><ErrorMessage name="email" /></div>
            </div>
            <div className="column">
              {/* Empty label for spacing. */}
              <label>&nbsp;</label>
              <button
                className="button"
                type="submit"
                disabled={Object.keys(touched).length === 0 || (errors && Object.keys(errors).length > 0)}
              >
                Download
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  </div>
)

export default BrochureDownloadForm