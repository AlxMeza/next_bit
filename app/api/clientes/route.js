import  { NextResponse } from 'next/server'
import { pool } from '@/app/services/db'

export async function GET() {
    const [rows] = await pool.query('SELECT * from clientes')
    return NextResponse.json({message: 'hello', data: rows}, {status: 200})
}