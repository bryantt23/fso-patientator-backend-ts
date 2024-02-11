import patientData from '../data/patients'
import { NonSensitivePatientEntry } from '../types';

const getEntries = (): NonSensitivePatientEntry[] => {
    return patientData.map(({ ssn, ...nonSensitiveData }) => nonSensitiveData);
};

export default {
    getEntries,
};