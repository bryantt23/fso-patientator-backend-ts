import express from 'express';
import cors from 'cors';
import diagnosisService from './services/diagnosisService';
import patientService from './services/patientService';
import toNewPatientEntry from './utils';

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
    res.send(diagnosisService.getEntries())
});

app.get('/api/patients/:id', (req, res) => {
    res.send(patientService.getPatient(req.params.id))
});

app.get('/api/patients', (_req, res) => {
    res.send(patientService.getEntries())
});

app.post('/api/patients/:id/entries', (req, res) => {
    try {
        const patientId = req.params.id;
        const entry = req.body;

        // Validate the entry type and required fields based on the type
        switch (entry.type) {
            case 'HealthCheck':
                if (!entry.healthCheckRating && entry.healthCheckRating !== 0) {
                    throw new Error('Missing healthCheckRating for HealthCheck entry');
                }
                break;
            case 'Hospital':
                if (!entry.discharge || !entry.discharge.date || !entry.discharge.criteria) {
                    throw new Error('Missing discharge information for Hospital entry');
                }
                break;
            case 'OccupationalHealthcare':
                if (!entry.employerName) {
                    throw new Error('Missing employerName for OccupationalHealthcare entry');
                }
                // Optionally check for sickLeave fields
                if (entry.sickLeave && (!entry.sickLeave.startDate || !entry.sickLeave.endDate)) {
                    throw new Error('Incomplete sickLeave information for OccupationalHealthcare entry');
                }
                break;
            default:
                throw new Error('Invalid entry type');
        }

        // If validation passes, add the entry to the patient
        const updatedPatient = patientService.addEntryToPatient(patientId, entry);
        res.json(updatedPatient);
    } catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

app.post('/api/patients', (req, res) => {
    try {
        const newDiaryEntry = toNewPatientEntry(req.body);
        const addedEntry = patientService.addPatient(newDiaryEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});