import React from "react";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);
  const [prompt, setPrompt] = React.useState("");

  // Update prompt variable when handleChange is called
  const handleChange = (abc) => {
    setPrompt(abc.target.value);
  };

  // When handleSubmit is called, passes prompt to /api and then gets assigns response to data
  const handleSubmit = (abc) => {
    abc.preventDefault();
    setData(null);
    fetch(`/api?prompt=${prompt}`)
      .then((res) => res.json())
      .then((data) => setData(`${data.generations[0].text.slice(0, -1)}`));
  };

  return (
    <div className=" bg-red-600 text-center border-8 border-blue-400">
      <header className="App-header">
        <h1 className=" mb-20 text-6xl font-extrabold text-yellow-400 ">
          Recipe Generator
        </h1>
        <form onSubmit={handleSubmit}>
          <label>
            <h2 className="mb-5 text-4xl font-bold ">
              What would you like to make today? <br />
            </h2>
            <textarea
              className="text-black text-3xl font-bold"
              name="input-box"
              rows="1"
              cols="70"
              value={prompt}
              onChange={handleChange}
            />
          </label>
          <br />
          <input
            className="cursor-pointer border-4 border-white bg-white px-2 text-lg text-black font-bold  "
            type="submit"
            value="Submit"
          />
        </form>
        <h1 className="mt-8 mb-4 text-3xl font-bold ">Result:</h1>
        <h3 className="text-yellow-400 font-bold border-4 border-white text-xl p-10 min-w-[1000px]">
          {!data
            ? 'Recipe will appear here. Try general topics like "Sports" or "Entertainment".'
            : data}
        </h3>

        <p className="mt-20 text-lg font-semibold ">
          Powered by{" "}
          <a href="https://cohere.ai/" className="App-link">
            Cohere
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
