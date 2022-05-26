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

const LoadingCircular: React.FC = () => {
  return (
    <Container>
      <ThemeProvider theme={theme}>
        <CircularProgress size={120} color="primary" thickness={2.6} />
      </ThemeProvider>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default LoadingCircular;
