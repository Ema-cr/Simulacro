export async function get(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in GET:", error);
  }
}

export async function post(url, body) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in POST:", error);
  }
}

export async function put(url, id, body) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body) // body should be an object like { title, body, userId }
    });

    const data = await response.json();
    console.log("PUT updated:", data);
    return data;
  } catch (error) {
    console.error("Error in PUT:", error);
    throw error;
  }
}

export async function del(url, id) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      console.log("DELETE: resource deleted successfully");
      return true;
    } else {
      console.error("Error deleting resource");
      return false;
    }
  } catch (error) {
    console.error("Error in DELETE:", error);
    throw error;
  }
}
