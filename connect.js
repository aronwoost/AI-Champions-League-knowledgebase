import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio';
import { convert } from './convertHtmlTabelToCsv.js';

export const connect = async ({ input, verbose = false }) => {
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

  const csv = convert({ input: `<table>${text}</table>` });

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
    input: `The current date is ${new Date().toJSON()} .The context is a csv
formated list of UEFA Champions League finals. Based the answer ONLY on this
list.

 <context>
 ${csv}
 </context>
 
 Input: ${input}`,
  });

  return result;
};
