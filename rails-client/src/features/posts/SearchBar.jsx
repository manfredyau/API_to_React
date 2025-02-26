import { useRef } from "react";
import PropTypes from "prop-types";

export default function SearchBar({
  value,
  onSearchChange,
  onImmediateChange,
}) {
  const searchDebounceRef = useRef(null);

  function handleSearchChange(e) {
    const searchValue = e.target.value;

    onImmediateChange(searchValue);
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    searchDebounceRef.current = setTimeout(() => {
      onSearchChange(searchValue);
    }, 500);
  }

  return (
    <input
      type="text"
      placeholder="Search for posts"
      value={value}
      onChange={handleSearchChange}
    />
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onImmediateChange: PropTypes.func.isRequired,
};
