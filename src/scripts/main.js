const BASE_API = "http://localhost:3000";

//GET
export async function getFunction(endpoint) {
    const response = await fetch(`${BASE_API}/${endpoint}`);
    return response.json();
}

//POST
export async function postFunction(endpoint, data) {
    const response = await fetch(`${BASE_API}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return response.json();
}

//PUT
export async function putFunction(endpoint, data) {
    const response = await fetch(`${BASE_API}/${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return response.json();
}

//PATCH
export async function patchFunction(endpoint, data) {
    const response = await fetch(`${BASE_API}/${endpoint}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return response.json();
}

//DELETE
export async function deleteFunction(endpoint, id) {
    const response = await fetch(`${BASE_API}/${endpoint}/${id}`, {
        method: "DELETE"
    });
    return response.ok;
}