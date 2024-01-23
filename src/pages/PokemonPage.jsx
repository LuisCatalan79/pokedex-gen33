import { useNavigate, useParams } from "react-router-dom"
import UseFetch from "../hooks/UseFetch"
import { useEffect, useState } from "react"
// import '../components/PokedexPage/styles/PokemonPage.css'
// import '../components/PokedexPage/styles/PokeCard.css'
import '../components/PokemonPage/styles/PokemonPage.css'

const PokemonPage = () => {

  let { id } = useParams()

  const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon/${id}`)

  const navigate = useNavigate()   

  const [pokemon, getPokemon] = UseFetch(url)

  useEffect(() => {
    getPokemon()
  }, [url])

  const handlePrev = (e) => {
    e.preventDefault()
    
    if (id<=1){
      id=10228
      
    }else{
      id--
    }
    setUrl(`https://pokeapi.co/api/v2/pokemon/${id}`)
    navigate(`/pokedex/${id}`)
  }

  const handleNext = (e) => {
    e.preventDefault()
    
    if (id>=10228){
      id=1
      
    }else{
      id++
    }
    setUrl(`https://pokeapi.co/api/v2/pokemon/${id}`)
    navigate(`/pokedex/${id}`)
  }

  console.log(pokemon);
  console.log(pokemon?.abilities)

  return (
    <div className="pokemonpage__containers">
      <a className="go-to-list-pokemon" href="#/pokedex/"><span className="material-symbols-outlined">
undo
</span></a>
      <header className="rectangle-red list header-pokemon-info">
        <div className="rectangle-black list"></div>
        <div className="circle list"></div>
        <img className="pokedex-letters-header list" src="/src/assets/logo-pokedex.png" alt="image pokedex letters" />
      </header>

      <article className="pokemonpage__cardInfo">
        <header className={`header__pokemonpage__cardInfo ${pokemon?.types[0].type.name}`}>
          <button onClick={handlePrev} className="preview__next__pokemonpage__info"><span className="material-symbols-outlined">
first_page
</span></button>
          <img className="srite__cardInfo" src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
          <button onClick={handleNext} className="preview__next__pokemonpage__info"><span className="material-symbols-outlined">
last_page
</span></button>
        </header>

        <div className="body__pokemonpage__cardInfo">

          <section className="pokemonpage__general__info">
            <h2 className="pokemonpage__id">{pokemon?.id}</h2>
            <hr className="pokemonpage__hr__cardInfo" />
            <h2 className="pokemonpage__name">{pokemon?.name}</h2>
            <ul className="weight__height__container">
              <li className="weight__height">
                <span className="span__weight__height">weight</span>
                {pokemon?.weight}
              </li>
              <li className="weight__height">
                <span className="span__weight__height">height</span>
                {pokemon?.height}
              </li>
            </ul>

              <ul className="types__abilities__container">
                <li className="types__abilities">
                  <span className="span__type__abilities">Type</span>
                  <div className="type__abilitie__flex">

                    {
                    pokemon?.types.map(typeInfo =>
                      <div className="type__abilitie__cardInfo"key={typeInfo.type.url} ><div className={`type__abilitie__type ${typeInfo.type.name}`}> 
                      {typeInfo.type.name}</div> </div> 
                    )
                    }
                  </div>
                </li>
                <li className="types__abilities">
                  <span className="span__type__abilities">Abilities</span>
                  <ul className="type__abilitie__flex">
                    
                    {/* {
                    pokemon?.abilities.map(abilityInfo =>
                      <div className="type__abilitie__flex"key={abilityInfo.ability.url} >{abilityInfo.ability.name}<div className="type__abilitie__cardInfo"> 
                      </div> </div> 
                    )
                    } */}
                    {
                      
                    pokemon?.abilities.map(abilityInfo =>
                      <li className="type__abilitie__flex"key={abilityInfo.ability.url} >{abilityInfo.ability.name} </li> 
                    )
                    }
                  </ul>
                </li>
              </ul>

          </section>
          <section className="state__container__info">
          <hr className="separator__stat" />
          <h2 className="title__section__stat">Stats</h2>
          <div className="stat__container__info">
            {
              pokemon?.stats.map(statInfo =>
                <article className="stat__container__info" key={statInfo.stat.url}>
                  <header className="name__number__stat__container">
                  <h3 className="name__stat__info">{statInfo.stat.name}</h3>
                  <p className="precent__stat">{statInfo.base_stat}</p>
                  </header>
                  <div className="progress__bar__container">
                  <div className="progress__stat"><progress className={`progress__stat__value ${pokemon?.types[0].type.name}`} max={255} value={`${statInfo.base_stat}`} ></progress></div>
                  </div>
                </article>

              )
            }
          </div>
          </section>
       </div>
      </article>
            
            

            

      <article className="movements__container">
      <hr className="separator__movement" />
      <h2 className="movement__title">Movements</h2>
      <ul className="movements__tag__container">
        {
          pokemon?.moves.map(moveInfo =>
            <li key={moveInfo.move.url} className="movements__tag">{moveInfo.move.name}</li>
          )
        }
      </ul>
      </article>
    </div>
       )
     }
     
     export default PokemonPage
            
              



                      
                      
                      
                    
                    

              
            

       

