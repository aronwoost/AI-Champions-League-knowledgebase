import dotenvFlow from 'dotenv-flow';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio';

dotenvFlow.config();

export const connect = async ({ input }) => {
  const loader = new CheerioWebBaseLoader(
    'https://en.wikipedia.org/wiki/List_of_European_Cup_and_UEFA_Champions_League_finals',
    {
      timeout: 2000,
    }
  );

  const $ = await loader.scrape();

  $('a').contents().unwrap();
  $('.flagicon').remove();
  $('sup').remove();
  $('[style]').removeAttr('style');
  $('[class]').removeAttr('class');
  $('[title]').removeAttr('title');
  $('[scope]').removeAttr('scope');
  $('[align]').removeAttr('align');
  $('[colspan]').removeAttr('colspan');
  $('[rowspan]').removeAttr('rowspan');
  $('[bgcolor]').removeAttr('bgcolor');
  $('[data-sort-value]').removeAttr('data-sort-value');
  $('span').contents().unwrap();

  const text = $('table')
    .eq(2)
    .html()
    .replace(/(\r\n|\n|\r)/gm, '');

  console.log(text.length);

  const chatModel = new ChatOpenAI({
    modelName: 'gpt-4',
    // modelName: 'gpt-3.5-turbo',
    verbose: true,
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
    input: `The context is a list of UEFA Champions League finals. Based on this list you answer questions.

  <context>
  ${text}
  </context>
  
  Input: ${input}`,
  });

  console.log(result);
};
