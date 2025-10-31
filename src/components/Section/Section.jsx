// // import React, { useState, useEffect } from "react";
// // import { Tab, Tabs } from "@mui/material";
// // import axios from "axios";
// // import Card from "../Card/Card";
// // import Carousel from "../Carousel/Carousel";
// // import styles from "./Section.module.css";

// // function Section({
// //   title,
// //   apiEndpoint,
// //   showCollapse = true,
// //   type = "albums",
// //   genresEndpoint,
// // }) {
// //   const [data, setData] = useState([]);
// //   const [genres, setGenres] = useState([]);
// //   const [selectedGenre, setSelectedGenre] = useState("All");
// //   const [isCollapsed, setIsCollapsed] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   console.log('=== SECTION DEBUG ===');
// //   console.log('Title:', title);
// //   console.log('showCollapse:', showCollapse);
// //   console.log('type:', type);
// //   console.log('data length:', data.length);
// //   console.log('isCollapsed:', isCollapsed);
// //   console.log('loading:', loading);
// //   console.log('====================');

// //   useEffect(() => {
// //   const fetchData = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);
      
// //       console.log(`🔍 Fetching ${title} from: ${apiEndpoint}`);
      
// //       const response = await axios.get(apiEndpoint);
// //       console.log(`✅ ${title}: Received ${response.data.length} items`);
// //       setData(response.data);
      
// //       if (type === "songs" && genresEndpoint) {
// //         console.log(`🔍 Fetching genres from: ${genresEndpoint}`);
// //         const genresResponse = await axios.get(genresEndpoint);
// //         console.log(`✅ Received genres:`, genresResponse.data.data);
// //         setGenres(genresResponse.data.data);
// //       }
      
// //     } catch (error) {
// //       console.error(`❌ Error fetching ${title}:`, error);
// //       console.error(`❌ Failed URL: ${apiEndpoint}`);
// //       setError(`Failed to load ${title}. Please check the API endpoint.`);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   fetchData();
// // }, [apiEndpoint, type, genresEndpoint, title]);

// //   const handleGenreChange = (event, newValue) => {
// //     setSelectedGenre(newValue);
// //   };

// //   // Filter songs based on selected genre
// //   const filteredData =
// //     type === "songs" && selectedGenre !== "All"
// //       ? data.filter((item) => item.genre?.label === selectedGenre)
// //       : data;

// //   const toggleCollapse = () => {
// //     setIsCollapsed(!isCollapsed);
// //   };

// //   console.log("Section debug:", {
// //     title,
// //     showCollapse,
// //     type,
// //     isCollapsed,
// //     dataLength: data.length,
// //     loading,
// //     error,
// //   });

// //   if (loading) {
// //     return (
// //       <div className={styles.section}>
// //         <div className={styles.sectionHeader}>
// //           <h2 className={styles.sectionTitle}>{title}</h2>
// //         </div>
// //         <div className={styles.loading}>Loading {type}...</div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className={styles.section}>
// //         <div className={styles.sectionHeader}>
// //           <h2 className={styles.sectionTitle}>{title}</h2>
// //         </div>
// //         <div className={styles.error}>{error}</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div
// //       className={styles.section}
// //       data-testid={`${title.toLowerCase().replace(" ", "-")}-section`}
// //     >
// //       <div className={styles.sectionHeader}>
// //         <h2 className={styles.sectionTitle}>{title}</h2>
// //         {showCollapse && type !== "songs" && data.length > 0 && (
// //                 <button
// //             className={styles.collapseButton}
// //             onClick={toggleCollapse}
// //             data-testid={`${title
// //               .toLowerCase()
// //               .replace(" ", "-")}-collapse-btn`}
// //             style={{ display: "block", visibility: "visible", opacity: 1 }}
// //           >
// //             {isCollapsed ? "Show All" : "Collapse"}
// //           </button>
// //         )}
// //       </div>

// //       {/* Genre Tabs for Songs */}
// //       {type === "songs" && (
// //         <div className={styles.tabsContainer}>
// //           <Tabs
// //             value={selectedGenre}
// //             onChange={handleGenreChange}
// //             className={styles.tabs}
// //             TabIndicatorProps={{ style: { display: "none" } }}
// //           >
// //             <Tab
// //               value="All"
// //               label="All"
// //               className={`${styles.tab} ${
// //                 selectedGenre === "All" ? styles.activeTab : ""
// //               }`}
// //             />
// //             {genres.map((genre) => (
// //               <Tab
// //                 key={genre.key}
// //                 value={genre.label}
// //                 label={genre.label}
// //                 className={`${styles.tab} ${
// //                   selectedGenre === genre.label ? styles.activeTab : ""
// //                 }`}
// //               />
// //             ))}
// //           </Tabs>
// //         </div>
// //       )}

// //       {/* Content */}
// //       {type === "songs" || isCollapsed ? (
// //         <Carousel
// //           data={filteredData}
// //           renderComponent={(item) => <Card data={item} type={type} />}
// //         />
// //       ) : (
// //         <div className={styles.cardsGrid}>
// //           {filteredData.map((item) => (
// //             <Card key={item.id} data={item} type={type} />
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Section;

// import React, { useState, useEffect } from "react";
// import { Tab, Tabs } from "@mui/material";
// import axios from "axios";
// import Card from "../Card/Card";
// import Carousel from "../Carousel/Carousel";
// import styles from "./Section.module.css";

// function Section({
//   title,
//   apiEndpoint,
//   showCollapse = true,
//   type = "albums",
//   genresEndpoint,
// }) {
//   const [data, setData] = useState([]);
//   const [genres, setGenres] = useState([]);
//   const [selectedGenre, setSelectedGenre] = useState("All");
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         console.log(`🔍 Fetching ${title} from: ${apiEndpoint}`);
        
//         const response = await axios.get(apiEndpoint);
//         console.log(`✅ ${title}: Received ${response.data.length} items`);
//         setData(response.data);
        
//         if (type === "songs" && genresEndpoint) {
//           console.log(`🔍 Fetching genres from: ${genresEndpoint}`);
//           const genresResponse = await axios.get(genresEndpoint);
//           console.log(`✅ Received genres:`, genresResponse.data.data);
//           setGenres(genresResponse.data.data);
//         }
        
//       } catch (error) {
//         console.error(`❌ Error fetching ${title}:`, error);
//         console.error(`❌ Failed URL: ${apiEndpoint}`);
//         setError(`Failed to load ${title}. Please check the API endpoint.`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [apiEndpoint, type, genresEndpoint, title]);

//   const handleGenreChange = (event, newValue) => {
//     setSelectedGenre(newValue);
//   };

//   // Filter songs based on selected genre
//   const filteredData =
//     type === "songs" && selectedGenre !== "All"
//       ? data.filter((item) => item.genre?.label === selectedGenre)
//       : data;

//   const toggleCollapse = () => {
//     console.log(`🔄 Toggling ${title} from ${isCollapsed ? 'collapsed' : 'expanded'} to ${!isCollapsed ? 'collapsed' : 'expanded'}`);
//     setIsCollapsed(!isCollapsed);
//   };

//   // Debug logs
//   console.log("Section debug:", {
//     title,
//     showCollapse,
//     type,
//     isCollapsed,
//     dataLength: data.length,
//     loading,
//     error,
//     shouldShowButton: showCollapse && type !== "songs" && data.length > 0,
//     buttonText: isCollapsed ? 'Show All' : 'Collapse'
//   });

//   if (loading) {
//     return (
//       <div className={styles.section}>
//         <div className={styles.sectionHeader}>
//           <h2 className={styles.sectionTitle}>{title}</h2>
//         </div>
//         <div className={styles.loading}>Loading {type}...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={styles.section}>
//         <div className={styles.sectionHeader}>
//           <h2 className={styles.sectionTitle}>{title}</h2>
//         </div>
//         <div className={styles.error}>{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={styles.section}
//       data-testid={`${title.toLowerCase().replace(" ", "-")}-section`}
//     >
//       <div className={styles.sectionHeader}>
//         <h2 className={styles.sectionTitle}>{title}</h2>
        
//         {/* Show Collapse/Show All button for album sections */}
//         {showCollapse && type !== "songs" && data.length > 0 && (
//           <button
//             className={styles.collapseButton}
//             onClick={toggleCollapse}
//             data-testid={`${title.toLowerCase().replace(" ", "-")}-collapse-btn`}
//             id={`${title.toLowerCase().replace(" ", "-")}-collapse-btn`}
//           >
//             {isCollapsed ? "Show All" : "Collapse"}
//           </button>
//         )}
//       </div>

//       {/* Genre Tabs for Songs */}
//       {type === "songs" && (
//         <div className={styles.tabsContainer}>
//           <Tabs
//             value={selectedGenre}
//             onChange={handleGenreChange}
//             className={styles.tabs}
//             TabIndicatorProps={{ style: { display: "none" } }}
//           >
//             <Tab
//               value="All"
//               label="All"
//               className={`${styles.tab} ${
//                 selectedGenre === "All" ? styles.activeTab : ""
//               }`}
//             />
//             {genres.map((genre) => (
//               <Tab
//                 key={genre.key}
//                 value={genre.label}
//                 label={genre.label}
//                 className={`${styles.tab} ${
//                   selectedGenre === genre.label ? styles.activeTab : ""
//                 }`}
//               />
//             ))}
//           </Tabs>
//         </div>
//       )}

//       {/* Content - Carousel for songs or collapsed albums, Grid for expanded albums */}
//       {type === "songs" || isCollapsed ? (
//         <Carousel
//           data={filteredData}
//           renderComponent={(item) => <Card data={item} type={type} />}
//         />
//       ) : (
//         <div className={styles.cardsGrid}>
//           {filteredData.map((item) => (
//             <Card key={item.id} data={item} type={type} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Section;

import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "@mui/material";
import axios from "axios";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";
import styles from "./Section.module.css";

function Section({
  title,
  apiEndpoint,
  showCollapse = true,
  type = "albums",
  genresEndpoint,
}) {
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [showAll, setShowAll] = useState(false); // Renamed for clarity
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log(`🔍 Fetching ${title} from: ${apiEndpoint}`);
        
        const response = await axios.get(apiEndpoint);
        console.log(`✅ ${title}: Received ${response.data.length} items`);
        setData(response.data);
        
        if (type === "songs" && genresEndpoint) {
          console.log(`🔍 Fetching genres from: ${genresEndpoint}`);
          const genresResponse = await axios.get(genresEndpoint);
          console.log(`✅ Received genres:`, genresResponse.data.data);
          setGenres(genresResponse.data.data);
        }
        
      } catch (error) {
        console.error(`❌ Error fetching ${title}:`, error);
        console.error(`❌ Failed URL: ${apiEndpoint}`);
        setError(`Failed to load ${title}. Please check the API endpoint.`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint, type, genresEndpoint, title]);

  const handleGenreChange = (event, newValue) => {
    setSelectedGenre(newValue);
  };

  // Filter songs based on selected genre
  const filteredData =
    type === "songs" && selectedGenre !== "All"
      ? data.filter((item) => item.genre?.label === selectedGenre)
      : data;

  const toggleShowAll = () => {
    console.log(`🔄 Toggling ${title} from ${showAll ? 'show all' : 'show limited'} to ${!showAll ? 'show limited' : 'show all'}`);
    setShowAll(!showAll);
  };

  // Determine which data to display based on showAll state
  const displayData = showAll ? filteredData : filteredData.slice(0, 6);

  // Debug logs
  console.log("Section debug:", {
    title,
    showCollapse,
    type,
    showAll,
    dataLength: data.length,
    displayDataLength: displayData.length,
    loading,
    error,
    shouldShowButton: showCollapse && type !== "songs" && data.length > 6,
  });

  if (loading) {
    return (
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{title}</h2>
        </div>
        <div className={styles.loading}>Loading {type}...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{title}</h2>
        </div>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div
      className={styles.section}
      data-testid={`${title.toLowerCase().replace(" ", "-")}-section`}
    >
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        
        {/* Show Show All/Show Less button for album sections when there are more than 6 items */}
        {showCollapse && type !== "songs" && data.length > 6 && (
          <button
            className={styles.collapseButton}
            onClick={toggleShowAll}
            data-testid={`${title.toLowerCase().replace(" ", "-")}-show-all-btn`}
            id={`${title.toLowerCase().replace(" ", "-")}-show-all-btn`}
          >
            {showAll ? "Show Less" : "Show All"}
          </button>
        )}
      </div>

      {/* Genre Tabs for Songs */}
      {type === "songs" && (
        <div className={styles.tabsContainer}>
          <Tabs
            value={selectedGenre}
            onChange={handleGenreChange}
            className={styles.tabs}
            TabIndicatorProps={{ style: { display: "none" } }}
          >
            <Tab
              value="All"
              label="All"
              className={`${styles.tab} ${
                selectedGenre === "All" ? styles.activeTab : ""
              }`}
            />
            {genres.map((genre) => (
              <Tab
                key={genre.key}
                value={genre.label}
                label={genre.label}
                className={`${styles.tab} ${
                  selectedGenre === genre.label ? styles.activeTab : ""
                }`}
              />
            ))}
          </Tabs>
        </div>
      )}

      {/* Content - Always use grid for albums, carousel for songs */}
      {type === "songs" ? (
        <Carousel
          data={filteredData}
          renderComponent={(item) => <Card data={item} type={type} />}
        />
      ) : (
        <div className={styles.cardsGrid}>
          {displayData.map((item) => (
            <Card key={item.id} data={item} type={type} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Section;