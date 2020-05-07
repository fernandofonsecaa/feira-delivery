import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft} from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/logo_transparent.png'

export default function Register(){
    const [nome, setNome] = useState('')
    const [produtos, setProdutos] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUf] = useState('')

    const history = useHistory()

    async function handleRegister(e){
        e.preventDefault()

        const data = {
            nome,
            produtos,
            email,
            whatsapp,
            bairro,
            cidade,
            uf,
        }
        
        try {
            const response = await api.post('/feirantes',data)
            // alert (`Seu ID de acesso é ${response.data.id}`)
            history.push('/')
        } catch(err){
            alert('Erro no cadastro, tente novamente')
        }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <Link to="/">
                    <img src ={logoImg} alt="Feira Delivery"/>
                    </Link>
                    
                    <h1>Cadastro</h1>
                    <p>Cadastre-se para fazer parte da plataforma de Delivery de feira</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color='#9FCC2E'/>
                        Voltar para Home
                    </Link>

                </section>
                
                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome"
                        value = {nome}
                        onChange = {e => setNome(e.target.value)}
                    />
                    <input 
                        placeholder="Produtos"
                        value = {produtos}
                        onChange = {e => setProdutos(e.target.value)}
                        />
                    <input 
                        type="email" 
                        placeholder="Email"
                        value = {email}
                        onChange = {e => setEmail(e.target.value)}
                        />

                    <input 
                        placeholder="Whatsapp"
                        value = {whatsapp}
                        onChange = {e => setWhatsapp(e.target.value)}/>

                    <input 
                        placeholder="Bairro"
                        value = {bairro}
                        onChange = {e => setBairro(e.target.value)}
                        />

                    <div className="input-group">
                    <input 
                        placeholder="Cidade"
                        value = {cidade}
                        onChange = {e => setCidade(e.target.value)}
                    />

                    <input 
                        placeholder="UF"
                        value = {uf}
                        onChange = {e => setUf(e.target.value)} 
                        style={{ width: 80 }}/>
                    </div>

                    <button className = "button" type = "submit">Cadastrar</button>
                    
                </form>
            </div>
        </div>
    )
}