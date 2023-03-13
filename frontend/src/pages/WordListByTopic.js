import React, { useEffect, useRef, useState } from "react";
import useTitle from "hooks/useTitle";
import { makeStyles } from "@material-ui/core/styles";
import { dictionaryRoot } from "components/UI/style";
import LoopIcon from "@material-ui/icons/Loop";
import AutoSearchInput from "components/UI/AutoSearchInput";
import InfiniteScroll from "components/UI/InfiniteScroll";
import WordSortModal from "components/UI/WordSortModal";
import WordItem from "components/WordAdmin/WordItem";
import WordSkeleton from "components/WordAdmin/WordSkeleton";
import wordApi from "apis/wordApi";
import WordDetailModal from "components/UI/WordDetailModal";
import { useParams } from "react-router";

const useStyle = makeStyles((theme) => ({
  ...dictionaryRoot(theme),
}));
const perPage = 20;

export default function WordListByTopicPage() {
  useTitle("Word");
  const classes = useStyle();
  const { topic_id } = useParams();
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState("rand");
  const [packInfo, setPackInfo] = useState(() => ({
    type: "-1",
    level: "-1",
    specialty: "-1",
    topics: [topic_id],
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


  const onSortTypeChange = (type = "rand") => {
    if (type === sortType) return;
    preSearchList.current = [];
    setSortType(type);
    setPage(1);
    setList([]);
  };

  const onSearchWord = async (word) => {
    try {
      if (word === "") {
        setList(preSearchList.current);
        setMore(true);
        return;
      }

      const apiRes = await wordApi.searchWord(word);
      if (apiRes.status === 200) {
        const { packList = [] } = apiRes.data;
        setList(packList);
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
        const apiRes = await wordApi.getWordList(
          page,
          perPage,
          packInfo,
          sortType
        );
        if (apiRes && isSub) {
          const { packList = [] } = apiRes.data;
          const newList = [...list, ...packList];
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
    <div className="container">
      <div className={`${classes.root} english-container`}>
        {/* title - menu */}
        <div className="flex-center-between">
          <h1 className="english-title">Vocabulary</h1>
          <div>
            <WordSortModal
              onSelect={onSortTypeChange}
              classNameIcon="english-setting-icon mr-5"
            />
          </div>
        </div>
        <div className="english-break"></div>

        {/* list content */}
        <div className={classes.contentWrap}>
          <AutoSearchInput disabled={loading} onSearch={onSearchWord} />

          <div className={`${classes.listWrap} w-100`}>
            <ul id="dictionaryId" className={`${classes.list} flex-col w-100`}>
              <>
                {isFirstLoad ? (
                  <WordSkeleton className={classes.skeleton} />
                ) : (
                  <>
                    {list && list.length > 0 ? (
                      <>
                        {/* render list */}
                        {list.map((item, index) => (
                          <li className={classes.listItem} key={index}>
                            <WordItem {...item} />
                          </li>
                        ))}

                        {/* infinite scrolling */}
                        {!loading && more && (
                          <InfiniteScroll
                            onTouchAnchor={nextPage}
                            threshold={1}
                          >
                            <div className="w-100 t-center">
                              <LoopIcon className="ani-spin" />
                            </div>
                          </InfiniteScroll>
                        )}
                      </>
                    ) : (
                      // empty list
                      <h3 className="notfound-title h-100 flex-center t-center">
                        No words found in dictionary
                      </h3>
                    )}
                  </>
                )}
              </>
            </ul>
          </div>
        </div>
      </div>
      <WordDetailModal />
    </div>
  );
}
