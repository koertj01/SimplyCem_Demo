import { SignIn } from '@clerk/clerk-react';
import { Box } from '@mui/material';

const SignInPage = () => {
  return (
    <div style={{ padding: '20px' }}>

      <Box>
        Login Text
      </Box>
      <SignIn routing="path" path="/signin" />
    </div>
  );
};

export default SignInPage;
