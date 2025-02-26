import PropTypes from "prop-types";

export default function Pagination({
  currentPage,
  totalPosts,
  postsPerPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  function handlePrevious() {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }

  function handleNext() {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }

  function createMiddlePages() {
    const middlePagesStart = Math.max(2, currentPage - 3);
    const middlePagesEnd = Math.min(totalPages - 1, currentPage + 3);
    return createRange(middlePagesStart, middlePagesEnd);
  }

  function getVisiblePageNumbers() {
    if (totalPages <= 10) {
      return createRange(1, totalPages);
    }

    if (currentPage <= 6) {
      const lastPageBeforeEllipses = 8;
      return [...createRange(1, lastPageBeforeEllipses), "...", totalPages];
    }

    if (currentPage >= totalPages - 5) {
      return [1, "...", ...createRange(totalPages - 8, totalPages)];
    }

    return [1, "...", ...createMiddlePages(), "...", totalPages];
  }

  function createRange(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  return (
    <div>
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>

      {getVisiblePageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ) : (
          <span key={`ellipses-${index}`} style={{ margin: "0px 5px" }}>
            {page}
          </span>
        )
      )}

      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
  postsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
