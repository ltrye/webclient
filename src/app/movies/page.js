import FilmSection from "../global-components/FilmSection";
import getFilmList from "../global-utils/GetFilm";
import FilmPanel from "./components/filmPanel";
// import TrendSlider from "./components/trendSlider";
import "./style/page.scss";

export default async function Movies() {
  const filmData = await getFilmList("page=1&limit=15");

  return (
    <div>
      {/* <FilmSection /> */}
      {/* <TrendSlider /> */}
      <FilmPanel pageNumber={1} filmList={filmData.data} />
    </div>
  );
}
