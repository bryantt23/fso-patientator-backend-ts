import diagnosisData from '../data/diagnoses'
import { Diagnosis } from '../types';

const getEntries = (): Diagnosis[] => {
    return diagnosisData;
};

export default {
    getEntries,
};