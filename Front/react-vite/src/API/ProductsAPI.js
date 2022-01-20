export async function deleteProductById(id) {
    const options = {
        method: 'DELETE'
    }
    return await fetch("https://localhost:7000/api/Products/delete/" + id, options);
}

export async function getProducts(page, pageSize) {
    return await fetch("https://localhost:7000/api/Products?page=" + page + '&pageSize=' + pageSize).then(x => x.json());
}

export async function getProductById(id) {
    return await fetch("https://localhost:7000/api/products/" + id).then(x => x.json());
}

export async function updateProduct(product) {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    const options = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(product)
    }

    return await fetch("https://localhost:7000/api/Products/update", options);
}

export async function addProduct(product) {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(product)
    }

    return await fetch("https://localhost:7000/api/Products/add", options);
}