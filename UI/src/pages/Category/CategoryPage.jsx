import { Box, Button, Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCategoryService from "../../services/CategoryService";
import CategoryShowItem from "./CategoryShowItem";
import Paths from "../../statics/Paths";

function CategoryPage() {
  const { getCategories } = useCategoryService();
  const [categoryList, setCategoryList] = useState([]);
  const [triggerReload, setTriggerReload] = useState(false);
  const navigate = useNavigate();
  const reloadList = () => {
    setTriggerReload(!triggerReload);
    console.log("smth");
  };
  React.useEffect(() => {
    async function loadFromDb() {
      setCategoryList(await getCategories());
    }

    loadFromDb();
  }, [triggerReload]);

  return (
    <Box className="centerCard">
      <CardContent className="flexRight cardHeaders">
        <Button
          variant="contained"
          className="negativeMargin heightFitContent"
          onClick={() => navigate(Paths.addCategory)}
        >
          +Category
        </Button>
        <div className="pageTitle col">Categories</div>
      </CardContent>

      <Card variant="elevation" className="exerciseLibraryCard">
        <CardContent className="categoryList">
          {categoryList.map((cat) => (
            <CategoryShowItem key={cat.categoryId} category={cat} reloadList={reloadList} />
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}

export default CategoryPage;
