import dotenvFlow from 'dotenv-flow';
import test from 'ava';

import { connect } from './connect.js';

dotenvFlow.config();

test('should answer document-based question corrent', async (t) => {
  const response = await connect({
    input: 'In what years did Manchester City won the Champions League?',
  });

  t.is(response.includes('2022-23'), true);
});
