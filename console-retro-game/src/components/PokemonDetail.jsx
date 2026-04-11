import React from 'react';

/**
 * Componente PokemonDetail
 * @param {Array} actual - Recibe un array que contiene la información del Pokémon seleccionado.
 */
const PokemonDetail = ({ actual }) => {
  
  // evita errores
  if (!actual || actual.length === 0) return null;

  // Extraemos el primer Pokémon del array para trabajar más cómodamente.
  const pokemon = actual[0];

  return (
    /* CONTENEDOR PRINCIPAL: Caja oscura con tamaño fijo, scroll vertical y borde estilo retro */
    <div className="w-[450px] h-[300px] overflow-y-auto border-4 border-solid border-white text-white bg-zinc-800 p-3">
      
      {/* SECCIÓN: NOMBRE E ID */}
      <div className="flex items-center gap-2 mb-2">
        {/* Nombre en amarillo, negrita y mayúsculas */}
        <span className="text-yellow-400 font-bold text-lg uppercase">
          {pokemon?.name}
        </span>
        {/* ID con formato de 3 dígitos (ej: 001, 025) */}
        <span className="text-zinc-400 text-sm">
          #{String(pokemon?.id).padStart(3, '0')}
        </span>
      </div>

      {/* SECCIÓN: IMÁGENES (SPRITES) */}
      <div className="flex gap-4 mb-3">
        {/* Imagen Frontal */}
        <div className="flex flex-col items-center">
          <img
            src={pokemon?.sprites?.front_default}
            alt={`${pokemon?.name} front`}
            className="w-16 h-16"
          />
          <span className="text-xs text-zinc-400">Frente</span>
        </div>
        
        {/* Imagen de Espalda */}
        <div className="flex flex-col items-center">
          <img
            src={pokemon?.sprites?.back_default}
            alt={`${pokemon?.name} back`}
            className="w-16 h-16"
          />
          <span className="text-xs text-zinc-400">Espalda</span>
        </div>
      </div>

      {/* SECCIÓN: LISTA DE MOVIMIENTOS */}
      <div>
        <p className="text-yellow-400 text-xs font-bold mb-1">MOVIMIENTOS</p>
        <div className="flex flex-col gap-1">
          {/* - slice(0, 10): Solo mostramos los primeros 10 movimientos.
            - map: Iteramos sobre cada movimiento para crear una fila.
          */}
          {pokemon?.moves?.slice(0, 10).map((m, i) => (
            <div key={i} className="flex justify-between text-xs border-b border-zinc-700 pb-1">
              {/* Limpiamos el nombre del movimiento (cambiamos guiones por espacios) */}
              <span className="capitalize">
                {m?.move?.name?.replace(/-/g, ' ')}
              </span>
              {/* Valor de ataque del movimiento */}
              <span className="text-red-400 font-bold">
                ATK: {m?.attack}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;