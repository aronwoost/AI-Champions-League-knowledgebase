import dotenvFlow from 'dotenv-flow';
import { connect } from './connect.js';
import { program } from 'commander';

program.option('-v, --verbose', 'trace output');
program.option('-q, --question <question>', 'your question');
program.parse();

const options = program.opts();
const verbose = options.verbose ? true : undefined;

dotenvFlow.config();

const exampleQuestions = [
  'List year and team when a spanish team won the Champions League.',
  'What was the first year that a german team won der Champions League?',
  'Which was the final with the biggest audience?',
  'In what years did Manchester City won the Champions League?',
];

const question =
  options.question ||
  exampleQuestions[Math.floor(Math.random() * exampleQuestions.length)];

console.log('Question:', question);

const response = await connect({
  input: question,
  verbose,
});

console.log('Answer:', response);
