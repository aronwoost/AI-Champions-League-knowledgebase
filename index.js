import dotenvFlow from 'dotenv-flow';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';

dotenvFlow.config();

const chatModel = new ChatOpenAI({});

const prompt = ChatPromptTemplate.fromMessages([
  ['system', 'You create simple geographical quiz questions.'],
  ['user', '{input}'],
]);

const chain = prompt.pipe(chatModel);

const result = await chain.invoke({
  input: 'Create a quiz question about Berlin, Germany.',
});

console.log(result);
