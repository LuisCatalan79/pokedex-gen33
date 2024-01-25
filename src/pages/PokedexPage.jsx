import { useDispatch, useSelector } from "react-redux"
import UseFetch from "../hooks/UseFetch"
import { useEffect, useRef, useState } from "react"
import PokeCard from "../components/PokedexPage/PokeCard"
import SelectType from "../components/PokedexPage/SelectType"
import '../components/PokedexPage/styles/PokedexPage.css'
import Pagination from '@mui/material/Pagination';
import { setModeViewG } from "../store/states/modeView.state"
import { PaginationItem } from "@mui/material"


const PokedexPage = () => {

  const [page, setPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10)
  const [inputValue, setInputValue] = useState('')
  const [typeSelected, setTypeSelected] = useState('allPokemons')
  const trainerName = useSelector(states => states.trainer)
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
  const [pokemons, getpokemons, getTypePokemon] = UseFetch(url)
  const [error, setError] = useState(false)
  const [msgError, setMsgError] = useState('')
  
  const inputPerPage = useRef()
  
  useEffect(() => {
    if (typeSelected == 'allPokemons') {
      getpokemons()
    } else {
      getTypePokemon(typeSelected)
    }
    
  }, [typeSelected])
  
  let cbFilter = (pokeInfo) => pokeInfo.name.toLowerCase().includes(inputValue)
  let pokeResults = pokemons?.results.filter(cbFilter)
  let totalResult = pokemons?.results.length
  const [totalPokemons, setTotalPokemons] = useState(totalResult)
  const inputName = useRef()
  
  const handleSearch = e => {
    e.preventDefault()
    cbFilter = (pokeInfo) => pokeInfo.name.toLowerCase().includes(inputName.current.value.toLowerCase())
    pokeResults = pokemons?.results.filter(cbFilter)
    if (pokeResults.length===0) {
      setError(true)
      setMsgError('❌¡Incorrect!, pokemon does not exist 😵')
    } else if (inputName.current.value.trim().length===0) {
      setError(true)
      setMsgError('❌¡Incorrect!, you must enter at least one character😵')
    } else {
      setInputValue(inputName.current.value.trim().toLowerCase())
      setError(false)
    }
    setPage(1)
    inputName.current.value = ''
    const totalResult= pokeResults.length
    setTotalPokemons(totalResult)
  }
      
      
  const dispatch = useDispatch()
  const modeView = useSelector(states=>states.modeView)

  const handleChange = (event, value) => {
    event.preventDefault()
    setPage(value)
  }

  const handleModeChange = (e) => {
    e.preventDefault()
  
      dispatch(setModeViewG(!modeView))
    console.log(modeView);
  }
  let startIndex = (page - 1) * limitPerPage; // Índice inicial del slice
  let endIndex = startIndex + limitPerPage; // Índice final del slice
  pokeResults = pokemons?.results.filter(cbFilter).slice(startIndex, endIndex) || [];

  useEffect(() => {
    setTotalPokemons(pokemons?.results.filter(cbFilter).length);
  }, [page, handleChange])



  const handlePagination = (event) => {
    event.preventDefault();

    const inputValue = inputPerPage.current.value;
    if (!isNaN(inputValue) && inputValue > 0) {
      setLimitPerPage(parseInt(inputValue));
      setPage(1)
    }
  }

  return (
    <div className={`list__pokemon__components ${modeView?'light':'dark'}`}>
      <header className="rectangle-red list header-pokemon-info">
        <div className="rectangle-black list"></div>
        <div className="circle list"></div>
        <img className="pokedex-letters-header list" src="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/436/896/datas/original.png" alt="image pokedex letters" />
      </header>
      <aside className={`aside__container ${modeView?'light':'dark'}`}>
        <h1 className="title__form__list">Hi <span className="span__name__trainer">{trainerName}</span>, here you can find you favourito pokemn</h1>
            {
              error?
              <span className="span__msgError">{msgError}</span>
              :
              <span></span>
              
            }
        <form onSubmit={handleSearch} className="form__container__list">
      <a href="#/"><span className="material-symbols-outlined">home</span></a>
          <div className="search__container">
            <input className="input__form__list" ref={inputName} type="text" placeholder="search pokemon by name" />
            <button className="button__form__list">Search</button>
            <button className="button__form__list" onClick={handleModeChange}>Mode change</button>
          </div>

      <div className="selec__type__pokemon">
      <SelectType  setTypeSelected={setTypeSelected}/>
      </div>

      <select className="selec__type__pokemon" ref={inputPerPage} onChange={handlePagination}>
        <option value='all'>All</option>
        <option value='2'>2</option>
        <option value='4'>4</option>
        <option value='6'>6</option>
        <option value='8'>8</option>
        <option value='10'>10</option>
        <option value='13'>13</option>
        <option value='17'>17</option>
        <option value='20'>20</option>
      </select>
      </form>
    </aside>
      <div className={ `pokemons__container ${modeView?'light':'dark'}`}>
        {
          pokeResults.filter(cbFilter).map(pokeInfo => (
            <PokeCard
              key={pokeInfo.url}
              url={pokeInfo.url}
            />
          ))
        }
      </div>
      <Pagination className={`pagination__pokedex ${modeView?'light':'dark'}`}
        count={parseInt(Math.ceil(totalPokemons / limitPerPage)) || 0}
        page={page}
        onChange={handleChange}
        color='primary'
        shape='rounded' 
        renderItem={(item)=>(
          <PaginationItem {...item} sx={{ color: '#fff', 
            backgroundColor: '#fe1936', 
            borderRadius: '10%', 
            width: '40px', 
            height: '40px', 
            border: '3px solid #000',
            margin: '10px'}} />

        )}
        />
    </div>
  )
}
export default PokedexPage