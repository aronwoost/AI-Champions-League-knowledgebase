# AI Champions League knowledgebase

This OpenAI based knowledgebase answers questions about Champions League finals.
It works by providing a [CSV file](./finals.csv) ([taken from Wikipedia](https://en.wikipedia.org/wiki/List_of_European_Cup_and_UEFA_Champions_League_finals)) with all finals.

This app has to visual interface, instead it's used by command line.

### Getting started

1. Checkout this repo
2. `npm install`
3. Rename `.env.example` to `.env` and add your `OPENAI_API_KEY`
4. `node index.js -q "In what years did Manchester City won the Champions League?"`

### Testing

```
npm test
```
