import { useRef } from "react"
import { setTrainerG } from '../store/states/trainer.state'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"


const HomePages = () => {

    const inputTrainer = useRef()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleSubmit= e =>{
        e.preventDefault()
        dispatch(setTrainerG(inputTrainer.current.value.trim()))
        navigate('/pokedex')
    }

  return (
    <div> 

        <img src="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/436/896/datas/original.png" alt="" />
        <h2>¡Hi Trainer!</h2>
        <p>To start this app, give me your trainer name</p>
        <form onSubmit={handleSubmit}>
            <input ref={inputTrainer} type="text" />
            <button>Catch then all</button>
        </form>
    </div>
  )
}

export default HomePages