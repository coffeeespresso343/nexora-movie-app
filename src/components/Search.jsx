const Search = ({ searchTerm, setSearchTerm, searchRef, placeholder }) => {
  return (
    <div className="search mt-10 mb-10">
      <div>
        <span aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="m21 21-4.34-4.34" />
            <circle cx="11" cy="11" r="8" />
          </svg>
        </span>

        <input
          ref={searchRef}
          type="text"
          placeholder={placeholder || "Search movies, series..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search movies and series"
          spellCheck="false"
        />

        {/* Clear Button  */}
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            aria-label="Clear search"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
