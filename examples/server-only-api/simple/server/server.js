import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 4000;

// Middleware
app.use(cors()); // Allow all origins
app.use(express.json()); // Parse JSON bodies

// generate design
app.post('/designs-from-prompt', (req, res) => {

    console.time('designs-from-prompt')

    fetch(`${process.env.SIVI_API_URL}/designs-from-prompt`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'sivi-api-key': process.env.SIVI_API_KEY
        },
        body: JSON.stringify(req.body),
    })
        .then(response => {
            console.timeEnd('designs-from-prompt')
            return response.json()
        }
        )
        .then(data => res.json(data))
        .catch(error => {
            console.error('Error:', error);
            console.timeEnd('designs-from-prompt')
            res.status(500).json({ error: 'Internal Server Error' });
        })
});


// get design variants
app.get('/get-design-variants', (req, res) => {

    console.time('get-design-variants')

    fetch(`${process.env.SIVI_API_URL}/get-design-variants`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'sivi-api-key': process.env.SIVI_API_KEY
        },
        params: {
            designId: req.query.designId
        }
    })
        .then(response => {
            console.timeEnd('get-design-variants')
            return response.json()
        }
        )
        .then(data => res.json(data))
        .catch(error => {
            console.error('Error:', error);
            console.timeEnd('get-design-variants')
            res.status(500).json({ error: 'Internal Server Error' });
        })
});

// Check status of design generation
app.get('/get-request-status', (req, res) => {

    console.time('get-request-status')

    fetch(`${process.env.SIVI_API_URL}/get-request-status`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'sivi-api-key': process.env.SIVI_API_KEY
        },
        params: {
            requestId: req.query.requestId
        }
    })
        .then(response => {
            console.timeEnd('get-request-status')
            return response.json()
        }
        )
        .then(data => res.json(data))
        .catch(error => {
            console.error('Error:', error);
            console.timeEnd('get-request-status')
            res.status(500).json({ error: 'Internal Server Error' });
        })
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
