import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLogContext } from "../../../contexts/LogWorkoutContext";
import useTemplateService from "../../../services/TemplateService";
import TemplateListItem from "./Components/TemplateListItem";

export default function TemplateLibrary() {
  const { getTemplates, removeTemplate } = useTemplateService();
  const { templateList, setTemplateList } = useLogContext([]);
  const [triggerReload, setTriggerReload] = useState(false);

  const triggerRemoveTemplate = async (templateId) => {
    await removeTemplate(templateId);
    setTriggerReload(!triggerReload);
  };
  useEffect(() => {
    async function loadFromDb() {
      setTemplateList(await getTemplates([10, 0], ["Title", 1]));
    }

    loadFromDb();
  }, [triggerReload]);

  return (
    <Box className="rightSide col-3">
      <Card variant="elevation">
        <CardContent>
          <div className="row">
            <Typography className="cardTitle col col-6" color="text.primary" gutterBottom>
              Template Library
            </Typography>
          </div>
          {typeof templateList != undefined &&
            templateList &&
            templateList.map((template) => (
              <TemplateListItem
                key={template.templateId}
                template={template}
                triggerRemoveTemplate={triggerRemoveTemplate}
              />
            ))}
        </CardContent>
      </Card>
    </Box>
  );
}
