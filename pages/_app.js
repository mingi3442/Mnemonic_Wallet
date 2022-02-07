import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { Container, Divider } from "semantic-ui-react";

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <Header />
      <Divider />
      <Component {...pageProps} />
      <Footer />
    </Container>
  );
}

export default MyApp;
