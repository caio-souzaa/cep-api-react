import React, { useState } from 'react'
import axios, { AxiosError } from 'axios'

export const App = () => {

   const [cep, setCep] = useState('')
   const [logradouro, setLogragouro] = useState('')
   const [complemento, setComplemento] = useState('')
   const [bairro, setBairro] = useState('')
   const [localidade, setLocalidade] = useState('')
   const [uf, setUf] = useState('')
   const [ddd, setDDD] = useState('')
   const [estaComErro, setEstaComErro] = useState(false)

   const clicarBotao = (event) => {
      event.preventDefault()

      if (cep.length < 8) {
         setEstaComErro(true)
         return
      }
      

      axios.get(`https://viacep.com.br/ws/${cep}/json/`)
         .then(res => {
            setLogragouro(res.data.logradouro)
            setComplemento(res.data.complemento)
            setBairro(res.data.bairro)
            setLocalidade(res.data.localidade)
            setUf(res.data.uf)
            setDDD(res.data.ddd)
            setEstaComErro(false)
         }).catch(setEstaComErro(true))
         
         

   }

   return (
      <div className='screen'>
         <h2>Buscar Cep</h2>
         <form className='form'>

            <div className='form__search'>
               <input value={cep} onChange={event => setCep(event.target.value)} type="text" maxLength={9} />
               <button onClick={clicarBotao}>Buscar Cep</button>
            </div>

            {estaComErro == true && (
               <span style={{ color: 'red' }}>Favor informar um CEP Válido</span>
            )}

            <div className='form__info'>

               <div className='form-group'>
                  <label htmlFor="logradouro">Rua</label>
                  <input value={logradouro} id='logradouro' type="text" disabled />
               </div>

               <div className='form-group'>
                  <label htmlFor="complemento">Complemento</label>
                  <input value={complemento} id='complemento' type="text" disabled />
               </div>

               <div className='form-group'>
                  <label htmlFor="bairro">Bairro</label>
                  <input value={bairro} id='bairro' type="text" disabled />
               </div>

               <div className='form-group'>
                  <label htmlFor="localidade">Cidade</label>
                  <input value={localidade} id='localidade' type="text" disabled />
               </div>

               <div className='form-group'>
                  <label htmlFor="uf">Estado</label>
                  <input value={uf} id='uf' type="text" disabled />
               </div>

               <div className='form-group'>
                  <label htmlFor="ddd">DDD</label>
                  <input value={ddd} id='ddd' type="text" disabled />
               </div>
            </div>
         </form>
      </div>
   )
}
