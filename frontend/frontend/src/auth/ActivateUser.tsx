import { Spin } from "antd";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import authSvc from "../service/auth.service";

const ActivateUser = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  console.log(token);

  useEffect(() => {
    if (!token) return;
   authSvc.activateUser(token)
    navigate("/")
  });
  return (
    <div className="p-4">
      <div className="h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    </div>
  );
};

export default ActivateUser;
