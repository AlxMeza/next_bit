import  { NextResponse } from 'next/server'
import { pool } from '@/app/services/db'
import bcrypt from 'bcrypt'
import fs from 'fs'
import csv from 'csv-parser'

export async function GET() {
    const [rows] = await pool.query('SELECT * from asesores')
    if( rows.length > 0 ) return NextResponse.json({message: 'success', data: rows}, {status: 200})
    return NextResponse.json({message: 'data not found', data: []}, {status: 404})
}

// export async function POST(request){
//     let data = await request.json()
//     data.contrasenia = bcrypt.hashSync(data.contrasenia, 10);
//     try {
//         await pool.query(`INSERT INTO asesores (nombre, apellido_paterno, apellido_materno, email, telefono, rol, contrasenia) 
//         VALUES ('${data.nombre}', '${data.apellido_paterno}', '${data.apellido_materno}', '${data.email}', '${data.telefono}', '${data.rol}', '${data.contrasenia}')`)
//         return NextResponse.json({message: 'success'}, {status: 201})
//     }catch(error){
//         return NextResponse.json({message: 'incorrect data'}, {status: 400})
//     }
// }

export async function POST(request){
    const formData = await request.formData()
    const file = Object.fromEntries(formData)['files[]']
    let data = await file.text()
    data = data.split('\r')
    for(let i = 1; i < data.length-1; i++){
        let line = data[i].split(',')
        line[0] = line[0].split('\n').join("")
        line[6] = bcrypt.hashSync(line[6], 10);
        await pool.query(`INSERT INTO users (name, apellido_paterno, apellido_materno, email, telefono, rol, password) 
            VALUES ('${line[0]}', '${line[1]}', '${line[2]}', '${line[3]}', '${line[4]}', '${line[5]}', '${line[6]}')`)
    }
    
    return NextResponse.json({message: 'success'}, {status: 201})
}
