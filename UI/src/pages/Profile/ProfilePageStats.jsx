import React, { useState } from "react";
import useTemplateService from "../../services/TemplateService";
import useUtils from "../../utils/Utils";
import TemplateStatsItemProfile from "../Stats/TemplateStats/TemplateStatsItemProfile";

function ProfilePageStats({ userId }) {
  const [templateInfo, setTemplateInfo] = useState(null);
  const { getMostUsedTemplateInfo } = useTemplateService();
  const { useEffectAsync } = useUtils();

  useEffectAsync(async () => {
    setTemplateInfo(await getMostUsedTemplateInfo(userId));
  }, []);

  return <>{templateInfo && <TemplateStatsItemProfile templateInfo={templateInfo} />}</>;
}

export default ProfilePageStats;
