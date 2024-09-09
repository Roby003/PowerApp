import { Button, Card, CardContent, Chip, Divider, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ConfirmRemoveModal from "../../../../components/utility/ConfirmRemoveModal";
import { useLogContext } from "../../../../contexts/LogWorkoutContext";
import useCategoryService from "../../../../services/CategoryService";
import useExerciseService from "../../../../services/ExerciseService";
import Resources from "../../../../statics/Resources";
function TemplateListItem({ template, triggerRemoveTemplate }) {
  const { createWrkFromTemplate } = useLogContext();
  const { getExercisesByTemplate } = useExerciseService();
  const { getCategoriesByTemplate } = useCategoryService();
  const [categories, setCategories] = useState();
  const [exercisesList, setExerciseList] = useState();

  useEffect(() => {
    const loadFromDb = async () => {
      setCategories(await getCategoriesByTemplate(template.templateId));
      setExerciseList(await getExercisesByTemplate(template.templateId));
    };
    loadFromDb();
  }, []);

  return (
    exercisesList &&
    exercisesList.length > 0 && (
      <>
        <Tooltip title={exercisesList.toString()} placement="right">
          <Card variant="" className="mediumMarginTop">
            <div className="row">
              <CardContent>
                <Typography sx={{ fontSize: "large", fontWeight: 500 }}>{template.title}</Typography>

                <div className="chipContainer">
                  {categories &&
                    categories.map((cat) => (
                      <Chip key={cat} size="small" className="categoryChip" label={cat} variant="elevation" />
                    ))}
                </div>
              </CardContent>
            </div>
            <div className="row flexRight">
              <Button
                className="fitContent"
                onClick={() => {
                  createWrkFromTemplate(template.templateId);
                }}
              >
                {Resources.Use}
              </Button>
              <ConfirmRemoveModal
                entityName={"template"}
                entityTitle={template.title}
                lambdaOnDelete={() => triggerRemoveTemplate(template.templateId)}
              />
            </div>
          </Card>
        </Tooltip>
        <Divider variant="fullwidth" />
      </>
    )
  );
}

export default TemplateListItem;
