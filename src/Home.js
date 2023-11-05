/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { myData, myGenres } from "./Components/Credentials";
import Heading from "./Components/Heading";
import NavBar from "./Components/NavBar";
import Line from "./Components/Line";
import Table from "./Components/Table";
import Message from "./Components/Message";
import Pagination from "./Components/Pagination";
import AddMovieButton from "./Components/AddMovieButton";
import PopUp from "./Components/PopUp";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Home() {
  const [selectedGenre, setSelectedGenre] = useState(() => {
    const savedGenre = localStorage.getItem("genre");
    if(savedGenre) return savedGenre;
    else {
      localStorage.setItem("genre", "all");
      return "all";
    }
  });
  const [searchText, setSearchText] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [message, setMessage] = useState("");
  const [addOrEdit, setAddOrEdit] = useState("");
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("data");
    if(savedData) return JSON.parse(savedData);
    else {
      localStorage.setItem("data", JSON.stringify(myData));
      return myData;
    }
  });
  const [genres, setGenres] = useState(() => {
    const savedGenres = localStorage.getItem("genres");
    if(savedGenres) return JSON.parse(savedGenres);
    else {
      localStorage.setItem("genres", JSON.stringify(myGenres));
      return myGenres;
    }
  });
  const moviesPerPage = 5;
  const [prevGenre, setPrevGenre] = useState(() => {
    const savedPrevGenre = localStorage.getItem("prevGenre");
    if(savedPrevGenre) return savedPrevGenre;
    else {
      localStorage.setItem("prevGenre", "all");
      return "all";
    }
  });
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("page");
    if(savedPage) return parseInt(savedPage);
    else {
      localStorage.setItem("page", "1");
      return 1;
    }
  });
  const [totalPages, setTotalPages] = useState(Math.ceil(data.length / moviesPerPage));
  const [tableData, setTableData] = useState(() => {
    const endIndex = (moviesPerPage <= data.length)? moviesPerPage: data.length;
    return data.slice(0, endIndex);
  });

  useEffect(() => {
    if(selectedGenre !== "all") handleGenreChange(selectedGenre);
  }, []);

  useEffect(() => {
    if(data.length === 0) {
      if(!onSearch) setMessage("No movies to show");
      else setMessage("No matches found");
    }
    else setMessage("");
    if(!onSearch) {
      const _totalPages = Math.ceil(data.length / moviesPerPage);
      if(selectedGenre === prevGenre) {
        if(currentPage > _totalPages)
          handlePageChange(_totalPages);
        else handlePageChange(currentPage);
      }
      else {
        handlePageChange(1);
        updatePrevGenreStorage(selectedGenre);
        setPrevGenre(selectedGenre);
      }
      setTotalPages(_totalPages);
    }
  }, [data]);

  const columns = [
    {header: "", cellData: row => (
        <button id="edit-btn" onClick={() => handleEdit(row)}>
          <i className="material-icons">edit</i>
        </button>
      )},
    {header: "", cellData: row => (
        <button className={row.isFavourite? "favourite-btn-clicked": "favourite-btn"} onClick={() => handleFavClick(row.id)}>
          <i className="material-icons">{row.isFavourite? "star": "star_border"}</i>
        </button>
      )},
    {header: "Name", path: "name"},
    {header: "Genre", path: "genre"},
    {header: "Rating", path: "rating"},
    {header: "", cellData: row => (
        <button id="delete-btn" onClick={() => handleDelete(row)}>
          <i className="material-icons">delete</i>
        </button>
      )}
  ];

  const getData = () => JSON.parse(localStorage.getItem("data"));

  const updateDataStorage = (_data) => {
    localStorage.setItem("data", JSON.stringify(_data));
  }

  const updateGenresStorage = (_genres) => {
    localStorage.setItem("genres", JSON.stringify(_genres));
  }

  const updateGenreStorage = (_genre) => {
    localStorage.setItem("genre", _genre);
  }

  const updatePrevGenreStorage = (_genre) => {
    localStorage.setItem("prevGenre", _genre);
  }

  const updatePageStorage = (_page) => {
    localStorage.setItem("page", _page.toString());
  }

  const handleEdit = (row) => {
    const {name, genre, rating} = row;
    setInitialValues({name, genre, rating});
    setAddOrEdit(row.id);
  }

  const handleFavClick = (id) => {
    const updateRow = row => (
      (row.id === id)? {...row, isFavourite: !row.isFavourite}: row
    );
    const newData = data.map(updateRow);
    if(!onSearch && selectedGenre === "all") updateDataStorage(newData);
    else {
      const _data = getData().map(updateRow);
      updateDataStorage(_data);
    }
    setData(newData);
  }

  const handleDelete = (row) => {
    let newData = data.filter(_row => _row.id !== row.id);
    if(!onSearch && selectedGenre === "all") updateDataStorage(newData);
    else {
      const _data = getData().filter(_row => _row.id !== row.id);
      updateDataStorage(_data);
    }
    const curGenre = row.genre.toLowerCase();
    const newGenres = genres;
    if(genres[curGenre] === 1) {
      delete newGenres[curGenre];
      if(selectedGenre !== "all") {
        newData = getData();
        updateGenreStorage("all");
        setSelectedGenre("all");
      }
    }
    else newGenres[curGenre] -= 1;
    updateGenresStorage(newGenres);
    setGenres(newGenres);
    setData(newData);
  }

  function handleSubmit(dataObj) {
    const updateRow = row => (
      (row.id === addOrEdit)? {...row, ...dataObj}: row
    );
    const updateGenres = (_genres) => {
      const newGenre = dataObj.genre.toLowerCase();
      if(!_genres[newGenre]) _genres[newGenre] = 1;
      else _genres[newGenre]++;
      updateGenresStorage(_genres);
      setGenres(_genres);
    }

    let newData;
    if(addOrEdit === "add") {
      dataObj = {id: uuidv4(), ...dataObj, isFavourite: false};
      newData = [...data, dataObj];
      updateGenres(genres);
    }
    else {
      newData = data.map(updateRow);
      if(initialValues.genre !== dataObj.genre) {
        const oldGenre = initialValues.genre.toLowerCase();
        const newGenres = genres;
        newGenres[oldGenre] -= 1;
        if(newGenres[oldGenre] === 0) delete newGenres[oldGenre];
        updateGenres(newGenres);
      }
    }
    if(!onSearch) {
      if(selectedGenre === "all") updateDataStorage(newData);
      else {
        if(addOrEdit === "add") {
          const _data = [...getData(), dataObj];
          updateDataStorage(_data);
          if(dataObj.genre.toLowerCase() !== selectedGenre)
            newData = newData.filter(row => row !== dataObj);
        }
        else {
          const _data = getData().map(updateRow);
          updateDataStorage(_data);
          if(dataObj.genre.toLowerCase() !== selectedGenre) {
            newData = newData.filter(row => row.id !== addOrEdit);
            if(newData.length === 0) {
              newData = getData();
              updateGenreStorage("all");
              setSelectedGenre("all");
            }
          }
        }
      }
    }
    else {
      const _data = getData().map(updateRow);
      updateDataStorage(_data);
    }
    setData(newData);
    setAddOrEdit("");
  }

  const handleAddMovie = () => {
    setInitialValues({name: "", genre: "", rating: ""});
    setAddOrEdit("add");
  }

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    updateGenreStorage(genre);
    if(genre === "all") setData(getData());
    else {
      const filteredData = getData().filter(row => row.genre.toLowerCase() === genre);
      setData(filteredData);
    }
  }

  const search = (text) => {
    setOnSearch(text !== "");
    text = text.toLowerCase();
    let filteredData;
    if(selectedGenre === "all")
      filteredData = getData().filter(row => row.name.toLowerCase().includes(text));
    else
      filteredData = getData().filter(row => (
        row.genre.toLowerCase() === selectedGenre && row.name.toLowerCase().includes(text)
      ));
    setData(filteredData);
  }

  const handleSearch = (text) => {
    search(text);
    setSearchText(text)
  };

  const handlePageChange = (page) => {
    if(page === 0) page = 1;
    let startIndex = (page - 1) * moviesPerPage;
    let endIndex = startIndex + moviesPerPage;
    if(endIndex > data.length) endIndex = data.length;
    updatePageStorage(page);
    setTableData(data.slice(startIndex, endIndex));
    setCurrentPage(page);
  }

  return (
    <>
      <Heading/>
      {!addOrEdit && <NavBar genreAndSearch={true} selectedGenre={selectedGenre} handleGenreChange={(genre) => handleGenreChange(genre)}
                             genres={genres} searchText={searchText} handleSearch={(text) => handleSearch(text)}/>}
      {!addOrEdit && <Line className="top-line"/>}
      {!addOrEdit && ((message === "")? <Table tableData={(!onSearch)? tableData: data} columns={columns}/>: <Message message={message}/>)}
      {!addOrEdit && totalPages > 1 && message === "" && !onSearch && <Pagination totalPages={totalPages}
                                                                                  curPage={currentPage}
                                                                                  handlePageChange={handlePageChange}/>}
      {!addOrEdit && !onSearch && <AddMovieButton addMovie={handleAddMovie}/>}
      { addOrEdit && <PopUp status={addOrEdit} initialValues={initialValues}
                            close={() => setAddOrEdit("")} submit={handleSubmit}/>}
    </>
  );
}


export default Home;
