import { useCallback, useEffect, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import Layout from '../../layout/Layout';
import { useDebounce } from '../../hooks/useDebounce';
import axios from 'axios';
import './main-page.css';
import Selection from '../../components/Selection/Selection';
import { sortOptions } from '../../constants/sort-options';
import { sortArray } from '../../utils/sort-array';

const MainPage = () => {
  const [planets, setPlanets] = useState([]);
  const [choosedPlanet, setChoosedPlanet] = useState(null);
  const [sortOption, setSortOption] = useState('none');

  // it should be inside API and sets global state.

  const fetchPlanets = useCallback(
    async (search = '') => {
      const res = await axios(
        `https://swapi.dev/api/planets${search ? '?search=' + search : ''}`,
      );

      const { results } = res?.data;

      const sortedPlanets =
        sortOption === 'none'
          ? results
          : sortArray(results, 'name', sortOption);

      setPlanets(sortedPlanets);
    },
    [sortOption],
  );

  const debouncedSearch = useDebounce((value) => {
    fetchPlanets(value);
  }, 500);

  useEffect(() => {
    fetchPlanets();
  }, [sortOption]);

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

  const handleSortChange = (value) => {
    setSortOption(value);
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
          <Selection
            label='Sort by: '
            options={sortOptions}
            onChange={handleSortChange}
          />
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
