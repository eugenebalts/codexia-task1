import { useEffect, useState } from 'react';
import Container from '../Container/Container';
import './footer.css';

const Footer = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = (event) => {
      const { innerWidth, innerHeight } = event.target;

      setWindowSize({ width: innerWidth, height: innerHeight });
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
          <p>Width: {windowSize.width}px</p>
          <p>Height: {windowSize.height}px</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
