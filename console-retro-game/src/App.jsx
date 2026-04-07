import { useEffect, useState } from 'react';
import './App.css';
import LeftControl from './components/LeftControl';
import RightControl from './components/RightControl';
import Screen from './components/Screen';
import useFetch from './hooks/useFetch';

function App() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';
  const { data, loading, error } = useFetch(url);

  const [pokemones, setPokemones] = useState([]);
  const getListPokemones = () => {
    const list = data?.results?.filter((p) => p.url);
    const plist = list?.map((l) => fetch(l.url).then((res) => res.json()));
    Promise.all(plist).then((values) => {
      console.log('promesa values', values);
      setPokemones(values);
    });
  };

  useEffect(() => {
    getListPokemones();
  }, [data]);

  return (
    <div className="flex">
      <h1 className="text-3xl font-bold underline"></h1>
      <LeftControl />
      <Screen pokemones={pokemones} />
      <RightControl />
    </div>
  );
}

export default App;