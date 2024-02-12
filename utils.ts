import { Gender, NewPatientEntry } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};
const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const toNewPatientEntry = (object: any): NewPatientEntry => {
    const { name, dateOfBirth, ssn, gender, occupation } = object;
    const newEntry: NewPatientEntry = {
        name,
        dateOfBirth,
        ssn,
        gender: parseGender(gender),
        occupation,
        entries: []
    };
    return newEntry;
}

export default toNewPatientEntry;