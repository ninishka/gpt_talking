export const dynamic = 'force-dynamic';

export async function POST(request) {
  const { message } = await request.json();
  console.log('message', message);

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'gpt-talk', 
    },
    body: JSON.stringify({
      model: 'google/gemini-2.0-flash-exp:free', 
      messages: [{ role: 'user', content: message }],
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content;

  console.log('data', data);
  console.log('reply', reply);

  return Response.json({ reply });
}
