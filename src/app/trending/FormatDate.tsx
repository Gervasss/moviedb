  


  export function formatDate(dateString :string) {
  if (!dateString || typeof dateString !== "string") return "N/A";

  const match = /^\d{4}/.exec(dateString);
  return match ? match[0] : "N/A";
}
