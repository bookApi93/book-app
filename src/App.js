import { useState } from "react";
import "./App.css";
import bookimg from "./book-1.jpeg";
import nobook from "./nobook.jpeg";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const apikey = process.env.REACT_APP_API_KEY;
  function handleChange(e) {
    console.log("ererer", e.target.value);
    setInputValue(e.target.value);
  }
  async function handleClick() {
    console.log("enter", inputValue, apikey);
    setLoading(true);
    try {
      console.log("enter", inputValue, apikey);
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${inputValue}&key=${apikey}&maxResults=20`
      );
      console.log("res", response.data);
      setBooks(response.data.items || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center">
      <img
        src={bookimg}
        alt="Books background"
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 p-6 text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 font-bold">
          Explore the World of Books
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-lg mx-auto">
          Search for your favorite books, discover new authors, and dive into
          the endless possibilities of reading. Start your journey here.
        </p>

        <div className="relative flex w-full max-w-xl mx-auto mb-12">
          <input
            type="text"
            className="w-full px-5 py-3 text-black rounded-full outline-none"
            placeholder="Search books..."
            value={inputValue}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleClick();
              }
            }}
          />
          <button
            className="absolute right-0 px-6 py-3 bg-yellow-500 text-black rounded-full hover:bg-yellow-600"
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:grid-cols-3 gap-8 mt-12">
          {books.map((book) => {
            const imgSrc =
              book.volumeInfo?.imageLinks?.smallThumbnail || nobook;
            return (
              <a
                className=""
                key={book.id}
                href={book.volumeInfo.previewLink}
                target="_blank"
                rel="noreferrer"
              >
                <div className="relative group h-[20rem] p-4 bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={book.volumeInfo.title}
                    className="w-full rounded transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-sm font-bold mb-2">
                      <span className="text-gray-400">Title: </span>
                      {book.volumeInfo.title}
                    </h3>
                    <p className="text-sm font-bold">
                      <span className="text-gray-400">Author: </span>
                      {book.volumeInfo.authors}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
