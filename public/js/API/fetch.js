const getAPI = async url => {
  const response = await fetch(url);
  return await response.json();
};

const postAPI = async (url, payload) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      payload
    )
  });
  return await response.json();
};

const deleteAPI = async (url) => {
  const response = await fetch(url, {
    method: "DELETE"
  })

  return await response.json();
}

export { getAPI, postAPI };
