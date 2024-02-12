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

// Add a function to validate and create a new entry
const addEntryToPatient = (patientId: string, entry: Entry): Patient => {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) {
        throw new Error('Patient not found');
    }

    // Assuming each entry has a unique ID, you would generate it here
    const entryWithId = {
        ...entry,
        id: uuid() // Use a library like uuid to generate a new ID
    };

    patient.entries.push(entryWithId);

    return patient;
};

export default {
    getEntries,
    addPatient,
    getPatient,
    addEntryToPatient
};