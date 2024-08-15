import { getAllData } from "@/api/stakeholder-management/common";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SpinnerLoader from "../SpinnerLoader";
import { useRef } from "react";

const MultipleSearchAutocompleteObject = ({
  title,
  searchUrl,
  item,
  setItem,
  limit = 10,
  query = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const debounceTimeoutRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const getData = async () => {
    debounceTimeoutRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await getAllData(
          limit,
          0,
          `${searchUrl}?${query}name[$regex]=.*${encodeURIComponent(
            searchTerm
          )}.*&name[$options]=i`
        );
        if (limit === -1) {
          console.log(response);
          setShowDropdown(true);
          setResults(response);
        } else {
          console.log(response.data);
          setShowDropdown(true);
          setResults(response.data);
        }
        setLoading(false);
      } catch (error) {
        toast.error(error ? error : "Something went wrong");
        setLoading(false);
      }
    }, 500);
  };

  // useEffect(() => {
  //   clearTimeout(debounceTimeoutRef.current);

  //   if (searchTerm.trim() === "") {
  //     setResults([]);
  //     setShowDropdown(false);
  //     setLoading(false);
  //     return;
  //   }

  //   getData();
  // }, [searchTerm]);

  useEffect(() => {
    clearTimeout(debounceTimeoutRef.current);

    if (searchTerm?.trim() === "") {
      setResults([]);
      setShowDropdown(false);
      setLoading(false);
      return;
    }

    // Check if the searchTerm is changed by user input or by selecting an item from the dropdown
    if (selectedResult === null || searchTerm !== selectedResult.name) {
      getData();
    } else {
      setShowDropdown(false); // Hide dropdown when selecting an item from the dropdown
    }
  }, [searchTerm, selectedResult]);

  useEffect(() => {
    setSearchTerm(item ? item.name : "");
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectedResult(null); // Clear selected result on input change
  };

  const handleSelectResult = (result) => {
    console.log(result);
    setSelectedResult(result);
    // setItem(result);
    setItem([...item, result.name]);
    setSearchTerm(""); // Set the selected result in the input
    setShowDropdown(false); // Hide dropdown on selection
  };

  const handleInputBlur = () => {
    // Delay hiding dropdown to handle click on dropdown results
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  const handleInputFocus = () => {
    setShowDropdown(true); // Show dropdown on input focus
  };

  const addHandler = async () => {};

  return (
    <div>
      <div className="flex justify-between w-full">
        <div className="mb-1 text-gray-600 text-sm">{title}</div>
      </div>
      <div className="bg-white px-1 flex justify-between rounded-lg border border-gray-300 ">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          //   placeholder={title}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          className="flex-1 p-2 outline-0 focus:outline-0 outline-none focus:outline-none"
        />
        <div className="w-10 flex items-center h-10 justify-center">
          {loading && <SpinnerLoader />}
        </div>
      </div>
      {showDropdown && results?.length > 0 && (
        <div className="absolute bg-white rounded-md z-50 shadow max-w-md">
          {results?.map((item, index) => (
            <div
              className={`py-2 px-4 hover:bg-gray-100 ${
                selectedResult === item ? "bg-gray-200" : ""
              }`}
              key={index}
              onClick={() => handleSelectResult(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultipleSearchAutocompleteObject;
