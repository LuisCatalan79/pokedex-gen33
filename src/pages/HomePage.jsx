import { useRef, useState } from "react"
import { setTrainerG } from '../store/states/trainer.state'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import '../components/HomePage/styles/HomePage.css'

const HomePages = () => {

    const inputTrainer = useRef()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [error, setError] = useState(false)
    const [msgError, setMsgError] = useState('')

    const handleSubmit= e =>{
        e.preventDefault()
        if (inputTrainer.current.value.trim().length<3) {
          setError(true)
          setMsgError('❌¡Incorrect!, it must be more than three characters😵')
          
        } else {
          dispatch(setTrainerG(inputTrainer.current.value.trim()))
          navigate('/pokedex')
          
        }
    }

  return (
    <article className="home"> 
      <header className="header__home">
        {/* <img src="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/436/896/datas/original.png" alt="" /> */}
        <img className="img__pokedex__logo" src="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/436/896/datas/original.png" alt="image pokedex letters" />
        <h1 className="title__home">¡Hi Trainer!</h1>
        <p className="description__home">To start this app, give me your trainer name</p>
      </header>

        <form className="form__home" onSubmit={handleSubmit}>
          {
            error?
            <span className="span__msgError">{msgError}</span>
            :
            <span>
              
            </span>
          }
            <input className="input__home" ref={inputTrainer} type="text" placeholder="Enter your trainer name" />
            <button className="btn__home">Catch then all</button>
        </form>
        <div className="rectangle__red"> 
          <div className="rectangle__black"></div>
          <div className="circle"></div>
        </div>
    </article>
  )
}

export default HomePages