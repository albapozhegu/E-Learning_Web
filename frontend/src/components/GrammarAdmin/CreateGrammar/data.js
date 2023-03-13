import grammarApi from 'apis/grammarApi';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CreateGrammar from './index';
import { setMessage } from 'redux/actions/messageAction';

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
      
      if (VidUpload && LinkVideo && LinkVideo.trim()!=""){
        dispatch(setMessage("Choose one of two options to add a video", "warning"));
        setSubmitting(false);
        return;
      }

      let dataSend = []
      if(VidUpload == null){
          if(LinkVideo || LinkVideo.trim()!='' ){
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
          };
        }
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
