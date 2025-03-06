import { useState } from "react";

const Navbar = ({ setCategory }) => {
  const categories = ["general", "business", "entertainment", "health", "science", "sports", "technology"];

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">The Digital Daily</h1>

      {/* Category Dropdown */}
      <select
        className="p-2 rounded bg-white text-black"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
        ))}
      </select>
    </nav>
  );
};

export default Navbar;
