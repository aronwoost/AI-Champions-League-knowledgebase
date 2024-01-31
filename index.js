import dotenvFlow from 'dotenv-flow';
import { connect } from './connect.js';

dotenvFlow.config();

const exampleQuestions = [
  'List year and team when a spanish team won the Champions League.',
  'What was the first year, that a german team won der Champions League?',
  'Which was the final with the biggest audience?',
  'In what years did Manchester City won the Champions League?',
];

const response = await connect({
  input: exampleQuestions[Math.floor(Math.random() * exampleQuestions.length)],
});

console.log(response);
