import  { NextResponse } from 'next/server'
import { pool } from '@/app/services/db'
import bcrypt from 'bcrypt';

export async function GET() {
    const [rows] = await pool.query('SELECT * from asesores')
    if( rows.length > 0 ) return NextResponse.json({message: 'success', data: rows}, {status: 200})
    return NextResponse.json({message: 'data not found', data: []}, {status: 404})
}

export async function POST(request){
    let data = await request.json()
    data.contrasenia = bcrypt.hashSync(data.contrasenia, 10);
    try {
        await pool.query(`INSERT INTO asesores (nombre, apellido_paterno, apellido_materno, email, telefono, rol, contrasenia) 
        VALUES ('${data.nombre}', '${data.apellido_paterno}', '${data.apellido_materno}', '${data.email}', '${data.telefono}', '${data.rol}', '${data.contrasenia}')`)
        return NextResponse.json({message: 'success'}, {status: 201})
    }catch(error){
        return NextResponse.json({message: 'incorrect data'}, {status: 400})
    }
}