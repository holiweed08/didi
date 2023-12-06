import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useScreenSize from "../hooks/useScreenSize";
import Banner, { BannerProps } from "./Banner";
import Image, { ImageDataType } from "./Image";

function NextArrow(props: any) {
  const { onClick, arrow, arrowColor } = props;
  return (
    <button
      className={`${arrowColor} absolute z-50 right-5 top-1/2 transform -translate-y-1/2 text-4xl sm:text-2sm border-0 p-0 outline-0 bg-inherit cursor-pointer hover:font-bold m-0`}
      onClick={onClick}
    >
      {arrow}
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick, arrow, arrowColor } = props;
  return (
    <button
      className={`${arrowColor} absolute z-50 left-5 top-1/2 transform -translate-y-1/2 text-4xl sm:text-2sm border-0 p-0 outline-0 bg-inherit cursor-pointer hover:font-bold m-0`}
      onClick={onClick}
    >
      {arrow}
    </button>
  );
}

export interface CarouselProps {
  slides?: BannerProps[];
  images?: ImageDataType[];
  carouselType: "Banner" | "Images";
  slidesToShow?: number;
  slidesToScroll?: number;
  arrowNext?: string;
  arrowPrev?: string;
  arrowColor?: string;
  isAutoPlay?: boolean;
  speedAutoPlay?: number;
  imagesMobile?: ImageDataType[];
  imageContainerStyle?: string;
  imageStyle?: string;
  slidesToShowMobile?: number;
}

const Carousel = (props: CarouselProps) => {
  const {
    speedAutoPlay,
    isAutoPlay,
    slides,
    carouselType,
    slidesToShow,
    slidesToScroll,
    images,
    arrowNext,
    arrowPrev,
    arrowColor,
    imagesMobile,
    imageContainerStyle,
    imageStyle,
    slidesToShowMobile = 1
  } = props;

  const screenSize = useScreenSize()

  const toShow = slidesToShow ? slidesToShow : 1;
  const toScroll = slidesToScroll ? slidesToShow : 1;

  const breakpoint = 1079;

  const isMobile = imagesMobile && imagesMobile.length > 0 && screenSize <= breakpoint

  let sliderContent;

  if (carouselType === "Banner") {
    sliderContent = slides?.map((sld) => {
      return (
        <div>
          <Banner {...sld}></Banner>
        </div>
      );
    });
  } else if (carouselType === "Images") {
    const imagesData = isMobile ? imagesMobile : images
    sliderContent = imagesData?.map((img) => {
      return (
        <Image imageData={img} imageStyle={`${imageStyle} z-10 w-full`}></Image>
      );
    });
  }

  var settings: Settings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: isAutoPlay,
    speed: speedAutoPlay,
    autoplaySpeed: 0,
    slidesToShow: toShow,
    slidesToScroll: toScroll,
    pauseOnHover: false,
    cssEase: "linear",
    nextArrow: <NextArrow arrow={arrowNext} arrowColor={arrowColor} />,
    prevArrow: <PrevArrow arrow={arrowPrev} arrowColor={arrowColor} />,

    responsive: [
      {
        breakpoint,
        settings: {
          slidesToShow: slidesToShowMobile,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return <Slider {...settings}>{sliderContent && sliderContent}</Slider>;
};

export default Carousel;
