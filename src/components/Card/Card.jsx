import React from "react";
import styles from "./Card.module.css";
import { Chip } from '@mui/material';

function Card({ data, type = "album" }) {
  if (!data) return null;

  // Determine if it's a song or album
  const isSong = type === "song";

  return (
    <div className={styles.card}>
      <div className={styles.cardImageContainer}>
        <img 
          src={data.image} 
          alt={data.title}
          className={styles.cardImage}
        />
        <div className={styles.chipContainer}>
          <Chip 
            label={isSong ? `${data.likes} Likes` : `${data.follows} Follows`}
            size="small"
            className={styles.followChip}
          />
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <p className={styles.albumTitle}>{data.title}</p>
      </div>
    </div>
  );
}

export default Card;