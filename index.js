import dotenvFlow from 'dotenv-flow';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

dotenvFlow.config();

const chatModel = new ChatOpenAI({});

const prompt = ChatPromptTemplate.fromMessages([
  ['system', 'You create simple geographical quiz questions.'],
  ['user', '{input}'],
]);

const outputParser = new StringOutputParser();

const llmChain = prompt.pipe(chatModel).pipe(outputParser);

const result = await llmChain.invoke({
  input: 'Create a quiz question about Berlin, Germany.',
});

console.log(result);
