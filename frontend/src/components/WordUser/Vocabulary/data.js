import commonApi from 'apis/commonApi';
import wordApi from 'apis/wordApi';
import { equalArray } from 'helper';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { setMessage } from 'redux/actions/messageAction';
import Vocabulary from '.';

const perPage = 7;

function VocabularyData() {
  const dispatch = useDispatch();
  const topicParams =useParams().topic;

  const list = useRef([]); // list store all item to prevent call API when prev button click
  const [currentList, setCurrentList] = useState([]);
  const [total, setTotal] = useState(-1);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    packInfo: {
    topics:[topicParams],
    }
  });

  // get total word pack
  useEffect(() => {
    let isSubscribe = true;

    if (total !== -1) {
      return;
    }

    (async function getTotalWordPack() {
      try {
        const apiRes = await commonApi.getWordTopicTotal(pageInfo.packInfo);

        if (apiRes.status === 200 && isSubscribe) {
          const total = apiRes.data.total;
          if (total === 0) {
            dispatch(
              setMessage("No word for this topic.","warning")
            );
          }
          setTotal(total);
        
        }
      } catch (error) {
        setTotal(0);
      }
    })();

    return () => (isSubscribe = false);
  }, [total]);


  // get word pack when page change
  useEffect(() => {
    let isSubscribe = true;
    if (pageInfo.page < list.current.length / perPage) return; // prevent call API when element already exists in the old array

    async function getVocabularyList() {
      try {
        const apiRes = await wordApi.getWordTopic(pageInfo.packInfo);

        if (apiRes.status === 200 && isSubscribe) {
          const filterList = apiRes.data.filter((item) => {
            return item.isLocked === 0
          })
          setCurrentList(filterList);
          list.current = [...list.current, filterList];
        }
      } catch (error) {}
    }

    isSubscribe && getVocabularyList();

    return () => (isSubscribe = false);
  }, [pageInfo]);


  return (
    <Vocabulary
     list={currentList}
      total={total}
    />
  );
}

export default VocabularyData;
