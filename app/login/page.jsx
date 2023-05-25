'use client'
import { Password } from 'primereact/password'
import { InputText } from 'primereact/inputtext';

export default function Login(){

    const handlerSubmit = (e) => {
        e.preventDefault()
        const password = document.getElementById('password').value
        const email = document.getElementById('email').value
        
    }

    return(
        <>
            <form onSubmit={handlerSubmit} className='border lg:w-1/3 md:w-1/2 w-full p-10 border-gray-300 mx-auto mt-20 p-fluid rounded-md shadow-md'>
                <h2 className='text-gray-900 text-center font-semibold my-10 text-2xl'>¡Bienvenido!</h2>
                <InputText id='email' placeholder='email' required style={{marginBottom: '0.8rem'}}/>
                <Password inputId='password' placeholder='contraseña' toggleMask  required />

                <button className='mt-20 mb-10 text-white bg-indigo-500 border-indigo-500 hover:bg-indigo-600 w-full py-2 rounded-md'>Entrar</button>
            </form>
        </>
    )
}