import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const apiUrl = 'https://localhost:7234/api/AuthManagement/Login';
    const data = {
      email: values.email,
      password: values.password,

    };
    
    const response = await axios.post(apiUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    }).then(response => {
      console.log(response.data.token.accessToken);
      localStorage.setItem('accessToken', response.data.token.accessToken);//localStorage
      localStorage.setItem('userId', response.data.userId);
      navigate("/girisHomePage");
    }).catch(error =>{
      // Hata durumunda yapılacak işlemler
      alert("Mail veya Şifre Hatası!!")
    console.log(error);
  });









  setSubmitting(false);
};

const validateForm = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'E-mail zorunludur';
  }

  if (!values.password) {
    errors.password = 'Şifre zorunludur';
  }
  

  return errors;
};
return (
  <div className="min-h-screen bg-gray-100 flex justify-center items-center">
    <div className="bg-white p-10 rounded shadow-md w-full sm:w-1/2 lg:w-1/3">
      <h2 className="text-2xl font-bold mb-10 text-center">Giriş Yap</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validateForm}
      >
        <Form>
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="email">
              E-mail
            </label>
            <Field
              className="border w-full p-2 rounded"
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
            />
            <ErrorMessage name="email" component="div" className="text-red-500" />
          </div>

          <div className="mb-6">
            <label className="block font-bold mb-2" htmlFor="password">
              Şifre
            </label>
            <Field
              className="border w-full p-2 rounded"
              type="password"
              id="password"
              name="password"
              placeholder="*************"
            />
            <ErrorMessage name="password" component="div" className="text-red-500" />
          </div>

          <div className="flex justify-center">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              type="submit"
            >
              Giriş Yap
            </button>
          </div>
        </Form>
      </Formik>
      <div className="flex pt-3 justify-center">
        <Link to="/register" className="mr-4 hover:text-blue-700">
          Kayıt olmadıysanız, buraya tıklayın.
        </Link>
      </div>
    </div>
  </div>
);
}

export default Login;