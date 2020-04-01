import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const EditCargo = ({ match }) => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        axios.get('/cargos/' + match.params.id).then(res => {
            setName(res.data.nome)
        })
    }, [match.params.id])

    const onChange = evt => {
        setName(evt.target.value)
    }
    const save = () => {
        if(name.length > 0){
            axios.put('/cargos/' + match.params.id, {
                nome : name
            }).then(res => {
                setSuccess(true)
            })
        }
    }

    if(success){
        return <Redirect to={'/cargos'} />
    }

    return (
        <div className='container'>
        <br />
            <div className='card text-white bg-dark'>
                <div className='card-header bg-color'>
                    Editar cargo
                </div>
                <div className='card-body'>
                    <div className='card-body card-header-color'>
                        <form>
                            <div className='form-group'>
                                <input type='text' onChange={onChange} value={name} className='form-control input-color' id='name' />
                            </div>
                            <button type='button' onClick={save} className='btn btn-light'>Salvar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCargo