import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import Company from "../CompanyProfile/Company";
import SimilarCompanies from "../CompanyProfile/SimilarCompanies";

const CompanyPage=()=>{
  const navigate=useNavigate();
  return <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Divider size="xs" />
      
        <Button
          className="mt-3"
          onClick={()=>navigate(-1)}
          leftSection={<IconArrowLeft size={20} />}
          color="yellow.5"
          variant="light"
        >
          Back
        </Button>
      

      <div className="flex gap-5 mt-3">
        <Company/>
        <SimilarCompanies/>
      </div>
    </div>
}
export default CompanyPage;