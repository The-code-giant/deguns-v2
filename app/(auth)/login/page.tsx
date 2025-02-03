'use client'
import React from 'react';
import Button from '@/components/buttons/Button';
import useStore from '@/store';
import { modelTypes } from '@/store/slices/modal-slice';
// import FlexBox from '../component/FlexBox';
// import Login from '../component/sessions/Login';
import FlexBox from '@/components/ui/flexbox';

const LoginPage = () => {
  const { openModal } = useStore();
  return (
    <FlexBox
      direction="col"
      className="min-h-screen"
      items="center"
      justify="center"
    >
      <h2>Login</h2>
      <Button
        onClick={() => openModal(modelTypes.LOGIN_VIEW)}
      >Login</Button>
    </FlexBox>
  );
};

export default LoginPage;
