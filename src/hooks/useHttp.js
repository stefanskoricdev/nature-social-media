export const useHttp = () => {
  const sendRequest = (requestConfig, applyData) => {
    const { url, method, headers, body } = requestConfig;
    fetch(url, {
      method: method ? method : "GET",
      headers: headers ? headers : {},
      body: body ? JSON.stringify(body) : null,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else throw new Error("Ooops something went wrong");
      })
      .then((data) => {
        console.log(data);
        applyData(data);
      })
      .catch((err) => console.log(err));
  };

  return { sendRequest };
};
