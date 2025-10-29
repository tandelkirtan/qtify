// import React from 'react';
// import Section from '../components/Section/Section';
// import Hero from "../components/Hero/Hero";
// import Navbar from "../components/Navbar/Navbar";
// import styles from './Home.module.css';

// function Home() {
//   return (
//     <div className={styles.home}>
//       <Navbar />
//       <Hero />
//       <Section 
//         title="Top Albums"
//         apiEndpoint="https://qtify-backend.labs.crio.do/albums/top"
//         showCollapse={true}
//       />
//       <Section 
//         title="New Albums"
//         apiEndpoint="https://qtify-backend.labs.crio.do/albums/new"
//         showCollapse={true}
//       />
//     </div>
//   );
// }

// export default Home;

import React from 'react';
import Section from '../components/Section/Section';
import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.home}>
      <Navbar />
      <Hero />
      
      {/* Top Albums Section */}
      <Section 
        title="Top Albums"
        apiEndpoint="https://qtify-backend.labs.crio.do/albums/top"
        showCollapse={true}
      />
      
      {/* New Albums Section */}
      <Section 
        title="New Albums"
        apiEndpoint="https://qtify-backend.labs.crio.do/albums/new"
        showCollapse={true}
      />
    </div>
  );
}

export default Home;