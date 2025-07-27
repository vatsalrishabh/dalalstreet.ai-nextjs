"use client";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/redux/store";
import { useRouter } from "next/navigation"; // ✅ use `next/navigation` for App Router
import DaisyNavbar from "@/components/common/Navbar/DaisyNavbar";
import "animate.css";
import Loader from "@/components/common/Loader";

export default function Page() {
  const router = useRouter();
  const theme = useSelector((state: RootState) => state.theme.mode);
  const [query, setQuery] = useState("");
  const screenerRef = useRef<HTMLDivElement | null>(null);
  const [loaderState, setLoaderState] = useState(true);

  const handleSample = (text: string) => {
    setQuery(text);
    if (text) {
      router.push(`/stocks/?query=${encodeURIComponent(text)}`);
    }
  };

  const startScreening = () => {
    if (query.trim()) {
      router.push(`/stocks/?query=${encodeURIComponent(query.trim())}`);
    }
  };

useEffect(() => {
  setTimeout(() => {
  router.push(`/home/?query=${encodeURIComponent("High dividend telecom stocks")}`);
  }, 2000); // 
  setLoaderState(true);
},[loaderState, router]);

  if(loaderState){
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div data-theme={theme} className="min-h-screen bg-base-100 text-base-content font-sans">
      <DaisyNavbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen pt-16 sm:pt-24 px-4 text-center">
        <div className="max-w-screen-md w-full space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="block animate__animated animate__backInDown">Find the Right Stocks</span>
            <span className="block text-primary animate__animated animate__heartBeat animate__delay-1s">
              Just by Talking
            </span>
          </h1>

          <p className="text-base-content/70 text-lg mb-4">
            Type your stock criteria or choose a sample to explore curated stock data instantly.
          </p>

          {/* Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. 'High dividend telecom stocks'"
            className="w-full px-5 py-3 bg-base-200 border border-base-300 rounded-full 
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          />

          {/* Sample Prompts */}
          <div className="flex flex-wrap gap-2 justify-center">
            {["Screen tech stocks last 6 months", "Find low P/E value stocks"].map((txt) => (
              <button
                key={txt}
                onClick={() => handleSample(txt)}
                className="px-4 py-2 bg-accent text-accent-content rounded-full text-sm font-medium 
                           hover:bg-accent/80 transition duration-200"
              >
                {txt}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={startScreening}
            className="w-full py-3 bg-primary text-primary-content rounded-full font-semibold text-lg 
                       shadow-md hover:bg-primary/80 transition duration-200"
          >
            🔍 Start Screening
          </button>
        </div>
      </section>

      {/* Screener Section */}
      <section ref={screenerRef} className="px-4 sm:px-6 py-20 bg-base-200">
        <div className="max-w-screen-lg mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-base-content">
            📊 Stock Screener
          </h2>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {["Sector", "Market Cap", "P/E Ratio"].map((label) => (
              <div key={label}>
                <label className="block text-base-content font-medium mb-2">{label}</label>
                <select
                  className="w-full p-3 bg-base-100 border border-base-300 rounded-xl 
                             text-base-content focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option>{`Select ${label}`}</option>
                </select>
              </div>
            ))}
          </div>

          {/* Results */}
          <div className="overflow-x-auto rounded-2xl bg-base-100 shadow">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-base-300 bg-base-300/30">
                  {["Ticker", "Company", "P/E", "Market Cap"].map((h) => (
                    <th key={h} className="py-4 px-6 text-base-content font-semibold whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[{ t: "AAPL", c: "Apple Inc.", pe: 28.5, m: "$2.3T" },
                  { t: "MSFT", c: "Microsoft Corp.", pe: 34.2, m: "$2.1T" }
                ].map(({ t, c, pe, m }, i) => (
                  <tr key={t} className={`border-b ${i % 2 === 0 ? "bg-base-100" : "bg-base-200"} hover:bg-accent/10 transition`}>
                    <td className="py-4 px-6 font-medium text-primary whitespace-nowrap">{t}</td>
                    <td className="px-6 whitespace-nowrap">{c}</td>
                    <td className="px-6 whitespace-nowrap">{pe}</td>
                    <td className="px-6 whitespace-nowrap">{m}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
