export async function fetchDealsFromBackend() {
  try {
    const response = await fetch("https://tsm-vrp-004d6e48b070.herokuapp.com/api/fetch-deals");
    if (!response.ok) {
      throw new Error(`Failed to fetch deals: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchDealsFromBackend:", error);
    return [];
  }
}
