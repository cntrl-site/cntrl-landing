import { Handler } from '@netlify/functions'
import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: '0f878ada0fad58181dabfbe87a6b309f-us13',
  server: 'us13',
});

export const handler: Handler = async (event, context) => {
  const { email = 'test@google.com' } = event.queryStringParameters!;

  const response = await mailchimp.lists.getListMember('1130385', '515235917');

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: response,
    }),
  };
}
