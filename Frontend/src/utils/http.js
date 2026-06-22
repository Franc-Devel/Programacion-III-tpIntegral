export async function parseResponse(response) {
  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('Invalid server response');
  }
  if (!response.ok) {
    console.log('Respuesta de la Api', data);
    throw new Error(data?.message || data?.error || 'Request failed');
  }
  return data;
}