import React from "react";
import { BtnType, BtnMode } from "../../Btn";
import Image, { ImageDataType } from "../../Image";
import Bullets, { BulletsProps } from "./Bullets";
import textHighlighter from "../../../util/textHighlighter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

export interface SectionCardProps {
  image?: ImageDataType;
  imageStyle?: string;
  title?: string;
  subTitle?: string;
  desc?: string;
  btnText?: string;
  btnType?: BtnType;
  btnMode?: BtnMode;
  bgColorCard?: string;
  textColor?: string;
  type?: "imageCard";
  bullets?: BulletsProps;
  containerImageStyle?: string;
  textHighlighterStyle?: string;
  footerLink?: {
    text: string;
    link: string;
    textColor: string;
    hasIcon?: boolean;
  };
  hasIconInTitle?: boolean;
  iconInTitle?: "faDollarSign";
}

const SectionCard: React.FC<SectionCardProps> = ({
  bgColorCard,
  image,
  title,
  desc,
  textColor,
  type,
  bullets,
  footerLink,
  imageStyle,
  containerImageStyle,
  subTitle,
  textHighlighterStyle,
  iconInTitle = "faDollarSign",
  hasIconInTitle,
}) => {
  const icons = {
    faDollarSign,
  };

  return (
    <>
      {image && type === "imageCard" ? (
        <div
          className={`w-full h-full flex justify-center items-center ${containerImageStyle}`}
        >
          <Image imageStyle={`${imageStyle} `} imageData={image} />
        </div>
      ) : (
        <div
          className={`flex flex-col p-3 justify-center items-center ${textColor} ${bgColorCard} h-full lg:h-auto`}
        >
          <div className={`w-11/12 lg:w-1/2 flex flex-col font-bold`}>
            {hasIconInTitle ? (
              <div className="flex items-center gap-3">
                <h1 className="lg:text-5xl text-4xl text-left p-0 m-0">
                  {textHighlighter(title, textHighlighterStyle)}
                </h1>
                <FontAwesomeIcon
                  icon={icons[iconInTitle]}
                  className="text-9xl text-white"
                />
              </div>
            ) : (
              <h1 className="lg:text-5xl text-4xl text-left p-0 m-0">
                {textHighlighter(title, textHighlighterStyle)}
              </h1>
            )}
            <p className="lg:text-5xl text-4xl text-left p-0 m-0 font-normal">
              {textHighlighter(subTitle)}
            </p>
            <p className="lg:text-lg text-left p-0 m-0 mt-12">
              {textHighlighter(desc)}
            </p>
            {bullets && <Bullets {...bullets} />}
            {footerLink && (
              <a
                className={`lg:text-lg underline underline-offset-8 ${footerLink.textColor}`}
                href={footerLink.link}
              >
                {footerLink.text}
                {footerLink.hasIcon && (
                  <Image
                    imageData={{
                      title: "arrow",
                      description: "arrow",
                    }}
                    src="/icon/icon-arrow-up-right.svg"
                    imageStyle="w-6"
                  />
                )}
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SectionCard;
