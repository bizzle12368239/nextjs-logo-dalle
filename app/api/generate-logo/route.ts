import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'OpenAI API key not set.' }), { status: 500 });
  }

  try {
    const dalleRes = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt,
        n: 1,
        size: '1024x1024',
        model: 'dall-e-3'
      })
    });

    if (!dalleRes.ok) {
      const error = await dalleRes.text();
      return new Response(JSON.stringify({ error }), { status: dalleRes.status });
    }
    const data = await dalleRes.json();
    return new Response(JSON.stringify({ url: data.data[0].url }), { status: 200 });
  } catch (error: unknown) {
    let errorMessage = 'Unknown error';
    if (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string') {
      errorMessage = (error as any).message;
    }
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
}
