import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, OutlinedInput } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import useExerciseService from "../../../services/ExerciseService";
import useUtils from "../../../utils/Utils";
import ExerciseStatsItem from "./ExerciseStatsItem";

const TAKE_CONSTANT = 10;
function ExerciseStatsPage() {
  let { userId } = useParams();
  const { getExercisesInfo } = useExerciseService();
  const [ids, setIds] = useState([]);
  const { fetchDataForScroll } = useUtils();
  const [skip, setSkip] = useState(TAKE_CONSTANT);
  const input = useRef(null);
  useEffect(() => {
    async function f() {
      setIds(await getExercisesInfo(TAKE_CONSTANT, 0, input.current.value));
    }
    f();
  }, []);

  async function fetchData() {
    await fetchDataForScroll(
      setIds,
      skip,
      async () => await getExercisesInfo(TAKE_CONSTANT + skip, 0, input.current.value.trim())
    );
    setSkip(skip + TAKE_CONSTANT);
  }

  function update() {
    let timeout;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(async () => {
      setIds(await getExercisesInfo(TAKE_CONSTANT, 0, input.current.value.trim()));
    }, 1000);
  }
  return (
    <div className="col col-9">
      <div className="col col-12" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <OutlinedInput
          sx={{ width: "40%", marginTop: "5%", marginBottom: "5%", height: 60, background: "white" }}
          variant="outlined"
          inputRef={input}
          onChange={(e) => {
            update();
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#1976d2" }} />
            </InputAdornment>
          }
          onBlur={() => {
            input.current.value = "";
            setTimeout(() => setUsers([]), 100);
          }}
          placeholder="Search for exercises..."
        />
      </div>
      <InfiniteScroll dataLength={ids.length} next={fetchData} loader={<h4>Loading...</h4>} hasMore={true}>
        <div className="row">
          {ids.map((id) => (
            <ExerciseStatsItem key={id.exerciseId} exerciseInfo={id} userId={userId} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default ExerciseStatsPage;
