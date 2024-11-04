import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Box, Stack } from "@mui/material";

// todo: Format the header to look like a real app YAY
export default function App() {
  return (
    <header>
      <Stack
          direction="row"
          spacing={2}
      >
        <Box
          sx={{
            border: '1p dashed grey',
            width: '100%',
            // backgroundColor: --mui-palette
          }}
        ></Box>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Stack>
    </header>
  );
}