import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import React, { useEffect, useState } from "react";
import useImageService from "../../services/ImageService";
function ImageSlider({ imageIds }) {
  const [image, setImage] = useState("");
  const [imageList, setImageList] = useState({});
  const [index, setIndex] = useState(0);
  const { getImage } = useImageService();

  useEffect(() => {
    if (index >= Object.keys(imageList).length) {
      async function load() {
        let image = await getImage(imageIds[index]);
        setImageList({ ...imageList, [index]: image });
      }
      load();
    }
  }, [index]);

  function handleLeftClick() {
    if (index > 0) setIndex((i) => i - 1);
  }

  function handleRightClick() {
    if (index < imageIds.length - 1) setIndex((i) => i + 1);
  }

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{ width: "100%", height: "100%", display: "flex", overflow: "hidden" }}>
        {Object.keys(imageList).map((key) => (
          <img
            key={key}
            src={`data:image/jpg;base64,${imageList[key]}`}
            className="workoutImage"
            style={{ translate: `${-100 * index}%` }}
          />
        ))}
      </div>
      <button onClick={handleLeftClick} className="img-slider-btn" style={{ left: 0 }}>
        <NavigateBeforeOutlinedIcon fontSize="large" htmlColor="white" />
      </button>
      <button onClick={handleRightClick} className="img-slider-btn" style={{ right: 0 }}>
        <NavigateNextIcon fontSize="large" htmlColor="white" />
      </button>
      <div
        style={{
          display: "flex",
          gap: ".25rem",
          position: "absolute",
          bottom: ".5rem",
          left: "50%",
          translate: "-50%",
        }}
      >
        {imageIds.map((id, i) =>
          i == index ? (
            <RadioButtonCheckedOutlinedIcon key={id} className="img-slider-dot" sx={{ color: "white" }} />
          ) : (
            <RadioButtonUncheckedOutlinedIcon key={id} className="img-slider-dot" sx={{ color: "white" }} />
          )
        )}
      </div>
    </div>
  );
}

export default ImageSlider;
