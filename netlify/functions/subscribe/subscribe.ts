import { Handler } from '@netlify/functions';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY! }).base(process.env.AIRTABLE_BASE!);

export const handler: Handler = async (event, context) => {
  console.log(event.body);
  const body = JSON.parse(event.body!);

  await base('Early Adopters').create([
    {
      fields: {
        'Email': body?.email,
        'Portfolio': body?.portfolio
      }
    }
  ], (err: any) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTION"
    },
    body: JSON.stringify({
      message: 'success'
    }),
  };
}
