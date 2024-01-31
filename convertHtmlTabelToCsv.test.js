import test from 'ava';
import { convert } from './convertHtmlTabelToCsv.js';

test('should convert HTML table (happy path)', async (t) => {
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
    </tr></table>`;

  const bar = convert({ input: htmlTable });
  t.is(
    bar,
    `"Month","Savings"
"January","$100"
"February","$80"`
  );
});

test('should ignore rows with wrong length', async (t) => {
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
    <tr>
      <td>Only one td here</td>
    </tr></table>`;

  const bar = convert({ input: htmlTable });
  t.is(
    bar,
    `"Month","Savings"
"January","$100"
"February","$80"`
  );
});
