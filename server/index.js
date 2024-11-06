import express from 'express';
import OpenAI from 'openai/index.mjs';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import ddb from './ddbClient.js';
import dynamoose from 'dynamoose';
import { testConnection, getAllStuff } from './ddbClient.js';

import businessRoutes from './routes/business.routes.js';
import productRoutes from './routes/product.routes.js';
import userRoutes from './routes/user.routes.js';
import surpriseBoxRoutes from './routes/surprisebox.routes.js';
import uploadRoutes from './routes/upload.routes.js';


dynamoose.aws.ddb.set(ddb);

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

const apiKey = process.env.OPEN_AI_API_KEY;
const openai = new OpenAI({ apiKey: apiKey });

app.use(cookieParser());
app.use(express.json());

app.get('/all', getAllStuff);
app.use('/upload', uploadRoutes);
app.use('/admin/businesses', businessRoutes); 
app.use('/businesses', businessRoutes);               // rutas de negocios
app.use('/profile', userRoutes);                      // rutas de perfil de usuario
app.use('/admin/businesses', productRoutes);          // rutas de productos del negocio bajo /admin/businesses
app.use('/users', userRoutes);                        // rutas de usuarios
app.use('/auth', userRoutes);                         // rutas de autenticación
app.use('/admin/businesses', surpriseBoxRoutes);      // rutas de cajas sorpresa bajo /admin/businesses
app.use('/businesses', productRoutes)
app.use('/donations', businessRoutes);                // rutas de negocios donadores

// Define the endpoint to generate a response based on a prompt
app.post('/generate-response', async (req, res) => {
  const { prompt } = req.body;
  try {
      const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
              { role: "system", content: "Eres un asistente dispuesto a ayudar y responder solo con lo que te den de prompt, ni introduccion ni mas ni menos" },
              { role: "user", content: prompt },
          ],
      });
      const responseText = completion.choices[0].message.content;
      res.json({ response: responseText });
  } catch (error) {
      console.error("Error fetching response:", error);
      res.status(500).json({ error: "Failed to generate response" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  console.log(testConnection());
});
