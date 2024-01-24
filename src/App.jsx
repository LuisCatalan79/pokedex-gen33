
import './App.css'
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PokedexPage from './pages/PokedexPage';
import PokemonPage from './pages/PokemonPage';
import ProtectedRoutes from './pages/ProtectedRoutes';
import './components/PokemonPage/styles/PokemonPage.css'


function App() {

  
  return (
    <div className='poke-app'>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route element={<ProtectedRoutes/>} >
        <Route path='/pokedex' element={<PokedexPage/>} />
        <Route path='/pokedex/:id' element={<PokemonPage/>} />

        </Route>
      </Routes>
      
    </div>
    
  )
}

export default App
