import { useEffect, useState } from 'react';
import Container from '../Container/Container';
import './footer.css';

const Footer = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = (event) => {
      const { innerWidth, innerHeight } = event.target;

      setWidth(innerWidth);
      setHeight(innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <footer className='footer'>
      <Container>
        <div className='footer__content'>
          <p>Width: {width}px</p>
          <p>Height: {height}px</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
