import data from "../data/resources.json";

/**
 * Local resource search (mock Firebase)
 * Used by SidePanel
 */
export async function searchResources(keyword) {
  if (!keyword) return [];

  const q = keyword.toLowerCase();

  return data.filter(resource =>
    resource.label.toLowerCase().includes(q) ||
    resource.tags.some(tag => tag.toLowerCase().includes(q))
  );
}
