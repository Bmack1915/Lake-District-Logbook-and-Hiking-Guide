export default function Search({ placeholder, query, setQuery }) {
  return (
    <input
      className="search w-[25vh]"
      type="text"
      placeholder={`Search ${placeholder}...`}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
