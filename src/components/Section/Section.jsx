import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
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
  const [genres, setGenres] = useState([{ key: "all", label: "All" }]);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
  const [carouselToggle, setCarouselToggle] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleToggle = () => {
    setCarouselToggle((prevState) => !prevState);
  };

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
          setGenres([{ key: "all", label: "All" }, ...genresResponse.data.data]);
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
    const index = genres.findIndex(genre => genre.label === newValue);
    setSelectedFilterIndex(index);
  };

  // Filter data based on selected genre (matching first code logic)
  const cardsToRender = data.filter((card) =>
    type === "songs" && selectedFilterIndex !== 0
      ? card.genre.key === genres[selectedFilterIndex].key
      : card
  );

  const showFilters = type === "songs" && genres.length > 1;

  if (loading) {
    return (
      <div className={styles.section}>
        <div className={styles.header}>
          <h3>{title}</h3>
        </div>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.section}>
        <div className={styles.header}>
          <h3>{title}</h3>
        </div>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h3>{title}</h3>
        {showCollapse && (
          <h4 className={styles.toggleText} onClick={handleToggle}>
            {!carouselToggle ? "Collapse All" : "Show All"}
          </h4>
        )}
      </div>

      {/* Genre Tabs for Songs - matching first code's filter structure */}
      {showFilters && (
        <div className={styles.tabsContainer}>
          <Tabs
            value={genres[selectedFilterIndex].label}
            onChange={handleGenreChange}
            className={styles.tabs}
            TabIndicatorProps={{ style: { display: "none" } }}
          >
            {genres.map((genre, index) => (
              <Tab
                key={genre.key}
                value={genre.label}
                label={genre.label}
                className={`${styles.tab} ${
                  selectedFilterIndex === index ? styles.activeTab : ""
                }`}
              />
            ))}
          </Tabs>
        </div>
      )}

      {/* Content - matching first code's carousel/grid toggle logic */}
      {data.length === 0 ? (
        <CircularProgress />
      ) : (
        <div className={styles.cardsWrapper}>
          {!carouselToggle ? (
            <div className={styles.wrapper}>
              {cardsToRender.map((ele) => (
                <Card key={ele.id} data={ele} type={type} />
              ))}
            </div>
          ) : (
            <Carousel
              data={cardsToRender}
              renderComponent={(data) => <Card data={data} type={type} />}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Section;