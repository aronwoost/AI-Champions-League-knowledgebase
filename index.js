import dotenvFlow from 'dotenv-flow';
import { ChatOpenAI } from '@langchain/openai';

dotenvFlow.config();

const chatModel = new ChatOpenAI({});

const result = await chatModel.invoke('What is the capital of Germany?');

console.log(result);
