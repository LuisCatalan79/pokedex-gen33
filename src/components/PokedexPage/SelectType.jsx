import { useEffect, useRef } from "react"
import UseFetch from "../../hooks/UseFetch"

const SelectType = ({setTypeSelected}) => {
    const url = 'https://pokeapi.co/api/v2/type'

    const[types,getTypes] = UseFetch(url)

    useEffect(() => {
        getTypes()
    },[])

    const typeRef = useRef()

    const handleChange = () => {
        setTypeSelected(typeRef.current.value)
    }

   
    return(
        <select ref={typeRef} onChange={handleChange}>
            <option value='allPokemons' >All Pokemons</option>
            {
                types?.results.map( type =>(
                    <option key={type.url} value={type.url}>{type.name}</option>
                ))
            }
        </select>
    )

}

export default SelectType