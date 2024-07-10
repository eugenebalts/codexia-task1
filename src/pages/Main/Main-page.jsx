import { useCallback, useEffect, useState, useRef } from 'react';
import Modal from '../../components/Modal/Modal';
import Layout from '../../layout/Layout';
import { useDebounce } from '../../hooks/useDebounce';
import axios from 'axios';
import './main-page.css';
import Selection from '../../components/Selection/Selection';
import { sortOptions } from '../../constants/sort-options';
import { sortArray } from '../../utils/sort-array';
import planetsApi from '../../services/endpoints/planets';

const MainPage = () => {
  const [planets, setPlanets] = useState([]);
  const [choosedPlanet, setChoosedPlanet] = useState(null);
  const [sortOption, setSortOption] = useState('none');
  const [forceUpdate, setForceUpdate] = useState(0);
  const searchRef = useRef('');

  const fetchPlanets = useCallback(
    async (search = '') => {
      const fetchedPlanets = await planetsApi.getPeople(search);

      const sortedPlanets =
        sortOption === 'none'
          ? fetchedPlanets
          : sortArray(fetchedPlanets, 'name', sortOption);

      setPlanets(sortedPlanets);
    },
    [sortOption, forceUpdate],
  );

  const debouncedSearch = useCallback(
    useDebounce(() => {
      setForceUpdate((prev) => prev + 1);
    }, 500),
    [],
  );

  useEffect(() => {
    fetchPlanets(searchRef.current);
  }, [fetchPlanets]);

  const handleOpenModal = (planet) => {
    setChoosedPlanet(planet);
  };

  const handleCloseModal = () => {
    setChoosedPlanet(null);
  };

  const handleUpdateSearch = (event) => {
    const { value } = event.target;

    searchRef.current = value;
    debouncedSearch();
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  return (
    <Layout>
      <div className='main-page'>
        <Modal onClose={handleCloseModal} isOpen={!!choosedPlanet}>
          <p>Name: {choosedPlanet?.name ?? 'condit rendering solves this'}</p>
          <p>
            Terrain: {choosedPlanet?.terrain ?? 'condit rendering solves this'}
          </p>
        </Modal>
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
