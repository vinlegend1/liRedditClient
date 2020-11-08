import React from 'react'
import { Form, Formik } from 'formik'
import { Box, Button } from '@chakra-ui/core';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';

// interface loginProps {

// }

const Login: React.FC<{}> = () => {

    const [, login] = useLoginMutation();
    const router = useRouter();

    return (
        <Wrapper variant="small">
        <Formik initialValues={{ username: "", password: "" }} onSubmit={async (values, { setErrors }) => {
            console.log(values);
            const response = await login({ options: values });
            if (response.data?.login.errors) {
                setErrors(toErrorMap(response.data.login.errors))
            } else if (response.data?.login.user) {
                // worked
                router.push('/');
            }
        }}>
            {({isSubmitting}) => (
                <Form>
                    <InputField name='username' placeholder="username" label='Username' />
                    <Box>
                    <InputField type="password" name='password' placeholder="password" label='Password' />
                    </Box>
                    <Button type="submit" variantColor="teal" mt={4} isLoading={isSubmitting} >Login</Button>
                </Form>
            )}
        </Formik> 
        </Wrapper>
    )
}

export default Login
