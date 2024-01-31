import test from 'ava';
import { convert } from './convertHtmlTabelToCsv.js';

test('should convert HTML table', async (t) => {
  const htmlTable = `<table>
    <tr>
      <th>Month</th>
      <th>Savings</th>
    </tr>
    <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
  `;

  const bar = convert({ input: htmlTable });
  t.is(
    bar,
    `Month,Savings
January,$100
February,$80`
  );
});
