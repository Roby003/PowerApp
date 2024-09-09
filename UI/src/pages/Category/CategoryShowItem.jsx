import { Button, Card, CardContent, Divider } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ConfirmRemoveModal from "../../components/utility/ConfirmRemoveModal";
import useCategoryService from "../../services/CategoryService";
import Paths from "../../statics/Paths";
import Resources from "../../statics/Resources";
function CategoryShowItem({ category, reloadList }) {
  const { removeCategory } = useCategoryService();
  return (
    <>
      <Card variant="">
        <CardContent className="exerciseItem">
          <div>{category.name}</div>
          <CardContent className="flexRight flexStart fullWidth noPadding">
            <Link to={`${Paths.categoryEditBuilder}${category.categoryId}`}>
              <Button variant="outlined">{Resources.Edit}</Button>
            </Link>
            <ConfirmRemoveModal
              entityName={"category"}
              entityTitle={category.name}
              lambdaOnDelete={() => {
                removeCategory(category.categoryId);
                reloadList();
              }}
              buttonVariant="outlined"
            />
          </CardContent>
        </CardContent>
      </Card>
      <Divider variant="middle" />
    </>
  );
}

export default CategoryShowItem;
