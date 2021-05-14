import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string().min(3).max(12).required(),
  lastName: yup.string().min(1).max(12).required(),
  email: yup.string().email('Invalid email').required(),
  phoneNumber: yup.number().min(10),
  password: yup.string().required().matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/,
      "Must Contain 10 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
  confirmPassword: yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords must match'),
  gender: yup.string().required(),
  // age: yup.number().positive().integer().required(),
});

const Register = () => {

  const [formData, setFormData] = useState(undefined);

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = data => { console.log(data); setFormData(data)}

  console.log(errors);
  return (
    <div style={{ marginTop: '50px' }}>
      <h1>Register</h1>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" {...register("firstName")}  />
          <p style={{ color: 'red' }}>{errors.firstName?.message}</p>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" {...register("lastName")} />
          <p style={{ color: 'red' }}>{errors.lastName?.message}</p>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" {...register("email")}  />
          <p style={{ color: 'red' }}>{errors.email?.message}</p>
        </Form.Group>

        <h3>Gender</h3>
        <input type="radio" id="male"  {...register("gender")} value="male" />
        <label for="male">Male</label><br />
        <input type="radio" id="female" {...register("gender")} value="female" />
        <label for="female">Female</label><br />
        <input type="radio" id="other" {...register("gender")} value="other" />
        <label for="other">Other</label>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="number" {...register("phoneNumber")}  />
          <p style={{ color: 'red' }}>{errors.phoneNumber?.message}</p>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" {...register("password")}  />
          <p style={{ color: 'red' }}>{errors.password?.message}</p>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" {...register("confirmPassword")}  />
          <p style={{ color: 'red' }}>{errors.confirmPassword?.message}</p>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>      

      <div>
      {(formData!== undefined) ? <h2>Output</h2> : null}
        {(formData !== undefined) ? Object.keys(formData).map((value) => (
          <div>
            <div style={{ textAlign: 'center' }}> 
              <p style={{ display: 'inline-block' }}>{value} : </p>
              <span style={{ display: 'inline-block' }}> {formData[value]}</span>
            </div>
          </div>
        )) : null}
      </div>
    </div>
  )
}

export default Register;