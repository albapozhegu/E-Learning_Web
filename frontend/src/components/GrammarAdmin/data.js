import grammarApi from "apis/grammarApi";
import GrammarDetailModal from "components/UI/GrammarDetailModal";
import { equalArray } from "helper";
import React, { useEffect, useRef, useState } from "react";
import GrammarAdmin from "./index";

function ListeningAdminData() {
  const [page, setPage] = useState(1);
  const [packInfo, setPackInfo] = useState(() => ({
    level: "All",
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
    if (packInfo !== "level" && packInfo.level !== info.level) {
      isEqual = false;
    }
    if (isEqual) isEqual = equalArray(packInfo.level, info.level);

    totalPage.current = 0;
    preSearchList.current = [];
    setMore(true);
    setList([]);
    setPackInfo(info);
    setPage(1);
  };

  const onSearchWord = async (title) => {
    try {
      if (title === "") {
        setList(preSearchList.current);
        setMore(true);
        return;
      }
      const apiRes = await grammarApi.searchGrammar(title);
      console.log(apiRes.data);
      if (apiRes.status === 200) {
        setList(apiRes.data);
        setMore(false);
      }
    } catch (error) {}
  };

  // get word pack
  useEffect(() => {
    let isSub = true;
    (async function () {
      try {
        console.log(packInfo);
        setLoading(true);
        let apiRes = null;
        if (packInfo.level === "All") {
          apiRes = await grammarApi.getAllGrammar();
        } else {
          apiRes = await grammarApi.getGrammarByLevel(packInfo.level);
        }
        if (apiRes && isSub) {
          const newList = apiRes.data.grammars.filter((item) => {
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
  }, [page, packInfo]);

  return (
    <>
      <GrammarAdmin
        list={list}
        loading={loading}
        onLoadData={nextPage}
        more={more}
        isFirstLoad={isFirstLoad}
        onSettingWordPack={settingWordPack}
        onSearchWord={onSearchWord}
      />
      <GrammarDetailModal />
    </>
  );
}

export default ListeningAdminData;
