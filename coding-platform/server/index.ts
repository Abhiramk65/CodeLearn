import express, { Request, Response } from 'express';
import cors from 'cors';
import { exec, ExecOptions } from 'child_process';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import { Groq } from 'groq-sdk';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Groq client
const groq = new Groq({
  apiKey: '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',
});

// Promisify exec for async/await usage
const execPromise = promisify(exec);

// Configure CORS to allow requests from frontend
app.use(cors({
  origin: "http://localhost:3000", // Frontend URL
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use(express.json());

const TEMP_DIR = path.join(process.cwd(), 'temp');

// Helper function to clean up temp files
const cleanUpTempFiles = async (filePath: string) => {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error(`Error deleting temp file ${filePath}:`, error);
  }
};

app.post('/execute', async (req: Request, res: Response) => {
  const { code, testCases, functionName } = req.body;

  try {
    // Ensure the temporary directory exists
    await fs.mkdir(TEMP_DIR, { recursive: true });

    // Execute all test cases concurrently
    const results = await Promise.all(testCases.map(async (testCase: any) => {
      const { input, expected } = testCase;

      // Construct the test script
      const testScript = `
import json

${code}

try:
    result = ${functionName}(${JSON.stringify(input)})
    print(json.dumps({"result": result}))
except Exception as e:
    print(json.dumps({"error": str(e)}))
      `;

      // Generate a unique filename for the test script
      const testFileName = `${uuidv4()}-test.py`;
      const testFilePath = path.join(TEMP_DIR, testFileName);

      try {
        // Write the test script to a temporary file
        await fs.writeFile(testFilePath, testScript);

        // Execute the test script
        const startTime = Date.now();
        const options: ExecOptions = {
          timeout: 5000, // 5 seconds timeout per test case
        };
        const { stdout, stderr } = await execPromise(`python "${testFilePath}"`, options);
        const executionTime = Date.now() - startTime;

        // Handle stderr output
        if (stderr) {
          return { passed: false, output: null, expected, error: stderr.trim(), executionTime };
        }

        // Ensure stdout is not empty
        if (!stdout.trim()) {
          return { passed: false, output: null, expected, error: 'No output from script.', executionTime };
        }

        // Parse the JSON output from the Python script
        let output;
        try {
          output = JSON.parse(stdout.trim());
        } catch (parseError) {
          return { passed: false, output: null, expected, error: 'Invalid JSON output.', executionTime };
        }

        // Check for execution errors
        if (output.error) {
          return { passed: false, output: null, expected, error: output.error, executionTime };
        }

        // Validate the result
        const passed = JSON.stringify(output.result) === JSON.stringify(expected);
        return { passed, output: output.result, expected, error: null, executionTime };
      } catch (error: any) {
        // Handle execution errors (e.g., timeout, syntax errors)
        return { passed: false, output: null, expected, error: error.message, executionTime: 0 };
      } finally {
        // Clean up the temporary test script file
        await cleanUpTempFiles(testFilePath);
      }
    }));

    // Aggregate the results
    const passed = results.filter(r => r.passed).length;
    const total = results.length;
    const sumExecutionTime = results.reduce((sum, r) => sum + (r.executionTime || 0), 0);
    const averageExecutionTime = total > 0 ? sumExecutionTime / total : 0;

    // Debugging: Log average execution time and results
    console.log(`Average Execution Time: ${averageExecutionTime.toFixed(2)} ms`);
    console.log('Execution Results:', { passed, total, results, executionTime: averageExecutionTime });

    // Respond with the aggregated results, ensuring executionTime is a number
    res.json({
      passed,
      total,
      results,
      executionTime: Number(averageExecutionTime.toFixed(2))
    });
  } catch (error: any) {
    console.error('Execution error:', error);
    res.status(500).json({ error: 'Server error during code execution.', details: error.message });
  }
});

// AI Endpoint remains unchanged
app.post('/ai', async (req: Request, res: Response) => {
  const { message } = req.body;
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an AI coding assistant for a coding platform. Provide helpful feedback and suggestions based on the code execution results. Dont give the exact solution. Just give the user a hint on how to improve their code. keep the response very short and concise. max 10 words. Keep the conversation lively for regular conversational messages.',
        },
        {
          role: 'user',
          content: message,
        },
      ],
      model: 'llama-3.2-3b-preview'
    });
  
    const aiResponse = completion.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';
    res.json({ response: aiResponse });
  } catch (error) {
    console.error('Error getting AI response:', error);
    res.status(500).json({ error: 'Failed to get AI response.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});