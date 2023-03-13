import listeningApi from "apis/listeningApi";
import ListeningDetailModal from "components/UI/ListeningDetailModal";
import { equalArray } from "helper";
import React, { useEffect, useRef, useState } from "react";
import ListeningAdmin from "./index";

function ListeningAdminData() {
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState("Newest");
  const [packInfo, setPackInfo] = useState(() => ({
    topic: "All",
  }));
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [more, setMore] = useState(true); // toggle infinite scrolling
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const totalPage = useRef(0);
  const preSearchList = useRef([]);

  const nextPage = () => {
    if (page < totalPage.current) {
      setPage(page + 1);
    } else {
      setMore(false);
    }
  };

  const settingWordPack = (info) => {
    // check old pack vs new pack
    let isEqual = true;
    if (packInfo !== "topic" && packInfo.topic !== info.topic) {
      isEqual = false;
    }
    if (isEqual) isEqual = equalArray(packInfo.topic, info.topic);

    totalPage.current = 0;
    preSearchList.current = [];
    setMore(true);
    setList([]);
    setPackInfo(info);
    setPage(1);
  };

  const onSortTypeChange = (type = "Newest") => {
    if (type === sortType) return;
    preSearchList.current = [];
    setSortType(type);
    setPage(1);
    setList([]);
  };

  const onSearchWord = async (name) => {
    try {
      if (name === "") {
        setList(preSearchList.current);
        setMore(true);
        return;
      }
      const apiRes = await listeningApi.searchListen(name);
      if (apiRes.status === 200) {
        // const { packList = [] } = apiRes.data.listens;
        setList(apiRes.data.listens);
        setMore(false);
      }
    } catch (error) {}
  };

  // get word pack
  useEffect(() => {
    let isSub = true;
    (async function () {
      try {
        setLoading(true);
        let apiRes = null;
        if (packInfo.topic === "All") {
          apiRes = await listeningApi.getAllListen(sortType);
        } else {
          apiRes = await listeningApi.getListenByTopic(
            packInfo.topic,
            sortType
          );
        }
        if (apiRes && isSub) {
          const newList = apiRes.data.listens.filter((item) => {
            return item.isLocked === 0
          })
          preSearchList.current = newList;
          setList(newList);
        }
      } catch (error) {
      } finally {
        if (isSub) {
          setLoading(false);
          isFirstLoad && setIsFirstLoad(false);
        }
      }
    })();

    return () => (isSub = false);
  }, [page, packInfo, sortType]);

  return (
    <>
      <ListeningAdmin
        list={list}
        loading={loading}
        onLoadData={nextPage}
        more={more}
        isFirstLoad={isFirstLoad}
        onSettingWordPack={settingWordPack}
        onSortTypeChange={onSortTypeChange}
        onSearchWord={onSearchWord}
      />
      <ListeningDetailModal />
    </>
  );
}

export default ListeningAdminData;
