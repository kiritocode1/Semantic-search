"use client";

import { useState } from "react";



const Home = ({ }) => {
  const [query, setQuery] = useState(""); 
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function createIndexAndEmbeddings () {
    try {
      const result = await fetch('/api/setup', {
        method: "POST",
      })
      // noticed doesnt work as well with GET soo . 

      const json = await result.json();
      console.log(json);
    } catch (err) {
      console.log(err);
    }
  }

  async function sendQuery () {
    if (!query) return;
    setResult("");
    setLoading(true);
    try {
      const result = await fetch('/api/read', {
        method: "POST",
        body: JSON.stringify(query),
      })

      const json = await result.json();
      setResult(json.data);
      setLoading(false);
    }
    catch (err) {
      console.log(err);
      setLoading(false);
    }

  }





  return (
    <main className="flex flex-col items-center justify-center p-24">
      <input className="text-black px-2 py-1" onChange={(e) => setQuery(e.target.value)} />

      <button className="bg-white text-black rounded-2xl px-7 py-1 mt-2 mb-1" onClick={sendQuery}>Ask AI </button>


      {loading && <p className="text-white">Loading...</p>}
      {result && <p className="text-white">{JSON.stringify(result)}</p>}

      <button onClick={createIndexAndEmbeddings}> Create index and embeddings</button>
    </main>
  )
}

export default Home