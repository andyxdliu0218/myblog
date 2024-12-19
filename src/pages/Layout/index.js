import { req } from "@/utils";
import { useEffect } from "react";

const Layout = () => {
  useEffect(() => {
    req.get("/blog");
  }, []);

  return <div>this is Layout</div>;
};
export default Layout;
