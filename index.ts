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

app.get('/api/patients', (_req, res) => {
    res.send(patientService.getEntries())
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