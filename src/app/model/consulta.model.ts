import { Time } from "@angular/common";

export interface Consulta {
    idPaciente: number,
    idMedico: number,
    data: Date, 
    hora: Time
}