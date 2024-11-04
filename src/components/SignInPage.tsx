import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <SignIn routing="path" path="/signin" />
    </div>
  );
};

export default SignInPage;
