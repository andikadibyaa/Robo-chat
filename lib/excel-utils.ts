import * as XLSX from 'xlsx';
import path from 'path';

export interface StaffData {
  id: string;          // nama pegawai
  bars: number;        // kriteria sikap
  kpi: number;         // kpi pegawai
  state: 'tetap' | 'promosi' | 'mutasi';  // status pegawai
  selisih: number;     // durasi dalam status
  posisi: 1 | 2 | 3 | 4 | 5 | 6;  // posisi (1 adalah tertinggi)
  tahun: number;       // tahun
}

export function readStaffData(): StaffData[] {
  try {
    const filePath = path.join(process.cwd(), 'data', 'data-pegawai.xlsx');
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    const data = XLSX.utils.sheet_to_json(worksheet) as StaffData[];
    return data;
  } catch (error) {
    console.error('Error reading Excel file:', error);
    return [];
  }
} 