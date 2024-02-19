import fs from 'fs';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

const csv = fs.readFileSync('./finals.csv', { encoding: 'utf-8' });

export const connect = async ({ input, verbose = false }) => {
  const chatModel = new ChatOpenAI({
    // modelName: 'gpt-4',
    modelName: 'gpt-3.5-turbo',
    verbose,
  });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      'system',
      'You are an assistant that answers questions about UEFA Champions League finals.',
    ],
    ['user', '{input}'],
  ]);

  const outputParser = new StringOutputParser();

  const llmChain = prompt.pipe(chatModel).pipe(outputParser);

  const result = await llmChain.invoke({
    input: `The context is a csv formated list of UEFA Champions League finals. 
Based the answer ONLY on this list. The last final was 2022-23.

<context>
${csv}
</context>

Input: ${input}`,
  });

  return result;
};
