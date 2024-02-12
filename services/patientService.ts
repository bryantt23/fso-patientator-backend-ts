import patientData from '../data/patients'
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid'

const patients: PatientEntry[] = patientData as PatientEntry[];

const getEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ ssn, ...nonSensitiveData }) => nonSensitiveData);
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
    const id = uuid()
    const newPatientEntry = {
        id,
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    addPatient
};