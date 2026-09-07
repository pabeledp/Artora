export async function GET() {
  return new Response('google-site-verification: google6fb04044b58d987c.html', {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
