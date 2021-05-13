import React, { useRef} from 'react'
import { Form } from '@unform/web'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft} from 'react-icons/fi'

import ViaCep from 'react-via-cep'

import * as Yup from 'yup'

import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/logo_transparent.png'
import Input from '../../components/Input/'

export default function Register(){
    
    const formRef = useRef(null)

    const history = useHistory()

    async function handleRegister(data){
        try{
            const schema = Yup.object().shape({
                nome: Yup.string().required('Nome obrigatório'),
                produtos: Yup.string().required('Produto obrigatório'),
                email: Yup.string().required('E-mail obrigatório')
                .email('Digite um e-mail válido'),
                whatsapp: Yup.string()
                .matches(/^[ 0-9]+$/, "Informar um número válido")
                .min(10, "Informar um número válido")
                .max(12, "Informar um número válido")
                .required('Whatsapp obrigatório'),
                bairro: Yup.string().required('Bairro obrigatório'),
                cidade: Yup.string().required('Cidade obrigatório'),
                uf: Yup.string()
                .matches(/^[A-Z]+$/,"Informar um Estado válido")
                .min(2, "Informar um Estado válido")
                .max(2,"Informar um Estado válido")
                .required('Estado obrigatório'),
            })   
            await schema.validate(data,{
                abortEarly:false,
            })
            await api.post('/feirantes',data)
            console.log(data)
            history.push('/');         

        } catch(err){
            if(err instanceof Yup.ValidationError){
                const errorMessages = {}

                err.inner.forEach(error =>{
                    errorMessages[error.path] = error.message
                })
                formRef.current.setErrors(errorMessages)    
            }
        }     
    }

    function onBlurCep(event) {
        const {value} = event.target

        fetch(`https://viacep.com.br/ws/${value}/json/`)
        .then((response) => response.json())
        .then((data) => {
            formRef.current.setFieldValue('bairro',data.bairro)
            formRef.current.setFieldValue('cidade',data.localidade)
            formRef.current.setFieldValue('uf',data.uf)
        })        
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
                
                <Form ref={formRef} onSubmit={handleRegister}>
                    <Input name="nome" placeholder="Nome"/>
                    <Input name="produtos" placeholder="Produtos"/>
                    <Input name="email" placeholder="E-mail"/>
                    <Input name="whatsapp" placeholder="WhatsApp com DDD"/>
                    <Input name="cep" placeholder="CEP" onBlur={onBlurCep}/>
                    <Input name="bairro" placeholder="Bairro"/>
                    
                    <div className="input-group">
                    <Input name="cidade" placeholder="Cidade"/>
                    <Input name="uf" placeholder="UF" style={{width:80}}/>
                    </div>
                    
                    <button className="button" type="submit">Cadastrar</button>
                </Form>                           
            </div>
        </div>
    )
}







/* Outra maneira de lidar com formulário: utilizando estados em cada campo

 const [nome, setNome] = useState('')
     const [produtos, setProdutos] = useState('')
     const [email, setEmail] = useState('')
     const [whatsapp, setWhatsapp] = useState('')
     const [bairro, setBairro] = useState('')
     const [cidade, setCidade] = useState('')
     const [uf, setUf] = useState('')

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
        const isValid = await schema.isValid(data)
        if(isValid){
            await api.post('/feirantes',data)
            // alert (`Seu ID de acesso é ${response.data.id}`)
            history.push('/')
        }
        
     }


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
                        onChange = {e => setWhatsapp(e.target.value)}
                        />

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
                    </form>

                    <button className = "button" type = "submit">Cadastrar</button>

*/ 