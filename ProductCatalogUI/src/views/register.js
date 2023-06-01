import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    gender: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const apiUrl = "https://localhost:7234/api/AuthManagement/Register";
    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      gender: values.gender,
    };
    console.log("VALUES: ", values);
    try {
      const response = await axios.post(apiUrl, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      });

      // Başarılı yanıt durumunda yapılacak işlemler
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      // Hata durumunda yapılacak işlemler
      console.log(error);
    }

    setSubmitting(false);
  };

  const validateForm = (values) => {
    const errors = {};

    // Gerekli alanları kontrol etmek için özel doğrulama işlemleri yapabilirsiniz
    if (!values.username) {
      errors.username = "Kullanıcı adı zorunludur";
    }
    if (!values.email) {
      errors.email = "Mail Zorunludur";
    }
    if (!values.password) {
      errors.password = "Şifre Zorunludur";
    }
    if(values.password){
      if(values.password.length < 8){
        errors.password = "Şifreniz en az 8 karakterden oluşmalı.";
      }
      if(values.password.length >20){
        errors.password = "Şifreniz en fazla 20 karakterden oluşmalı.";
      }
    }
    
    if (!values.firstName) {
      errors.firstName = "İsim Zorunludur";
    }
    if (!values.lastName) {
      errors.lastName = "Soyad Zorunludur";
    }
    if (!values.gender) {
      errors.gender = "Lütfen Seçiniz";
    }

    return errors;
  };

  return (
    <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-white mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-6">Kayıt Ol</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validateForm}
      >
        <Form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-semibold mb-2"
            >
              Kullanıcı Adı
            </label>
            <Field
              type="text"
              id="username"
              name="username"
              className="appearance-none w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:shadow-outline-blue"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              E-mail
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="appearance-none w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:shadow-outline-blue"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Şifre
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="appearance-none w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:shadow-outline-blue"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              İsim
            </label>
            <Field
              type="text"
              id="firstName"
              name="firstName"
              className="appearance-none w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:shadow-outline-blue"
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Soyisim
            </label>
            <Field
              type="text"
              id="lastName"
              name="lastName"
              className="appearance-none w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:shadow-outline-blue"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-gray-700 font-semibold mb-2"
            >
              Cinsiyet
            </label>
            <Field
              as="select"
              id="gender"
              name="gender"
              className="appearance-none w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:shadow-outline-blue"
            >
              <option value="">Lütfen Seçiniz</option>
              <option value="MALE">Erkek</option>
              <option value="FEMALE">Kadın</option>
              <option value="NOT_SPECİFİED">Belirtilmedi</option>
            </Field>
            <ErrorMessage
              name="gender"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-semibold bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            >
              Kayıt Ol
            </button>
          </div>
        </Form>
      </Formik>
      <div className="flex pt-3 justify-center">
        <Link to="/login" className="mr-4 hover:text-blue-700">
          Hesabınız var ise buraya tıklayın
        </Link>
      </div>
    </div>
  );
};

export default Register;
