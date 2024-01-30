import dotenvFlow from 'dotenv-flow';

dotenvFlow.config();

console.log("hello", process.env.OPENAI_API_KEY)