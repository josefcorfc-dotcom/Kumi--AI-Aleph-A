import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini Client
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is missing. AI features will return fallback answers.');
    }
    return new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // API Endpoint: Analyze NeuroBIN Simulation & Theory
  app.post('/api/gemini/analyze', async (req, res) => {
    try {
      const { params, metrics, prompt } = req.body;
      const ai = getGeminiClient();

      const systemInstruction = `
You are the NeuroBIN Scientific Intelligence Assistant.
The user is exploring the Cantor Recursion paradigm: ∞ - n = NeuroBIN.
NeuroBIN unifies biological neuronal action potentials ("Neuro" - natural living neurons and electrical impulses) and digital binary computer code ("BIN" - artificial binary 0/1 bits and clock signals).

Context provided:
- Cantor Recursion Depth (n): ${params?.cantorDepth ?? 4}
- Biological Membrane Threshold: ${params?.thresholdMv ?? -55} mV
- Binary Clock Frequency: ${params?.clockFreqHz ?? 20} Hz
- Coupling Strength: ${params?.couplingStrength ?? 0.5}
- Cantor Fractal Dimension: D = ln(2)/ln(3) ≈ 0.6309
- Measured Firing Rate: ${metrics?.meanFiringRateHz ?? 35} Hz

Provide an insightful, mathematically accurate, and fascinating explanation answering the user query.
Keep answers concise, scannable, and formatted cleanly with markdown.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt || 'Analyze how Cantor recursion (∞ - n = NeuroBIN) transforms continuous membrane potentials into discrete binary electrical pulse streams.',
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error: unknown) {
      console.error('Gemini API Error:', error);
      res.status(500).json({
        error: 'Failed to analyze with Gemini API.',
        text: 'The Cantor-NeuroBIN analysis encountered an error. Please verify your GEMINI_API_KEY configuration in Secrets.',
      });
    }
  });

  // API Endpoint: Conversational Chat Assistant
  app.post('/api/gemini/chat', async (req, res) => {
    try {
      const { messages, userPrompt } = req.body;
      const ai = getGeminiClient();

      const systemInstruction = `
You are the NeuroBIN Interactive Laboratory AI, an expert on Georg Cantor's set theory, Hodgkin-Huxley neuronal action potential dynamics, digital logic clock cycles, and the theoretical bridge: ∞ - n = NeuroBIN.
Explain complex bio-digital phenomena clearly, elegantly, and engagingly.
`;

      const chat = ai.chats.create({
        model: 'gemini-3.6-flash',
        config: {
          systemInstruction,
        },
      });

      // Send recent messages if provided, or direct prompt
      const response = await chat.sendMessage({
        message: userPrompt || 'Explain the concept of NeuroBIN.',
      });

      res.json({ text: response.text });
    } catch (error: unknown) {
      console.error('Gemini Chat Error:', error);
      res.status(500).json({
        error: 'Gemini Chat service error.',
        text: 'Unable to connect to Gemini AI assistant.',
      });
    }
  });

  // API Endpoint: KUMI AEA Asset Mapping (Mock BigQuery / Gemini Integration)
  app.get('/api/kumi/asset-mapping', (req, res) => {
    res.json({
      id: 'ALEPH-SIGMA-EVAL-VOMINI-8K',
      status: 'ACTIVO',
      resilience: 99.9999,
      symmetryIndex: 0.99998,
      syncSource: 'BigQuery_Gemini_Mesh'
    });
  });

  // Serve Frontend Assets (Vite middleware in Dev, Static in Prod)
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NeuroBIN Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
