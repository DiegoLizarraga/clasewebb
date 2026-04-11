import { useEffect, useState } from 'react';
import './App.css';
import LeftControl from './components/LeftControl';
import RightControl from './components/RightControl';
import Screen from './components/Screen';
import GameScreen from './components/GameScreen'; 
import useFetch from './hooks/useFetch';
import PokemonDetail from './components/PokemonDetail';

function App() {
  // 1. CONFIGURACIÓN Y HOOKS
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';
  const { data, loading, error } = useFetch(url);

  // 2. ESTADOS (STATE)
  const [pokemones, setPokemones] = useState([]);      // Lista completa de Pokémon
  const [position, setposition] = useState(1);         // ID del Pokémon resaltado actualmente
  const [myPokeSelection, setMyPokeSelection] = useState(null); // Tu Pokémon elegido
  const [pcPokeSelection, setPcPokeSelection] = useState(null); // El contrincante (PC)

  // 3. LÓGICA DE DATOS (FETCHING)
  const getListPokemones = () => {
    const list = data?.results?.filter((p) => p.url);
    const plist = list?.map((l) => fetch(l.url).then((res) => res.json()));
    
    Promise.all(plist).then((values) => {
      // "Limpiamos" y enriquecemos la data con ataques aleatorios
      const saniData = values?.map((e) => {
        return {
          ...e, // Mantenemos los datos originales (id, name, sprites)
          moves: e.moves.map((m) => ({
            ...m,
            attack: getRandomInt(1, 400), // Añadimos daño personalizado
          })),
        };
      });
      setPokemones(saniData);
    });
  };

  useEffect(() => {
    if (data) getListPokemones();
  }, [data]);

  // 4. FUNCIONES DE UTILIDAD Y JUEGO
  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

  const computerSelection = () => {
    const rndId = getRandomInt(1, 101);
    const pc = pokemones.find((p) => p.id === rndId);
    setPcPokeSelection(pc);
  };

  // 5. MANEJADORES DE EVENTOS (CONTROLES)
  const handleDirection = (direction) => {
    if (myPokeSelection) return; // Si hay batalla, el D-Pad no mueve la lista

    if (direction === 'right') setposition((prev) => (prev < 100 ? prev + 1 : prev));
    if (direction === 'left')  setposition((prev) => (prev > 1 ? prev - 1 : prev));
    if (direction === 'down')  setposition((prev) => (prev + 4 <= 100 ? prev + 4 : prev));
    if (direction === 'up')    setposition((prev) => (prev - 4 >= 1 ? prev - 4 : prev));
  };

  const handleSelection = (button) => {
    if (button === 'A') {
      if (!myPokeSelection) {
        const selected = pokemones.find((p) => p.id === position);
        if (selected) {
          setMyPokeSelection(selected);
          computerSelection();
        }
      }
    }
    
    if (button === 'B') {
      setMyPokeSelection(null);
      setPcPokeSelection(null);
    }
  };

  // 6. RENDERIZADO (INTERFAZ)
  return (
    <div className="flex flex-col items-center pt-10 bg-zinc-900 min-h-screen">
      
      {/* SECCIÓN SUPERIOR: LA CONSOLA */}
      <div className="flex justify-center items-center gap-6">
        {/* Controles de movimiento */}
        <LeftControl handleDirection={handleDirection} />
    
        {/* El "Hardware" de la Pantalla */}
        <div className="mx-2 bg-black p-2 rounded-lg border-4 border-zinc-700 shadow-2xl">
          {myPokeSelection && pcPokeSelection ? (
            <GameScreen player={myPokeSelection} computer={pcPokeSelection} />
          ) : (
            <Screen pokemones={pokemones} position={position} />
          )}
        </div>
        
        {/* Botones de acción */}
        <RightControl handleSelection={handleSelection} />
      </div>
        
      {/* SECCIÓN INFERIOR: DETALLES (Solo fuera de batalla) */}
      {!myPokeSelection && (
        <div className="mt-12 w-full max-w-2xl px-4 ">
          <div className="bg-zinc-800 rounded-xl p-6 border-t-4 ">
            <h2 className="text-zinc-500 text-xs uppercase font-bold">
              Pokedex Data - Entry #{position}
            </h2>
            <PokemonDetail 
              actual={pokemones.filter(p => p.id === position)} 
            />
          </div>
        </div>
      )}
  
    </div>
  );
}

export default App;