import express from 'express';
import cors from 'cors';

import api from './api';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.json({
		message: 'Leafy backend API',
	});
});

app.use('/api/v1', api);

export default app;
