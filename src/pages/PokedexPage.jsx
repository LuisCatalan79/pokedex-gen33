import { useSelector } from "react-redux"
import UseFetch from "../hooks/UseFetch"
import { useEffect, useRef, useState } from "react"
import PokeCard from "../components/PokedexPage/PokeCard"
import SelectType from "../components/PokedexPage/SelectType"
import '../components/PokedexPage/styles/PokedexPage.css'
import Pagination from '@mui/material/Pagination';

const PokedexPage = () => {

  const [page, setPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10)
  const [totalPokemons, setTotalPokemons] = useState()
  const [inputValue, setInputValue] = useState('')
  const [typeSelected, setTypeSelected] = useState('allPokemons')
  const trainerName = useSelector(states => states.trainer)
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
  const [pokemons, getpokemons, getTypePokemon] = UseFetch(url)

  const inputPerPage =useRef()

  useEffect(() => {
    if (typeSelected == 'allPokemons') {
      getpokemons()
    } else {
      getTypePokemon(typeSelected)
    }
    
  }, [typeSelected])
  console.log(typeSelected);

  const inputName = useRef()

  const handleSearch = e => {
    e.preventDefault()
    setInputValue(inputName.current.value.trim().toLowerCase())
    setPage (1)
    console.log('buscando por nombre');
    console.log(inputName.current.value);
    console.log(inputValue);
    inputName.current.value=''
  }
  const cbFilter = (pokeInfo) => pokeInfo.name.toLowerCase().includes(inputValue)


  const handleChange = (event, value) => {
    event.preventDefault
    setPage(value)
  }

  let startIndex = (page - 1) * limitPerPage; // Índice inicial del slice
  let endIndex = startIndex + limitPerPage; // Índice final del slice
  let pokeResults = pokemons?.results.filter(cbFilter).slice(startIndex, endIndex) || [];
  
  useEffect(() => {
    setTotalPokemons(pokemons?.results.filter(cbFilter).length);
  }, [page, handleChange])

  

  const handlePagination = (event) => {
    event.preventDefault();
    console.log(inputPerPage.current.value)
    const inputValue = inputPerPage.current.value;
    if (!isNaN(inputValue) && inputValue > 0) {
        setLimitPerPage(parseInt(inputValue));
        setPage(1)
    }
}
  // console.log(pokeResults);
  // let totalPokemons = pokemons?.results.length
  // console.log(totalPokemons);
  return (
    <div>
      <h2>Hi <span>{trainerName}</span>, here you can find you favourito pokemn</h2>
      <form onSubmit={handleSearch}>
        <input ref={inputName} type="text" />
        <button>Search</button>
      </form>
      <select  ref={inputPerPage} onChange={handlePagination}>
                        <option value='all'>all</option>
                        <option value='2'>2</option>
                        <option value='4'>4</option>
                        <option value='6'>6</option>
                        <option value='8'>8</option>
                        <option value='10'>10</option>
                        <option value='13'>13</option>
                        <option value='17'>17</option>
                        <option value='20'>20</option>
                    </select>
      <SelectType setTypeSelected={setTypeSelected} 
      
      />
      <div className="pokemons__container">
        {
          pokeResults.filter(cbFilter).map(pokeInfo => (
            <PokeCard
              key={pokeInfo.url}
              url={pokeInfo.url}
            />
          ))
        }
      </div>
      <Pagination
        count={parseInt(Math.ceil(totalPokemons / limitPerPage))}
        page={page}
        onChange={handleChange} />
    </div>
  )
}
export default PokedexPage