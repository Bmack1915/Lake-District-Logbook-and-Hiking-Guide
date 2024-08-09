export default function Search({ placeholder, query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder={`Search ${placeholder}...`}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
