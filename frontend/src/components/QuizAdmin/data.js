import listeningApi from "apis/listeningApi";
import grammarApi from "apis/grammarApi";
import ListeningDetailModal from "components/UI/ListeningDetailModal";
import { equalArray } from "helper";
import React, { useEffect, useRef, useState } from "react";
import ListeningAdmin from "./index";
import quizApi from "apis/quizApi";

function QuizAdminData() {
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState("Newest");
  const [packInfo, setPackInfo] = useState(() => ({
   type: "All",
  }));
  const [loading, setLoading] = useState(true);
  const [listen, setListen] = useState([]);
  const [grammar, setGrammar] = useState([]);
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
    if (packInfo !== 'type' && packInfo.type !== info.type) {
      isEqual = false;
    }
    if (isEqual) isEqual = equalArray(packInfo.type, info.type);

    totalPage.current = 0;
    preSearchList.current = [];
    setMore(true);
    setListen([]);
    setGrammar([]);
    setPackInfo(info);
    setPage(1);
  };


  const onSearchWord = async (name) => {
    // try {
    //   if (name === "") {
    //     setList(preSearchList.current);
    //     setMore(true);
    //     return;
    //   }
    //   const apiRes = await listeningApi.searchListen(name);
    //   if (apiRes.status === 200) {
    //     // const { packList = [] } = apiRes.data.listens;
    //     setList(apiRes.data.listens);
    //     setMore(false);
    //   }
    // } catch (error) {}
  };

  // get word pack
  useEffect(() => {
    let isSub = true;
    (async function () {
      try {
        setLoading(true);
        let apiRes = null;
        if (packInfo.type === "All") {
          apiRes = await quizApi.getAllListenAndGrammar();
        } 
        else {
          console.log(packInfo)
          if(packInfo.type === "Listen"){
            apiRes = await listeningApi.getAllListen("Newest")
          }
          else{
            apiRes = await grammarApi.getAllGrammar();
          }
        }
       // const apiRes = await quizApi.getAllListenAndGrammar();
        if (apiRes.status ===200 && isSub) {
          // const { packList = [] } = apiRes.data.listens;
          // const newList = apiRes.data.listens;
          // preSearchList.current = newList;
          if(apiRes.data.listens){
            setListen(apiRes.data.listens);
          }
          if(apiRes.data.grammars){
            setGrammar(apiRes.data.grammars);
          }
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
        listen={listen}
        grammar={grammar}
        loading={loading}
        onLoadData={nextPage}
        more={more}
        isFirstLoad={isFirstLoad}
        onSettingWordPack={settingWordPack}
        // onSortTypeChange={onSortTypeChange}
        onSearchWord={onSearchWord}
      />
      <ListeningDetailModal />
    </>
  );
}

export default QuizAdminData;
