import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Container from '../components/Container/Container';
import './layout.css';

const Layout = ({ children }) => {
  return (
    <div className='layout'>
      <Header />
      <main className='main'>
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
