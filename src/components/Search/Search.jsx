// import React from "react";
// import styles from "./Search.module.css";
// import SearchIcon from "@mui/icons-material/Search";
// import { Autocomplete, TextField } from "@mui/material";
// import { truncate } from "../../components/Helper/helper";
// import { useNavigate } from "react-router-dom";

// function Search({ searchData, placeholder }) {
//   const navigate = useNavigate();

//   const handleOptionSelect = (event, value) => {
//     if (value && value.slug) {
//       navigate(`/album/${value.slug}`);
//     }
//   };

//   return (
//     <div className={styles.searchContainer}>
//       <div className={styles.searchWrapper}>
//         <Autocomplete
//           freeSolo
//           options={searchData || []}
//           getOptionLabel={(option) => option.title || ""}
//           onChange={handleOptionSelect}
//           renderInput={(params) => (
//             <div className={styles.searchInputWrapper}>
//               <TextField
//                 {...params}
//                 className={styles.search}
//                 placeholder={placeholder || "Search an album of your choice"}
//                 InputProps={{
//                   ...params.InputProps,
//                   className: styles.textFieldInput,
//                   endAdornment: (
//                     <React.Fragment>
//                       {params.InputProps.endAdornment}
//                       <button 
//                         className={styles.searchButton} 
//                         type="button"
//                       >
//                         <SearchIcon />
//                       </button>
//                     </React.Fragment>
//                   ),
//                 }}
//                 variant="outlined"
//               />
//             </div>
//           )}
//           renderOption={(props, option) => {
//             const artists = option.songs?.reduce((accumulator, currentValue) => {
//               if (currentValue.artists) {
//                 accumulator.push(...currentValue.artists);
//               }
//               return accumulator;
//             }, []) || [];

//             return (
//               <li {...props} key={option.id} className={styles.listElement}>
//                 <div>
//                   <p className={styles.albumTitle}>{option.title}</p>
//                   <p className={styles.albumArtists}>
//                     {truncate(artists.join(", "), 40)}
//                   </p>
//                 </div>
//               </li>
//             );
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// export default Search;

import React, { useState } from "react";
import styles from "./Search.module.css";
import SearchIcon from "@mui/icons-material/Search";

function Search({ searchData, placeholder, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit} className={styles.wrapper}>
        <input
          type="text"
          className={styles.search}
          placeholder={placeholder || "Search an album of your choice"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={styles.searchButton} type="submit">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}

export default Search;