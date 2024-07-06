import { useCallback, useEffect, useState } from 'react';
import Modal from '../components/Modal/Modal';
import Layout from '../layout/Layout';
import { useDebounce } from '../utils/debounce';
import axios from 'axios';
import './main-page.css';

const MainPage = () => {
  const [planets, setPlanets] = useState([]);
  const [choosedPlanet, setChoosedPlanet] = useState(null);

  // it should be inside API and sets global state.

  const fetchPlanets = useCallback(async (search = '') => {
    const res = await axios(
      `https://swapi.dev/api/planets${search ? '?search=' + search : ''}`,
    );

    const { results } = res?.data;

    setPlanets(results ?? []);
  }, []);

  const debouncedSearch = useDebounce((value) => {
    fetchPlanets(value);
  }, 500);

  useEffect(() => {
    fetchPlanets();
  }, []);

  const handleOpenModal = (planet) => {
    setChoosedPlanet(planet);
  };

  const handleCloseModal = () => {
    setChoosedPlanet(null);
  };

  const handleUpdateSearch = (event) => {
    const { value } = event.target;

    debouncedSearch(value);
  };

  return (
    <Layout>
      <div className='main-page'>
        {choosedPlanet && (
          <Modal onClose={handleCloseModal}>
            <p>Name: {choosedPlanet.name}</p>
            <p>Terrain: {choosedPlanet.terrain}</p>
          </Modal>
        )}
        <input
          className='search'
          type='text'
          placeholder='Search'
          onChange={handleUpdateSearch}
        ></input>
        <div className='cards'>
          <p className='cards__title'>Fetched planets:</p>
          <ul className='cards__list'>
            {planets.map((planet) => (
              <li key={planet.name} onClick={() => handleOpenModal(planet)}>
                {planet.name ?? 'unkown'}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default MainPage;
