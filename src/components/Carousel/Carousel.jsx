import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import LeftNavigation from './LeftNavigation';
import RightNavigation from './RightNavigation';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './Carousel.module.css';

function Carousel({ data, renderComponent }) {
  return (
    <div className={styles.carouselWrapper}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={'auto'}
        navigation={{
          nextEl: '.right-navigation',
          prevEl: '.left-navigation'
        }}
        className={styles.carousel}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id} className={styles.swiperSlide}>
            {renderComponent(item)}
          </SwiperSlide>
        ))}
        
        <LeftNavigation />
        <RightNavigation />
      </Swiper>
    </div>
  );
}

export default Carousel;