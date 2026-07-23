import { useState } from "react";
import { Link } from "react-router-dom";
import type { Book } from "../types";

function Search() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_KEY;

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Skriv något att söka efter');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20&key=${API_KEY}`
      );

      if (!res.ok) {
        throw new Error('Sökningen misslyckades');
      }

      const data = await res.json();
      if (data.items) {
        setBooks(data.items);
      } else {
        setBooks([]);
      }
      setSearched(true);
    } catch (err) {
      setError('Något gick fel vid sökningen');
      console.error(err);  
    } finally {
      setLoading(false);
    }
  }
   return (
    <div>
      <h2>Sök böcker</h2>

      <div>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Sök efter titel eller författare" />
        <button onClick={handleSearch}>Sök</button>
      </div>

      {error && <p className="error">{error}</p>}
      {loading && <p>Laddar...</p>}

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`}>
              {book.volumeInfo.title}
            </Link>
            {book.volumeInfo.authors && ` - ${book.volumeInfo.authors.join(', ')}`}
          </li>
        ))}
      </ul>

      {searched && !loading && books.length === 0 && <p>Inga böcker hittades</p>}
    </div>
   )
}
export default Search;