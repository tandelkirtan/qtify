// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Card from '../Card/Card';
// import Carousel from '../Carousel/Carousel';
// import styles from './Section.module.css';

// function Section({ title, apiEndpoint, showCollapse = true }) {
//   const [albums, setAlbums] = useState([]);
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAlbums = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(apiEndpoint);
//         setAlbums(response.data);
//         setError(null);
//       } catch (error) {
//         console.error('Error fetching albums:', error);
//         setError('Failed to load albums');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAlbums();
//   }, [apiEndpoint]);

//   const toggleCollapse = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   if (loading) {
//     return (
//       <div className={styles.section}>
//         <div className={styles.sectionHeader}>
//           <h2 className={styles.sectionTitle}>{title}</h2>
//         </div>
//         <div className={styles.loading}>Loading...</div>
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
//     <div className={styles.section}>
//       <div className={styles.sectionHeader}>
//         <h2 className={styles.sectionTitle}>{title}</h2>
//         {showCollapse && (
//           <button className={styles.collapseButton} onClick={toggleCollapse}>
//             {isCollapsed ? 'Show All' : 'Collapse'}
//           </button>
//         )}
//       </div>
      
//       {isCollapsed ? (
//         <Carousel 
//           data={albums}
//           renderComponent={(album) => <Card album={album} />}
//         />
//       ) : (
//         <div className={styles.cardsGrid}>
//           {albums.map((album) => (
//             <Card key={album.id} album={album} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Section;

import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from '@mui/material';
import axios from 'axios';
import Card from '../Card/Card';
import Carousel from '../Carousel/Carousel';
import styles from './Section.module.css';

function Section({ 
  title, 
  apiEndpoint, 
  showCollapse = true, 
  type = "albums",
  genresEndpoint 
}) {
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch main data
        const response = await axios.get(apiEndpoint);
        setData(response.data);
        
        // Fetch genres if it's a songs section
        if (type === "songs" && genresEndpoint) {
          const genresResponse = await axios.get(genresEndpoint);
          setGenres(genresResponse.data.data);
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint, type, genresEndpoint]);

  const handleGenreChange = (event, newValue) => {
    setSelectedGenre(newValue);
  };

  // Filter songs based on selected genre
  const filteredData = type === "songs" && selectedGenre !== 'All' 
    ? data.filter(item => item.genre?.label === selectedGenre)
    : data;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (loading) {
    return (
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{title}</h2>
        </div>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {showCollapse && type !== "songs" && (
          <button className={styles.collapseButton} onClick={toggleCollapse}>
            {isCollapsed ? 'Show All' : 'Collapse'}
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
            TabIndicatorProps={{ style: { display: 'none' } }}
          >
            <Tab 
              value="All" 
              label="All" 
              className={`${styles.tab} ${selectedGenre === 'All' ? styles.activeTab : ''}`}
            />
            {genres.map((genre) => (
              <Tab
                key={genre.key}
                value={genre.label}
                label={genre.label}
                className={`${styles.tab} ${selectedGenre === genre.label ? styles.activeTab : ''}`}
              />
            ))}
          </Tabs>
        </div>
      )}

      {/* Content */}
      {type === "songs" || isCollapsed ? (
        <Carousel 
          data={filteredData}
          renderComponent={(item) => (
            <Card 
              data={item}
              type={type}
            />
          )}
        />
      ) : (
        <div className={styles.cardsGrid}>
          {filteredData.map((item) => (
            <Card 
              key={item.id} 
              data={item}
              type={type}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Section;