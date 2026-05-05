export async function ssrFetch<T>(endpoint: string): Promise<{ data?: T; error?: string }> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const res = await fetch(`${baseUrl}${endpoint}`);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

    const json = await res.json(); 
    const data: T = json.data;      
    
    return { data }; 
  } catch (err: any) {
    return { error: err.message };
  }
}
