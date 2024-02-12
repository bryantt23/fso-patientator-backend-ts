import patientData from '../data/patients'
import { Patient, NonSensitivePatient, NewPatientEntry, Entry } from '../types';
import { v1 as uuid } from 'uuid'

const patients: Patient[] = patientData as Patient[];

const getEntries = (): NonSensitivePatient[] => {
    return patients.map(({ ssn, ...nonSensitiveData }) => nonSensitiveData);
};

const getPatient = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
};

const addPatient = (entry: NewPatientEntry): Patient => {
    const id = uuid()
    const newPatientEntry = {
        id,
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};


const updatePatientEntry = (patientId: string, entry: Entry): Patient => {
    const patientToUpdate = patients.find(patient => patient.id === patientId)
    patientToUpdate?.entries.push(entry)
    return patientToUpdate;
};

export default {
    getEntries,
    addPatient,
    getPatient,
    updatePatientEntry
};