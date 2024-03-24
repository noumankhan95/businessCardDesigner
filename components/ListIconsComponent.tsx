import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

function ListIcons({
  handleShapeAddition,
}: {
  handleShapeAddition: (name: string) => void;
}) {
  const [icons, setIcons] = useState<any[]>([]);
  const [filteredIcons, setFilteredIcons] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [iconsPerPage] = useState<number>(20);

  useEffect(() => {
    // Dynamically import all icons from react-icons/fa
    import("react-icons/fa").then((module) => {
      // Get all exported icons from the module
      const iconComponents = Object.entries(module)
        .filter(([key, value]) => typeof value === "function")
        .map(([key, value]) => ({ key, value }));
      setIcons(iconComponents);
      setFilteredIcons(iconComponents);
    });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value, "val");
    const term = event.target?.value?.toLowerCase();
    setSearchTerm(term);
    const filtered = term
      ? icons.filter((icon) => {
          return icon.key.toLowerCase().includes(term);
        })
      : icons;
    setFilteredIcons(filtered);
    setCurrentPage(1);
  };

  const indexOfLastIcon = currentPage * iconsPerPage;
  const indexOfFirstIcon = indexOfLastIcon - iconsPerPage;
  const currentIcons = filteredIcons.slice(indexOfFirstIcon, indexOfLastIcon);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <section className="flex h-auto w-5/5 bg-gray-100 p-5">
      <div className="flex flex-col items-start w-full">
        <div className="w-full mb-4 flex flex-wrap items-center">
          <FaSearch className="mr-2" />
          <input
            type="text"
            placeholder="Search icons..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-2 py-1 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="flex flex-wrap justify-center w-full">
          {currentIcons.map((Icon, index) => (
            <div
              key={index}
              className="w-20 h-14 cursor-pointer m-2"
              onClick={() => {
                console.log(Icon.value().svg);

                handleShapeAddition(Icon.key || "Unknown");
              }}
            >
              {React.createElement(Icon.value, { className: "w-full h-full" })}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 justify-center items-center mt-4">
          {Array.from({
            length: Math.ceil(filteredIcons.length / iconsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 mx-1 bg-gray-200 rounded-full ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ListIcons;
