import  { NextResponse } from 'next/server'
import { pool } from '@/app/services/db'

export async function GET() {
    const [rows] = await pool.query('SELECT * from clientes')
    return NextResponse.json({message: 'hello', data: rows}, {status: 200})
}

export async function POST(request){
    const formData = await request.formData()
    const file = Object.fromEntries(formData)['files[]']
    let data = await file.text()
    data = data.split('\r')
    for(let i = 1; i < data.length-1; i++){
        let line = data[i].split(',')
        line[0] = line[0].split('\n').join("")
        await pool.query(`INSERT INTO clientes (nombre, apellido_paterno, apellido_materno, email, telefono, clabe, numero_cuenta, numero_tarjeta, tipo_cuenta) 
            VALUES ('${line[0]}', '${line[1]}', '${line[2]}', '${line[3]}', '${line[4]}', '${line[5]}', '${line[6]}', '${line[7]}', '${line[8]}')`)
    }
    
    return NextResponse.json({message: 'success'}, {status: 201})
}