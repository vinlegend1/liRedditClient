import React from 'react'
import { Form, Formik } from 'formik'
import { Box, Button } from '@chakra-ui/core';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { useMutation } from 'urql';

interface registerProps {

}

const REGISTER_MUTATION = `
mutation Register($username: String!, $password: String!) {
    register(options: { username: $username, password: $password }) {
      errors {
        field
        message
      }
      
      user {
        id
        username
      }
    }
}
`

const Register: React.FC<registerProps> = () => {

    const [, register] = useMutation(REGISTER_MUTATION)

    return (
        <Wrapper variant="small">
        <Formik initialValues={{ username: "", password: "" }} onSubmit={values => {
            console.log(values);
            return register(values);
        }}>
            {({isSubmitting}) => (
                <Form>
                    <InputField name='username' placeholder="username" label='Username' />
                    <Box>
                    <InputField type="password" name='password' placeholder="password" label='Password' />
                    </Box>
                    <Button type="submit" variantColor="teal" mt={4} isLoading={isSubmitting} >Register</Button>
                </Form>
            )}
        </Formik> 
        </Wrapper>
    )
}

export default Register
