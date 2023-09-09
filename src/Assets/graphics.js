import { TiWeatherSunny } from "react-icons/ti";
import { IoThunderstorm } from "react-icons/io5";
import { RiMistLine } from "react-icons/ri";
import { WiSmoke } from "react-icons/wi";
import { GiDustCloud, GiSandstorm, GiTornado } from "react-icons/gi";
import {
  BsFillCloudHaze2Fill,
  BsSnow3,
  BsCloudRainHeavyFill,
  BsCloudDrizzleFill,
  BsFillCloudFog2Fill,
  BsCloudsFill,
} from "react-icons/bs";

export const Icon = (weatherCond) => {
  switch (weatherCond) {
    case "Thunderstorm":
      return <IoThunderstorm />;
    case "Drizzle":
      return <BsCloudDrizzleFill />;
    case "Rain":
      return <BsCloudRainHeavyFill />;
    case "Snow":
      return <BsSnow3 />;
    case "Mist":
      return <RiMistLine />;
    case "Smoke":
      return <WiSmoke />;
    case "Haze":
      return <BsFillCloudHaze2Fill />;
    case "Dust":
      return <GiDustCloud />;
    case "Fog":
      return <BsFillCloudFog2Fill />;
    case "Sand":
      return <GiSandstorm />;
    case "Ash":
      return <WiSmoke />;
    case "Squall":
      return <TiWeatherSunny />;
    case "Tornado":
      return <GiTornado />;
    case "Clear":
      return <TiWeatherSunny />;
    case "Clouds":
      return <BsCloudsFill />;

    default:
      return null;
  }
};
