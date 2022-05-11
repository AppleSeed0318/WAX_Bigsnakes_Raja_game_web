import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import "./index.module.css";

export interface Prop {
  items: any,
  ids: any,
  stakedList: any,
}

export const SlideView = ({items, ids, stakedList}:Prop) => {

  const style = {
    display: "flex",
    justifyContent: "center",
  }

  const [preview, setPerView] = useState(4);
  const [dimensions, setDimensions] = useState({ height: window.innerHeight, width: window.innerWidth});
  function handleResize() {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth
    })
    if(window.innerWidth < 600) {
      setPerView(1);
    }
    else if(window.innerWidth < 800) {
      setPerView(2);
    }
    else if(window.innerWidth < 1080) {
      setPerView(3);
    }
    else {
      setPerView(4);
    }
  }
  useEffect(() => {  
    window.addEventListener('resize', handleResize);
  });

  

  return (
    <Swiper
      slidesPerView={preview}
      spaceBetween={30}
      pagination={{
        type: "progressbar",
      }}
      modules={[Pagination, Navigation]}
      className="mySwiper"
      navigation={true}
      
    >
      {
        items.map((data:any, index:any) =>{
          
          var flag = true;
          for (var i = 0; i < stakedList.length; i ++) {
            if(stakedList[i] == ids[index]) {
              flag = false;
              break;
            }
          }

          if(flag) {
            return (<SwiperSlide style = {style} key = "data">{data}</SwiperSlide>);
          } else {
            return (<></>);
          }

        })
      }
    </Swiper>
  );
};
