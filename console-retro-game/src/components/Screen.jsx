



const Screen = ({pokemones}) => {
    return(
    <>
        <div className="w-[450px] h-[200px] border-4 border-solid"> 
        {pokemones?.map((pokemon) => (
                <>
                <p>{pokemon.name}</p>
                <img src={pokemon.sprites?.front_default} className="w-40 h-40" />
                </>
            
        ))}
        </div>
    
    
    </>
   
    );
 
};


export default Screen;