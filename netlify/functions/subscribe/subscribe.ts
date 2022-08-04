import { Handler } from '@netlify/functions'
const mailchimp = require('@mailchimp/mailchimp_marketing');

mailchimp.setConfig({
  apiKey: '0f878ada0fad58181dabfbe87a6b309f-us13',
  server: 'us13',
});

export const handler: Handler = async (event, context) => {
  const { name = 'stranger' } = event.queryStringParameters!;

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: mailchimp.lists.getAllLists(),
    }),
  };
}
