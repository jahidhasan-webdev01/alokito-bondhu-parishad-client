const API = process.env.NEXT_PUBLIC_API_URL;

export async function getPayments(params: Record<string, string>) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      query.append(key, value);
    }
  });

  const res = await fetch(
    `${API}/payments?${query.toString()}`,
    {
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch payments");
  }

  return res.json();
}