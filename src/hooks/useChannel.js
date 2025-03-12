import { useState, useEffect } from "react";
import { getChannelListAPI } from "@/apis/article";

function useChannel() {
  //1. get channellist
  const [channellist, setChannellist] = useState([]);
  useEffect(() => {
    async function getChannelList() {
      const res = await getChannelListAPI();
      setChannellist(res.data);
    }
    getChannelList();
  }, []);
  //2. return channellist

  return {
    channellist,
  };
}

export { useChannel };
