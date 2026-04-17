const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

export async function writeToSheet(action: "add" | "update" | "delete", data?: any, rowIndex?: number) {
  await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({ action, data, rowIndex })
  });
}
