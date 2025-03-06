import { Link } from "react-router-dom";

const questionPapers = [
  { year: 2024, link: "/group 1/2024.pdf", image: "/photos/2024.webp" },
  { year: 2023, link: "/pdfs/group1-2023.pdf", image: "/photos/2023.cms" },
  { year: 2022, link: "/pdfs/group1-2022.pdf", image: "/photos/2022.avif" },
  { year: 2021, link: "/pdfs/group1-2021.pdf", image: "/images/paper2021.jpg" },
  { year: 2020, link: "/pdfs/group1-2020.pdf", image: "/images/paper2020.jpg" },
  { year: 2019, link: "/pdfs/group1-2019.pdf", image: "/images/paper2019.jpg" },
  { year: 2018, link: "/pdfs/group1-2018.pdf", image: "/images/paper2018.jpg" },
];

const Group1 = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">📖 Group 4 Question Papers</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {questionPapers.map((paper, index) => (
          <a key={index} href={paper.link} target="_blank" rel="noopener noreferrer" className="group">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-2xl">
              <img src={paper.image} alt={`Group 1 ${paper.year}`} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-green-600">
                  📄 {paper.year} Question with Answer Key
                </h2>
                <p className="text-gray-600 mt-2">Download for the year {paper.year}.</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="text-center mt-6">
        <Link to="/" className="text-blue-600 font-semibold hover:underline">⬅ Back to Exams</Link>
      </div>
    </div>
  );
};

export default Group1;
