import React, {useEffect, useRef} from 'react'
import {useField} from '@unform/core'

const Input = ({name, ...rest})=>{
    const inputRef = useRef()
    const {fieldName, defaultValue, registerField, error} = useField(name)
    useEffect(()=>{
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value', 
        })
    },[fieldName, registerField])

    return(
    <>
    <input 
    name={name}
    ref ={inputRef}
    type="text" 
    placeholder="name"
    defaultValue={defaultValue}
    className={error? 'hasError' : ''}
    {...rest}
     />
    {error && <span className="error">{error}</span>}
    </>
    )
    
}

export default Input




  /*
  Outra maneira de pegar os valores do input:

             getValue: ref=>{
                 return ref.current.value
             },
             setValue: (ref, value =>{
                 ref.current.value = value
            
             }),
             clearValue: ref =>{
                 ref.current.value=''
             },
            */  