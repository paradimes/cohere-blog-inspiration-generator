import React from "react";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);
  const [prompt, setPrompt] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (abc) => {
    setPrompt(abc.target.value);
  };

  const handleSubmit = (abc) => {
    setIsLoading(true);
    abc.preventDefault();
    setData(null);
    fetch(`/api?prompt=${prompt}`)
      .then((res) => res.json())
      .then((data) => {
        setData(`${data.generations[0].text.slice(0, -1)}`);
        setIsLoading(false);
      });
  };

  return (
    <div className=" bg-red-600 text-center border-8 border-blue-400 p-8">
      <header className="App-header">
        <h1 className=" mb-20 text-6xl font-extrabold text-yellow-400 ">
          Food Blog Inspiration Generator
        </h1>
        <form onSubmit={handleSubmit}>
          <label>
            <h2 className="mb-5 text-4xl font-bold ">
              What are you writing about today? <br />
            </h2>
            <textarea
              className="text-black text-3xl font-bold text-center"
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
        <h3 className="text-yellow-400 font-bold border-4 border-white text-xxl p-10 max-w-fit ">
          {!data &&
            !isLoading &&
            "The Generator's output will appear here. Try topics like 'Salmon' or 'Filet Mignon'."}
          {isLoading ? "Loading..." : data}
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
