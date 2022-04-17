import { useState } from "react";

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const sendRequest = (requestConfig, applyData, additionalData) => {
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
        //Avoid awkward glitches when request is fast
        setTimeout(() => {
          setIsLoading(false);
        }, [200]);
        //Use additional data to update state if needed
        if (additionalData) {
          applyData(additionalData);
          return;
        }
        //if not, use response from server to update state
        applyData(data);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  return { sendRequest, isLoading, error, setError };
};
