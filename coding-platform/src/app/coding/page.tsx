'use client'

import React, { useState, useEffect, useRef } from 'react'
import { CheckCircle, XCircle, Send, User, Bot, Terminal } from 'lucide-react'
import MonacoEditor from '@monaco-editor/react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from 'framer-motion'

interface ExecuteResponse {
  passed: number;
  total: number;
  results: TestCaseResult[];
  executionTime: number;
}

interface TestCaseResult {
  passed: boolean;
  input: any;
  output: any;
  expected: any;
  error: string | null;
  executionTime: number;
}

const problems = [
  {
    id: 1,
    title: "Sum of Array",
    functionName: "sum_array",
    description: "Write a function that calculates the sum of all elements in an array.",
    initialCode: "def sum_array(arr):\n    # Your code here\n    pass",
    testCases: [
      { input: [1, 2, 3, 4, 5], expected: 15 },
      { input: [-1, 0, 1], expected: 0 },
      { input: [], expected: 0 },
    ],
  },
  {
    id: 2,
    title: "Max Element in Array",
    functionName: "max_element",
    description: "Write a function that returns the maximum element in an array.",
    initialCode: "def max_element(arr):\n    # Your code here\n    pass",
    testCases: [
      { input: [1, 2, 3, 4, 5], expected: 5 },
      { input: [-1, -5, -3, -2], expected: -1 },
      { input: [10], expected: 10 },
    ],
  },
  {
    id: 3,
    title: "Reverse Array",
    functionName: "reverse_array",
    description: "Write a function that returns the array in reverse order.",
    initialCode: "def reverse_array(arr):\n    # Your code here\n    pass",
    testCases: [
      { input: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1] },
      { input: [9, 8, 7], expected: [7, 8, 9] },
      { input: [], expected: [] },
    ],
  },
  {
    id: 4,
    title: "Check for Duplicates",
    functionName: "has_duplicates",
    description: "Write a function that checks if there are any duplicate elements in the array.",
    initialCode: "def has_duplicates(arr):\n    # Your code here\n    pass",
    testCases: [
      { input: [1, 2, 3, 4, 5], expected: false },
      { input: [1, 2, 2, 3], expected: true },
      { input: [], expected: false },
    ],
  },
  {
    id: 5,
    title: "Count Even Numbers",
    functionName: "count_even",
    description: "Write a function that counts the number of even numbers in the array.",
    initialCode: "def count_even(arr):\n    # Your code here\n    pass",
    testCases: [
      { input: [1, 2, 3, 4, 5], expected: 2 },
      { input: [2, 4, 6, 8], expected: 4 },
      { input: [1, 3, 5, 7], expected: 0 },
    ],
  },
  {
    id: 6,
    title: "Find Index of Element",
    functionName: "find_index",
    description: "Write a function that returns the index of the first occurrence of an element in an array.",
    initialCode: "def find_index(arr, element):\n    # Your code here\n    pass",
    testCases: [
      { input: [[1, 2, 3, 4, 5], 3], expected: 2 },
      { input: [[9, 8, 7, 6], 6], expected: 3 },
      { input: [[1, 2, 3], 4], expected: -1 },
    ],
  },
  {
    id: 7,
    title: "Remove Element",
    functionName: "remove_element",
    description: "Write a function that removes all occurrences of a specified element from an array.",
    initialCode: "def remove_element(arr, element):\n    # Your code here\n    pass",
    testCases: [
      { input: [[1, 2, 3, 2, 4, 2], 2], expected: [1, 3, 4] },
      { input: [[5, 6, 7], 6], expected: [5, 7] },
      { input: [[], 3], expected: [] },
    ],
  },
  {
    id: 8,
    title: "Array Product",
    functionName: "product_array",
    description: "Write a function that returns the product of all elements in an array.",
    initialCode: "def product_array(arr):\n    # Your code here\n    pass",
    testCases: [
      { input: [1, 2, 3, 4, 5], expected: 120 },
      { input: [10, 0, 5], expected: 0 },
      { input: [], expected: 1 },
    ],
  },
  {
    id: 9,
    title: "Find Missing Number",
    functionName: "find_missing",
    description: "Write a function that finds the missing number from an array of consecutive integers.",
    initialCode: "def find_missing(arr):\n    # Your code here\n    pass",
    testCases: [
      { input: [1, 2, 3, 5], expected: 4 },
      { input: [10, 11, 12, 14], expected: 13 },
      { input: [7, 8, 10], expected: 9 },
    ],
  },
  {
    id: 10,
    title: "Count Occurrences of Element",
    functionName: "count_occurrences",
    description: "Write a function that counts how many times a given element appears in the array.",
    initialCode: "def count_occurrences(arr, element):\n    # Your code here\n    pass",
    testCases: [
      { input: [[1, 2, 2, 3, 2], 2], expected: 3 },
      { input: [[5, 5, 5, 5, 5], 5], expected: 5 },
      { input: [[1, 2, 3, 4, 5], 6], expected: 0 },
    ],
  },
];

const CodingPage = () => {
  const [code, setCode] = useState(problems[0].initialCode)
  const [currentProblem, setCurrentProblem] = useState(0)
  const [testResults, setTestResults] = useState<TestCaseResult[]>([])
  const [output, setOutput] = useState('')
  const [isExecuting, setIsExecuting] = useState(false)
  const [aiMessages, setAiMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: `Welcome to CodeLearn! Let's get started with your first problem: ${problems[0].title}. ${problems[0].description}` },
  ])
  const [userInput, setUserInput] = useState('')
  const [responseData, setResponseData] = useState<ExecuteResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState("assistant")

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [aiMessages])

  const executeCode = async () => {
    setIsExecuting(true)
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:3001/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          testCases: problems[currentProblem].testCases,
          functionName: problems[currentProblem].functionName,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to execute code')
      }

      const data: ExecuteResponse = await response.json()
      setResponseData(data)
      setTestResults(data.results)
      
      const executionTime = typeof data.executionTime === 'number' ? data.executionTime.toFixed(2) : 'N/A';
      
      const outputMessage = `Passed ${data.passed}/${data.total} test cases. Execution time: ${executionTime}ms`
      setOutput(outputMessage)

      // Send code execution results to AI for review
      const aiMessage = `
        Problem: ${problems[currentProblem].title}
        Description: ${problems[currentProblem].description}
        
        Code:
        ${code}
        
        Execution Results:
        ${outputMessage}
        
        Test Case Results:
        ${data.results.map((result, index) => `
          Test Case ${index + 1}: ${result.passed ? 'Passed' : 'Failed'}
          Input: ${JSON.stringify(result.input)}
          Expected: ${JSON.stringify(result.expected)}
          Output: ${JSON.stringify(result.output)}
          ${result.error ? `Error: ${result.error}` : ''}
          Execution Time: ${result.executionTime.toFixed(2)}ms
        `).join('\n')}
        
        Please review the code and provide feedback on its correctness, efficiency, and any potential improvements.`
      
      await sendToAI(aiMessage)

      // Check if all test cases passed
      if (data.passed === data.total) {
        if (currentProblem < problems.length - 1) {
          const nextProblem = currentProblem + 1;
          setCurrentProblem(nextProblem);
          setCode(problems[nextProblem].initialCode);
          setOutput('');
          setTestResults([]);
          setResponseData(null);
          
          setAiMessages(prev => [...prev, { 
            role: 'system', 
            content: `Great job! You've completed the current problem. Here's the next one: ${problems[nextProblem].title}. ${problems[nextProblem].description}`
          }]);
        } else {
          setAiMessages(prev => [...prev, { 
            role: 'system', 
            content: "Congratulations! You've completed all the problems. Great job!"
          }]);
        }
      }

    } catch (err: any) {
      const errorMessage = `Error: ${err.message}`
      setError(errorMessage)
      setOutput(errorMessage)
      await sendToAI(`An error occurred during code execution: ${errorMessage}. Please provide guidance on how to fix this error.`)
    } finally {
      setIsExecuting(false)
      setLoading(false)
    }
  }

  const sendToAI = async (message: string) => {
    try {
      const response = await fetch('http://localhost:3001/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message,
          problem: problems[currentProblem],
          currentCode: code
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const result = await response.json()
      setAiMessages(prev => [...prev, { role: 'assistant', content: result.response }])
      setActiveTab("assistant")
    } catch (error) {
      console.error('Error getting AI response:', error)
      setAiMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error while processing your request." }])
    }
  }

  const handleUserMessage = async () => {
    if (userInput.trim()) {
      const userMessage = `
        Problem: ${problems[currentProblem].title}
        Description: ${problems[currentProblem].description}
        
        Current Code:
        ${code}
        
        User Question: ${userInput}
      `
      setAiMessages(prev => [...prev, { role: 'user', content: userInput }])
      await sendToAI(userMessage)
      setUserInput('')
    }
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* AI Assistant and Test Cases Pane */}
      <div className="w-1/3 p-4 bg-gray-800 flex flex-col overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
            <TabsTrigger value="testcases">Test Cases</TabsTrigger>
          </TabsList>
          <TabsContent value="assistant" className="flex-grow overflow-hidden flex flex-col">
            <ScrollArea className="flex-grow pr-4">
              <AnimatePresence>
                {aiMessages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`mb-4 p-3 rounded-lg ${
                      message.role === 'assistant' ? 'bg-green-900 text-green-100' : 
                      message.role === 'user' ? 'bg-blue-900 text-blue-100' : 
                      'bg-yellow-900 text-yellow-100'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      {message.role === 'assistant' ? (
                        <Bot className="mr-2" size={20} />
                      ) : message.role === 'user' ? (
                        <User className="mr-2" size={20} />
                      ) : (
                        <Terminal className="mr-2" size={20} />
                      )}
                      <strong>{
                        message.role === 'assistant' ? 'AI Assistant' : 
                        message.role === 'user' ? 'You' : 
                        'System'
                      }</strong>
                    </div>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </ScrollArea>
            <div className="mt-4 flex">
              <Input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleUserMessage()}
                placeholder="Ask the AI assistant..."
                className="flex-grow mr-2 text-black"
              />
              <Button onClick={handleUserMessage} className="bg-blue-500 hover:bg-blue-600">
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="testcases" className="flex-grow overflow-hidden">
            <ScrollArea className="h-full">
              <div className="space-y-4 p-4">
                {testResults.map((result, index) => (
                  <Card key={index} className={`${result.passed ? 'bg-green-900' : 'bg-red-900'} max-w-md mx-auto`}>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        {result.passed ? (
                          <CheckCircle className="text-green-400 mr-2" size={20} />
                        ) : (
                          <XCircle className="text-red-400 mr-2" size={20} />
                        )}
                        Test Case {index + 1}: {result.passed ? 'Passed' : 'Failed'}
                      </h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <strong>Input:</strong> {JSON.stringify(result.input)}
                        </div>
                        <div>
                          <strong>Output:</strong> {JSON.stringify(result.output)}
                        </div>
                        <div>
                          <strong>Expected:</strong> {JSON.stringify(result.expected)}
                        </div>
                        <div>
                          <strong>Execution Time:</strong> {result.executionTime.toFixed(2)}ms
                        </div>
                      </div>
                      {result.error && (
                        <div className="mt-2 text-red-300">
                          <strong>Error:</strong> {result.error}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {/* Code Editor and Output Pane */}
      <div className="w-2/3 p-4 flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <h2 className="text-xl font-bold mb-2">
            Problem {currentProblem + 1}: {problems[currentProblem].title}
          </h2>
          <p className="mb-4 text-gray-300">{problems[currentProblem].description}</p>
          <div className="flex-grow overflow-hidden">
            <MonacoEditor
              height="100%"
              language="python"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
            />
          </div>
        </div>
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <Button 
            onClick={executeCode} 
            disabled={isExecuting}
            className="bg-green-500 hover:bg-green-600 transition-colors duration-200"
          >
            {isExecuting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2"
                >
                  <Terminal className="h-4 w-4" />
                </motion.div>
                Executing...
              </>
            ) : (
              <>
                <Terminal className="h-4 w-4 mr-2" />
                Submit
              </>
            )}
          </Button>
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Output:</h2>
            <ScrollArea className="h-40">
              <pre className="bg-gray-700 p-4 rounded-lg whitespace-pre-wrap text-sm">
                {output || 'No output yet'}
              </pre>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodingPage