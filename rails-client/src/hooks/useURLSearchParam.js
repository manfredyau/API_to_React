import { useState, useEffect } from "react";

export default function useURLSearchParam(paramName, initialValue = "") {
  const query = new URLSearchParams(window.location.search);
  const [value, setValue] = useState(query.get(paramName) || initialValue);
  useEffect(() => {
    const newUrl = value
      ? `${window.location.pathname}?${paramName}=${value}`
      : window.location.pathname;
    window.history.pushState({}, "", newUrl);
  }, [paramName, value]);

  return [value, setValue];
}
