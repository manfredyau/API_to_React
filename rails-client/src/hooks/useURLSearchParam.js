import { useSearchParams } from "react-router-dom";

export default function useURLSearchParam(paramName, initialValue = "") {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramValue = searchParams.get(paramName) || initialValue;
  const setParamValue = (newValue) => {
    if (newValue) {
      setSearchParams({
        ...Object.fromEntries(new URLSearchParams(window.location.search)),
        [paramName]: newValue,
      });
      console.log(`searchParams: ${searchParams.toString()}`)
    } else {
      searchParams.delete(paramName);
      setSearchParams(searchParams);
    }
  };

  return [paramValue, setParamValue];
}
