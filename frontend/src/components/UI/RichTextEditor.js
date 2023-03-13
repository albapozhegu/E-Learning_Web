import React, { useRef } from "react";
import JoditEditor from "jodit-react";
const config =  {
  buttons: [
    'source', '|',
    'bold',
    'strikethrough',
    'underline',
    'italic', '|',
    'ul',
    'ol', '|',
    'outdent', 'indent',  '|',
    'font',
    'fontsize',
    'brush',
    'paragraph', '|',
    'image',
    'video',
    'table',
    'link', '|',
    'align', 'undo', 'redo', '|',
    'hr',
    'eraser',
    'copyformat', '|',
    'symbol',
    'fullsize',
    'print',
    'about'
],
};
const RichTextEditor = ({ initialValue, getValue}) => {
  const editor = useRef(null);

  return (
    <JoditEditor
      ref={editor}
      value={initialValue}
      config={config}
      tabIndex={1}
      //   onBlur={(newContent) => getValue(newContent)}
      onChange={(newContent) => getValue(newContent)}
    />
  );
};

export default RichTextEditor;
