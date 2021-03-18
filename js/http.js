export function fetchJson(url, options) {
  return fetch(url, options)
    .then((r) => {
      if (r.ok) {
        return r.json();
      } else {
        throw new Error(r.statusText);
      }
    })
    .catch((error) => {
      showError("Error loading data", error);
      throw error;
    });
}

const baseUrl = "http://localhost:3000";

export function listEmployees() {
  return fetchJson(`${baseUrl}/employees`);
}

export function listRoles() {
  return fetchJson(`${baseUrl}/roles`);
}
