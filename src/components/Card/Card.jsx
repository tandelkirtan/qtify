// import React from "react";
// import styles from "./Card.module.css";
// import { Chip } from '@mui/material';

// function Card() {

//   return (
//     <div className={styles.cardd}>
//       <div className={styles.carddiv}>
//         <div className={styles.card}>
//       <div className={styles.cardImageContainer}>
//         <img 
//           src="" 
//           alt="imgg"
//           className={styles.cardImage}
//         />
//         <div className={styles.chipContainer}>
//           <Chip 
//             label="lable"
//             size="small"
//             className={styles.followChip}
//           />
//         </div>
//       </div>
      
//       <div className={styles.cardContent}>
//         <p className={styles.albumTitle}>Title</p>
//       </div>
//     </div>
//       </div>
//     </div>
//   );
// }

// export default Card;


import React from "react";
import styles from "./Card.module.css";
// import { Chip } from '@mui/material';

function Card({ album }) {
  if (!album) return null;

  return (
    <div className={styles.card}>
      <div className={styles.cardImageContainer}>
        <img 
          src={album.image} 
          alt={album.title}
          className={styles.cardImage}
        />
        <div className={styles.chipContainer}>
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <p className={styles.follodiv}>{`${album.follows} Follows`  }</p>
        <p className={styles.albumTitle}>{album.title}</p>
      </div>
    </div>
  );
}

export default Card;