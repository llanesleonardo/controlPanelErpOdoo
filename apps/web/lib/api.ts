export function gatewayUrl(): string {
  return (
    process.env.NEXT_PUBLIC_GATEWAY_URL?.replace(/\/$/, '') ||
    'http://localhost:3001'
  );
}

export async function gatewayFetch(
  path: string,
  init?: RequestInit & { actorId?: string; correlationId?: string },
) {
  const { actorId, correlationId, headers, ...rest } = init ?? {};
  const res = await fetch(`${gatewayUrl()}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      'X-Actor-Id': actorId ?? 'dev-operator',
      ...(correlationId ? { 'X-Correlation-Id': correlationId } : {}),
      ...headers,
    },
    cache: 'no-store',
  });
  const correlation =
    res.headers.get('x-correlation-id') ?? correlationId ?? null;
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      (body as { message?: string }).message ??
      `Gateway error ${res.status}`;
    throw new Error(message);
  }
  return { data: body, correlationId: correlation, status: res.status };
}
