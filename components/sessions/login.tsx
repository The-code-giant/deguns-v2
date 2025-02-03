'use client';
// import useCustomer from '@framework/customer/use-customer';
import useStore  from '@/store';

import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import * as yup from 'yup';
import FlexBox from '@/components/ui/flexbox';
import Typography, { H3, H5, H6, SemiSpan } from '@/components/ui/typography';
import Button from '../buttons/Button';
// import IconButton from '../buttons/IconButton';
// import Icon from '../icon/Icon';
import TextField from '../text-field/TextField';
// import { StyledSessionCard } from './SessionStyle';
import axios from 'axios';

const Login: React.FC = () => {
    const { displayModal, modalView, customMessage, openModal, closeModal, openModalWithMessage } = useStore();

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [resetMsg, setResetMsg] = useState('');
//   const { mutate } = useCustomer();
  const router = useRouter();
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const [showReset, setShowReset] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const formSchema = yup.object().shape({
    email: yup.string().email('invalid email').required('${path} is required'),
    password: yup.string().when({
      is: () => !showReset,
      then: yup.string().required('${path} is required'),
    }),
  });

  const handleFormSubmit = async (values: typeof initialValues) => {
    // reset password
    if (showReset) {
      try {
        setIsLoading(true);
        await axios.post('/api/auth/reset-password', { email: values.email });
        setResetMsg('Please check your email inbox!');
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post('/api/auth/login', values);

      if (response.data?.errors) {
        setMessage(
          response.data?.errors
            .map((e: any) => 'Incorrect password or username')
            .join('<br/>')
        );
        return;
      }
    //   mutate();
      closeModal()
    
      router.push('/');
    } catch (error: any) {
      if (errors instanceof Array) {
        setMessage(
          errors.map((e: any) => 'incorrect password or username').join('<br/>')
        );
      } else {
        setMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: handleFormSubmit,
      initialValues,
      validationSchema: formSchema,
    });

  return (
    <div mx="0.5rem" my="2rem" boxShadow="large">
      <form className="content" onSubmit={handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link href="/">
            <Image
              src={'/assets/images/logos/deguns_logo_small.png'}
              alt="Deguns.net logo"
              width={200}
              height={38}
            />
          </Link>
        </div>
        <H3 textAlign="center" mt="1rem" mb="0.5rem">
          Welcome To DEGuns
        </H3>
        <H5
          fontWeight="600"
          fontSize="12px"
          color="gray.800"
          textAlign="center"
          mb="2rem"
        >
          {showReset ? 'Reset your password' : 'Log in with email & password'}
        </H5>
        {/* <TextField
          mb="0.75rem"
          name="email"
          placeholder="exmple@mail.com"
          label="Email"
          type="email"
          fullwidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email || ''}
          errorText={touched.email && errors.email}
        /> */}

        {showReset && resetMsg && (
          <Typography color="green" ml="0.25rem" my="0.5rem" as="p">
            {resetMsg}
          </Typography>
        )}

        {!showReset && (
          <>
            {/* <TextField
              mb="1rem"
              name="password"
              placeholder="*********"
              autoComplete="on"
              type={passwordVisibility ? 'text' : 'password'}
              label={showReset ? 'New Password' : 'Password'}
              fullwidth
              endAdornment={
                // <IconButton
                //   size="small"
                //   type="button"
                //   p="0.25rem"
                //   mr="0.25rem"
                //   color={passwordVisibility ? 'gray.700' : 'gray.600'}
                //   onClick={togglePasswordVisibility}
                // >
                //   <Icon variant="small" defaultcolor="currentColor">
                //     {passwordVisibility ? 'eye-alt' : 'eye'}
                //   </Icon>
                // </IconButton>
              }
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password || ''}
              errorText={touched.password && errors.password}
            /> */}

            {message && (
              <Typography color="error.main" ml="0.25rem" my="0.5rem" as="p">
                {message}
              </Typography>
            )}
          </>
        )}

        <Button
          mt="1.25rem"
          mb="1.65rem"
          variant="contained"
          color="primary"
          type="submit"
          fullwidth
          disabled={isLoading}
        >
          {isLoading ? 'Loading' : showReset ? 'Reset Password' : 'Login'}
        </Button>

        <FlexBox justify="center" className="mb-4" >
          {showReset ? (
            <>
              <SemiSpan>Already have an account?</SemiSpan>
              <H6
                ml="0.5rem"
                borderBottom="1px solid"
                borderColor="gray.900"
                className="cursor-pointer"
                onClick={() => setShowReset(false)}
              >
                Login
              </H6>
            </>
          ) : (
            <>
              {' '}
              <SemiSpan>Don’t have account?</SemiSpan>
              <H6
                ml="0.5rem"
                borderBottom="1px solid"
                borderColor="gray.900"
                className="cursor-pointer"
                onClick={() => {
                    closeModal()
                  router.push('/signup');
                }}
              >
                Sign Up
              </H6>
            </>
          )}
        </FlexBox>
      </form>
      {!showReset && (
        <FlexBox justify="center" className='bg-gray-200 py-4' >
          <SemiSpan>Forgot your password?</SemiSpan>
          <H6
            ml="0.5rem"
            borderBottom="1px solid"
            borderColor="gray.900"
            className="cursor-pointer"
            onClick={() => setShowReset(true)}
          >
            Reset It
          </H6>
        </FlexBox>
      )}
    </div>
  );
};

export default Login;
