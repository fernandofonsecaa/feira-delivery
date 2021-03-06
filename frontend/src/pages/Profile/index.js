import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import {FiTrash2, FiSearch} from 'react-icons/fi'


import api from '../../services/api'


import './styles.css'

import logoImg from '../../assets/logo_transparent.png'
import backgroundImg from '../../assets/fruit-bg.jpg'

export default function Profile(){
    const [incidents, setIncidents] = useState([])
    const [cidade, setCidade] = useState([])
  

    async function handleIndexFiltered(cidade){
            const response = await api.get(`feirantes/${cidade}`)
                setIncidents(response.data)                
            }

    async function handleDeleteIncident(id){
        try {
            await api.delete(`feirantes/${id}`)
        setIncidents(incidents.filter(incident => incident.id !==id))
        } catch (error) {
            alert('Erro ao deletar registro')
        }
    }

    
    return(
        <>
        <header className="header-container">
            <img src = {logoImg} alt="Feira Delivery"/>
            <Link className="button" to="/register">Cadastrar novo fornecedor</Link>
        </header>

           <section className = "banner-section">
                <img src={backgroundImg} alt="background"/>
                <h1>Procurando por feirantes na sua região?</h1>
                <p>Encontre os melhores feirantes com produtos fresquinhos próximo a você</p>
                 <div className = "search-section">
                    <input 
                    placeholder = "Pesquise por uma cidade"
                    value={cidade}
                    onChange = {e => setCidade(e.target.value)}  
                    /> 
                    <button onClick ={()=>handleIndexFiltered(cidade)}>
                    <FiSearch size={25} color="white"/>
                    </button>
                </div>   
              </section>           

        <div className = "profile-container">     

            <h1>Fornecedores disponíveis na sua região</h1>
            <ul>
                { incidents.map(incident =>(
                    <li key={incident.id}>
                    <strong>NOME: <span>{incident.nome}</span></strong>
                    
                    <strong>PRODUTOS: <span>{incident.produtos}</span></strong>
                
                    <strong>E-MAIL: <span>{incident.email}</span></strong>
                
                    <strong>WHATSAPP: <span>{incident.whatsapp}</span></strong>
                    
                    <strong>BAIRRO: <span>{incident.bairro}</span></strong>
                    
                    <button onClick ={()=>handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#D8D8D8" />
                    </button>
                </li>
                )) }
            </ul>
        </div>
        </>
    )
}




//Observações:

  // useEffect(()=>{
    //     async function handleIndexFiltered(cidade){
    //         api.get(`feirantes/${cidade}`
    //     ).then(response => {
    //         setIncidents(response.data)
    //     })}
    // }, [])

                //Outra maneira de definir uma função (usando o Then no lugar do Async/Await)
    // function handleIndexFiltered(cidade){
        //     api.get(`feirantes/${cidade}`).then(response =>{
        //         setIncidents(response.data)                
        //     })
        // }   