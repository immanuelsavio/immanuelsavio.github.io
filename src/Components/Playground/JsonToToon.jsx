import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaExchangeAlt, FaCopy, FaCheck, FaExclamationTriangle, FaPaste, FaTrash, FaBookOpen } from 'react-icons/fa';

const JsonToToon = () => {
  const [inputJson, setInputJson] = useState('');
  const [outputToon, setOutputToon] = useState('');
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    setError(null);
    setOutputToon('');

    if (!inputJson.trim()) {
      return;
    }

    try {
      let jsonData;
      try {
        jsonData = JSON.parse(inputJson);
      } catch (e) {
        throw new Error('Invalid JSON format');
      }

      let dataArray = [];
      let rootName = 'items';

      if (Array.isArray(jsonData)) {
        dataArray = jsonData;
      } else if (typeof jsonData === 'object' && jsonData !== null) {
        // Check if it's a wrapper object like { "users": [...] }
        const keys = Object.keys(jsonData);
        if (keys.length === 1 && Array.isArray(jsonData[keys[0]])) {
          rootName = keys[0];
          dataArray = jsonData[keys[0]];
        } else {
          // Treat single object as one-item array
          dataArray = [jsonData];
          rootName = 'object';
        }
      } else {
        throw new Error('Input must be an array or object');
      }

      if (dataArray.length === 0) {
        setOutput(`${rootName}[0]{}:`);
        return;
      }

      // Extract all unique keys
      const allKeys = new Set();
      dataArray.forEach(item => {
        if (typeof item === 'object' && item !== null) {
          Object.keys(item).forEach(k => allKeys.add(k));
        }
      });
      const headers = Array.from(allKeys);

      // Build TOON string
      let toon = `${rootName}[${dataArray.length}]{${headers.join(',')}}:\n`;

      toon += dataArray.map(item => {
        return '  ' + headers.map(key => {
          const val = item[key];
          if (val === undefined || val === null) return '';
          if (typeof val === 'object') return JSON.stringify(val);
          const strVal = String(val);
          // Simple CSV escaping if needed (commas, newlines)
          if (strVal.includes(',') || strVal.includes('\n')) {
            return `"${strVal.replace(/"/g, '""')}"`; // Standard CSV quote escaping
          }
          return strVal;
        }).join(',');
      }).join('\n');

      setOutputToon(toon);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCopy = () => {
    if (outputToon) {
      navigator.clipboard.writeText(outputToon);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-4xl font-heading font-bold text-text mb-2">JSON to TOON Converter</h1>
            <p className="text-text-muted">Convert standard JSON to the compact TOON format.</p>
          </div>
          <Link 
            to="/blog/what-is-toon"
            className="flex items-center gap-2 px-4 py-2 bg-secondary/50 hover:bg-secondary border border-white/10 rounded-lg text-accent transition-all hover:scale-105"
          >
            <FaBookOpen />
            <span>Read: What is TOON?</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-300px)] min-h-[400px]">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col h-full"
          >
            <label className="text-accent font-bold mb-2 block">Input JSON</label>
            <div className="relative h-full">
              <textarea
                value={inputJson}
                onChange={(e) => setInputJson(e.target.value)}
                placeholder={`{
  "instructions": [
    {"step": 1, "action": "Find some JSON", "status": "done"},
    {"step": 2, "action": "Paste it here", "status": "waiting"},
    {"step": 3, "action": "Click convert", "status": "pending"},
    {"step": 4, "action": "Watch the magic", "status": "pending"}
  ]
}`}
                className="w-full h-full bg-secondary/50 border border-white/10 rounded-xl p-4 text-text font-mono text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.readText().then(text => setInputJson(text));
                  }}
                  className="p-2 bg-black/20 hover:bg-accent/20 text-text-muted hover:text-accent rounded-lg transition-colors"
                  title="Paste from Clipboard"
                >
                  <FaPaste />
                </button>
                <button
                  onClick={() => setInputJson('')}
                  className="p-2 bg-black/20 hover:bg-red-500/20 text-text-muted hover:text-red-500 rounded-lg transition-colors"
                  title="Clear"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Output Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col h-full"
          >
            <div className="flex justify-between items-center mb-2">
              <label className="text-accent font-bold">Output TOON</label>
              {outputToon && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors"
                >
                  {copied ? <FaCheck /> : <FaCopy />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
            <div className="relative flex-grow">
              <textarea
                readOnly
                value={outputToon}
                placeholder={`instructions[4]{step,action,status}:
  1,Find some JSON,done
  2,Paste it here,waiting
  3,Click convert,pending
  4,Watch the magic,pending`}
                className={`w-full h-full bg-secondary/30 border ${error ? 'border-red-500' : 'border-secondary'} rounded-xl p-4 text-text font-mono text-sm focus:outline-none transition-colors resize-none`}
              />
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-4 left-4 right-4 bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg flex items-center gap-2 backdrop-blur-sm"
                  >
                    <FaExclamationTriangle />
                    <span className="text-sm font-medium">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={handleConvert}
            className="px-8 py-4 bg-accent text-primary font-bold rounded-lg hover:bg-accent-dark transition-all transform hover:-translate-y-1 shadow-lg shadow-accent/20 flex items-center gap-2 text-lg"
          >
            <FaExchangeAlt /> Convert to TOON
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default JsonToToon;
