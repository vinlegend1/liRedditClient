import React from 'react'
import { Form, Formik } from 'formik'
import { Box, Button } from '@chakra-ui/core';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
// import { useMutation } from 'urql';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface registerProps {

}

const Register: React.FC<registerProps> = () => {

    const [, register] = useRegisterMutation();
    const router = useRouter();

    return (
        <Wrapper variant="small">
        <Formik initialValues={{ email: "", username: "", password: "" }} onSubmit={async (values, { setErrors }) => {
            console.log(values);
            const response = await register({ options: values });
            if (response.data?.register.errors) {
                setErrors(toErrorMap(response.data.register.errors))
            } else if (response.data?.register.user) {
                // worked
                router.push('/');
            }
        }}>
            {({isSubmitting}) => (
                <Form>
                    <InputField name='username' placeholder="username" label='Username' />
                    <Box>
                    <InputField type="email" name='email' placeholder="email" label='Email' />
                    </Box>
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

export default withUrqlClient(createUrqlClient)(Register)
