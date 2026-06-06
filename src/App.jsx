import { useEffect, useState } from "react";
import { analyzePassword } from "./utils/passwordChecker";
import { generatePassword } from "./utils/generatePassword";
import { hashPassword } from "./utils/hashPassword";

function App() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hash, setHash] = useState("");

  const result = analyzePassword(password);

  useEffect(() => {
    const generateHash = async () => {
      const hashed = await hashPassword(password);
      setHash(hashed);
    };

    generateHash();
  }, [password]);

  const getBarColor = () => {
    if (result.strength === "Strong")
      return "bg-green-500";

    if (result.strength === "Medium")
      return "bg-yellow-500";

    return "bg-red-500";
  };

  const getStrengthBadge = () => {
    if (result.strength === "Strong")
      return "bg-green-500";

    if (result.strength === "Medium")
      return "bg-yellow-500";

    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex justify-center items-center p-6">

      <div className="w-full max-w-3xl">

        <div className="text-center mb-8">

          <h1 className="text-5xl font-bold text-white">
            🔐 Password Strength Analyzer
          </h1>

          <p className="text-slate-400 mt-3">
            Analyze password security using
            complexity, entropy, and SHA-256 hashing.
          </p>

        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-8">

          <div className="flex gap-3">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password..."
              className="flex-1 p-4 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="px-5 bg-slate-700 hover:bg-slate-600 rounded-xl text-white"
            >
              {showPassword
                ? "Hide"
                : "Show"}
            </button>

          </div>

          <button
            onClick={() =>
              setPassword(generatePassword())
            }
            className="w-full mt-4 p-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Generate Strong Password
          </button>

          {result.isCommon && (
            <div className="mt-4 bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-xl">
              ⚠ This password appears in common
              password lists and can be cracked
              quickly.
            </div>
          )}

          <div className="mt-8">

            <div className="flex justify-between mb-2">

              <span className="text-white font-semibold">
                Security Score
              </span>

              <span
                className={`px-3 py-1 rounded-full text-white text-sm ${getStrengthBadge()}`}
              >
                {result.strength}
              </span>

            </div>

            <div className="w-full bg-slate-700 h-5 rounded-full overflow-hidden">

              <div
                className={`${getBarColor()} h-5 transition-all duration-700`}
                style={{
                  width: `${result.score}%`,
                }}
              />

            </div>

            <p className="text-slate-300 mt-2">
              {result.score}/100
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <div className="bg-slate-800 p-5 rounded-2xl">

              <h2 className="text-white font-bold mb-4">
                Security Checks
              </h2>

              <ul className="space-y-2 text-slate-300">

                <li>
                  {result.checks.length
                    ? "✅"
                    : "❌"}{" "}
                  Length ≥ 12
                </li>

                <li>
                  {result.checks.uppercase
                    ? "✅"
                    : "❌"}{" "}
                  Uppercase Letter
                </li>

                <li>
                  {result.checks.lowercase
                    ? "✅"
                    : "❌"}{" "}
                  Lowercase Letter
                </li>

                <li>
                  {result.checks.number
                    ? "✅"
                    : "❌"}{" "}
                  Number
                </li>

                <li>
                  {result.checks.special
                    ? "✅"
                    : "❌"}{" "}
                  Special Character
                </li>

              </ul>

            </div>

            <div className="bg-slate-800 p-5 rounded-2xl">

              <h2 className="text-white font-bold mb-4">
                Password Entropy
              </h2>

              <p className="text-4xl font-bold text-blue-400">
                {result.entropy}
              </p>

              <p className="text-slate-400 mt-2">
                bits of entropy
              </p>

              <div className="mt-4 text-sm text-slate-400">
                Higher entropy means stronger
                resistance against brute-force
                attacks.
              </div>

            </div>

          </div>

          <div className="bg-slate-800 p-5 rounded-2xl mt-6">

            <h2 className="text-white font-bold mb-3">
              SHA-256 Hash
            </h2>

            <div className="bg-black p-4 rounded-lg border border-slate-700 overflow-auto">

              <code className="text-green-400 text-sm break-all">
                {hash ||
                  "Enter a password to generate hash"}
              </code>

            </div>

          </div>

          {result.feedback.length > 0 && (

            <div className="bg-slate-800 p-5 rounded-2xl mt-6">

              <h2 className="text-white font-bold mb-3">
                Recommendations
              </h2>

              <ul className="list-disc pl-6 text-slate-300 space-y-2">

                {result.feedback.map(
                  (item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )}

              </ul>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default App;