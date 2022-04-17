import { useState } from "react";

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = (requestConfig, applyData) => {
    const { url, method, headers, body } = requestConfig;
    setIsLoading(true);
    fetch(url, {
      method: method ? method : "GET",
      headers: headers ? headers : {},
      body: body ? JSON.stringify(body) : null,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(
            "Ooops something went wrong. Please try again later."
          );
        }
      })
      .then((data) => {
        applyData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  return { sendRequest, isLoading, error, setError };
};
