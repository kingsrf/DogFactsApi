import express from 'express';
import dogFacts from './dog_facts-1.js';

const app = express();
const port = process.env.PORT || 3000;

app.get('/facts', (req, res) => {
    const {number} = req.query;
    let factsToReturn = dogFacts;

    if (number !== undefined) {
        const num = Number.parseInt(number, 10);
        if (Number.isNaN(num) || num < 1) {
            return res.status(400).json({success:false, error: 'Invalid number parameter'});
        }
        factsToReturn = dogFacts.slice(0, num);
    }
    res.json({facts: factsToReturn, success: true});
});

app.use((req, res) => {
    res.status(404).json({suceess: false, error: 'Endpoint not found'});
});

app.listen(port, () => {
    console.log(`Dog Facts API server is running on port ${port}`);
});