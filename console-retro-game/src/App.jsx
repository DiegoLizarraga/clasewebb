import { useEffect, useState } from 'react';
import './App.css';
import LeftControl from './components/LeftControl';
import RightControl from './components/RightControl';
import Screen from './components/Screen';
import GameScreen from './components/GameScreen'; // Asegúrate de que este archivo exista
import useFetch from './hooks/useFetch';

function App() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';
  const { data, loading, error } = useFetch(url);

  const [pokemones, setPokemones] = useState([]);
  const [position, setposition] = useState(1);
  
  // Estados de selección corregidos
  const [myPokeSelection, setMyPokeSelection] = useState(null);
  const [pcPokeSelection, setPcPokeSelection] = useState(null);

   const getListPokemones = () => {
    const list = data?.results?.filter((p) => p.url);
    const plist = list?.map((l) => fetch(l.url).then((res) => res.json()));
    Promise.all(plist).then((values) => {
      const saniData = values?.map((e) => {
        return {
          name: e.name,
          moves: e.moves.map((e) => {
            return {
              ...e,
              attack: getRandomInt(1, 400),
            };
          }),
          sprites: e.sprites,
        };
      });

      console.log({ saniData });
      setPokemones(values);
    });
  };

  useEffect(() => {
    getListPokemones();
  }, [data]);

  // Lógica de navegación del D-Pad
  const handleDirection = (direction) => {
    if (myPokeSelection) return; // Bloquear navegación si ya estamos en batalla

    if (direction === 'right') {
      setposition((prev) => (prev < 100 ? prev + 1 : prev));
    } else if (direction === 'left') {
      setposition((prev) => (prev > 1 ? prev - 1 : prev));
    } else if (direction === 'down') {
      // Salto de fila (asumiendo 5 columnas aprox)
      setposition((prev) => (prev + 4 <= 100 ? prev + 4 : prev));
    } else if (direction === 'up') {
      setposition((prev) => (prev - 4 >= 1 ? prev - 4 : prev));
    }
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const computerSelection = () => {
    const rndId = getRandomInt(1, 101);
    const pc = pokemones.find((p) => p.id === rndId);
    setPcPokeSelection(pc);
  };

  // Manejar botones A y B
  const handleSelection = (button) => {
    if (button === 'A') {
      // Si no hay selección, seleccionamos el actual
      if (!myPokeSelection) {
        const selected = pokemones.find((p) => p.id === position);
        if (selected) {
          setMyPokeSelection(selected);
          computerSelection(); // La PC elige rival
        }
      }
    }
    
    if (button === 'B') {
      // Regresar a la lista de selección
      setMyPokeSelection(null);
      setPcPokeSelection(null);
    }
  };

  return (
    <div className="flex justify-center pt-10 items-center bg-zinc-900 min-h-screen">
      {/* Control Izquierdo */}
      <LeftControl handleDirection={handleDirection} />
      
      {/* Pantalla Central */}
      <div className="mx-2">
        {myPokeSelection && pcPokeSelection ? (
          <GameScreen player={myPokeSelection} computer={pcPokeSelection} />
        ) : (
          <Screen pokemones={pokemones} position={position} />
        )}
      </div>
      
      {/* Control Derecho */}
      <RightControl handleSelection={handleSelection} />
    </div>
  );
}

export default App;