// Logic reworked from here: https://www.geeksforgeeks.org/how-to-export-html-table-to-csv-using-javascript/

import * as cheerio from 'cheerio';

export const convert = ({ input }) => {
  // Variable to store the final csv data
  let csv_data = [];

  const $ = cheerio.load(input);

  // Get each row data
  let rows = $('tr');
  for (let i = 0; i < rows.length; i++) {
    // Get each column data
    let cols = $(rows[i]).find('td,th');

    // console.log({ cols });

    // Stores each csv row data
    let csvrow = [];
    for (let j = 0; j < cols.length; j++) {
      // Get the text data of each cell of
      // a row and push it to csvrow
      csvrow.push($(cols[j]).text());
    }

    // Combine each column value with comma
    csv_data.push(csvrow.join(','));
  }
  // Combine each row data with new line character
  csv_data = csv_data.join('\n');

  return csv_data;
};
