import axios from "axios";
import { BsFillSuitHeartFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
const contriesTable = () => {
  const [search, setSearch] = useState("");
  const [contries, setContries] = useState([]);
  const [filterContries, setFilterContries] = useState([]);
  // const [favorites, setFavorites] = useState([] as Array<number>);

  const getContries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      setContries(response.data);
      setFilterContries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const addFav = (props: any) =>{
  //   let array = favorites;
  //   let addArray = true;
  //   array.map((item: any, key: number)=>{
  //     if(item ===props.i){
  //       array.splice(key, l);
  //       addArray =false;
  //     }
  //   });
  //   if(addArray){
  //     array.push(prop.i);
  //   }
  //   setFavorites([...array])
  // }

  const columns = [
    {
      name: "Country Name",
      selector: (row) => row.name,
    },
    {
      name: "Country Native Name",
      selector: (row) => row.nativeName,
    },
    {
      name: "Country Capital",
      selector: (row) => row.capital,
    },
    {
      name: "Country Flag",
      selector: (row) => <img width={50} height={50} src={row.flag} />,
    },
    {
      name: "Add to favorite",
      cell: (row) => (
        <BsFillSuitHeartFill
          style={{ color: "red", border: "none", cursor: "pointer" }}
          onClick={() => addFav({ item, i })}
        />
      ),
    },
  ];

  useEffect(() => {
    getContries();
  }, []);

  useEffect(() => {
    const result = contries.filter((country) => {
      return country.name.toLowerCase().match(search.toLowerCase());
    });
    setFilterContries(result);
  }, [search]);

  return (
    <>
      <div style={{ textAlign: "right", paddingRight: "25px" }}>
        <button
          style={{
            backgroundColor: "#0087ff",
            color: "white",
            border: "none",
            borderRadius: "3px",
            height: "27px",
            cursor: "pointer"
          }}
          // onClick="window.open('https://restcountries.com/v2/all')"
        >
          Favorite List
        </button>
      </div>

      <DataTable
        title="Country List"
        columns={columns}
        data={filterContries}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="440px"
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        subHeader
        subHeaderComponent={
          <input
            style={{ width: "18%", height: "29px" }}
            type="text"
            placeholder="search here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
      />

      
    </>
  );
};

export default contriesTable;
