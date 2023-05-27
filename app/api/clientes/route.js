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
        let date = line[4]
        line[4] = date.slice(6, 10)+"-"+date[3]+date[4]+"-"+date[0]+date[1];
        console.log(line[4]) 
        await pool.query(`INSERT INTO clientes (id_cliente, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, sexo, segmento, 
            nacionalidad, rfc, tipo_id, numero_id, cuenta, email) 
            VALUES ('${line[0]}', '${line[1]}', '${line[2]}', '${line[3]}', '${line[4]}', '${line[5]}', '${line[6]}', 
            '${line[7]}', '${line[8]}', '${line[9]}', '${line[10]}', '${line[11]}', '${line[12]}')`)
    }
    
    return NextResponse.json({message: 'success'}, {status: 201})
}