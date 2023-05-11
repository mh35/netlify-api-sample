import { Handler } from '@netlify/functions'

export const handler: Handler = async (event, context) => {
  const url = process.env.API_URL;
  if (url === undefined) {
    return {
      statusCode: 500,
      body: JSON.stringify({result: "API URL is not set"})
    };
  }
  const data = event.body;
  if (data === null) {
    return {
      statusCode: 400,
      body: JSON.stringify({reult: "No body provided"})
    };
  }
  try {
    const resp = await fetch(url, {
      method: "POST",
      body: data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const rData = await resp.json();
    return {
      statusCode: 200,
      body: JSON.stringify(rData)
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({result: "API failed"})
    };
  }
}