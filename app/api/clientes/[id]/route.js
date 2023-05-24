import  { NextResponse } from 'next/server'
import { pool } from '@/app/services/db'

export async function GET(request, { params }) {
    const [rows] = await pool.query(`SELECT * from clientes WHERE id = ${params.id} LIMIT 1`)
    if( rows.length > 0 ) return NextResponse.json({message: 'success', data: rows[0]}, {status: 200})
    return NextResponse.json({message: 'data not found', data: {}}, {status: 404})
}