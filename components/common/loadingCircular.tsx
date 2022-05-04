import styled from '@emotion/styled';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

const theme = createTheme({
  palette: {
    primary: {
      main: '#C1C6C8',
    },
  },
});

const LodaingCircular: React.FC = () => {
  return (
    <Container>
      <ThemeProvider theme={theme}>
        <CircularProgress size={140} color="primary" thickness={2.6} />
      </ThemeProvider>
    </Container>
  );
};

const Container = styled.div``;

export default LodaingCircular;
