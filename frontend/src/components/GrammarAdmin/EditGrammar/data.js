import grammarApi from 'apis/grammarApi';
import React, { useState, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { messageReducer } from '/src/redux/reducers/messageReducer';
import CreateGrammar from './index';
import { setMessage } from 'redux/actions/messageAction';
//import messageReducer from 'redux/reducers/messageReducer';

const analysisLinkVideo = (linkVideo = '') => {
  if (typeof linkVideo !== 'string' || linkVideo === '') {
    return null;
  }

  let checkVid = linkVideo.includes("https://www.youtube.com")
  if(!checkVid){
      checkVid =linkVideo.includes("youtu.be/")
      if(checkVid)
      {
        return linkVideo;
      }
      return null;
  }
  return linkVideo;
};


function CreateGrammarData() {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();


  const handleSubmit = async (data) => {
    try {
      setSubmitting(true);
      const { VidUpload, LinkVideo, ...rest } = data;
      let dataSend = []
      if(VidUpload == null){
      //  console.log(data)
        const videoUrl = analysisLinkVideo(LinkVideo);
        if (videoUrl==null) {
          dispatch(setMessage("Link video is invalid.", "warning"));
          setSubmitting(false);
          return;
        }
        dataSend ={
          ...rest,
         Video: videoUrl,
        };
      }
      else{
        dataSend ={
          ...rest,
         Video: VidUpload,
        };  
      }  
      console.log(dataSend);   
      const apiRes = await grammarApi.postGrammar(dataSend);

      if (apiRes.status === 200) {
        dispatch(setMessage("Created grammar successfully", "success"));
        setSubmitting(false);
     }

    } catch (error) {
      const message =  error.response?.data?.message ||
      'Error, can not create listening.';
        dispatch(setMessage(message, "error"));
      setSubmitting(false);
    }
  };

  return (
    <CreateGrammar onSubmitForm={handleSubmit} submitting={submitting} />
  );
}

export default CreateGrammarData;
