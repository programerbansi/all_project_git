// // import RichTextEditor from "react-rte";
// import dynamic from "next/dynamic";
// import { useRouter } from "next/router";
// import PropTypes from "prop-types";

// const RichTextEditor = dynamic(() => import("react-rte"), { ssr: false });
// // const createValueFromString = dynamic(() => import("react-rte"), { ssr: false });
// import { useEffect, useState } from "react";
// const toolbarConfig = {
//   display: [
//     "INLINE_STYLE_BUTTONS",
//   ],
//   INLINE_STYLE_BUTTONS: [
//     { label: "Bold", style: "BOLD", className: "custom-css-class" },
//     { label: "Italic", style: "ITALIC" },
//     { label: "Underline", style: "UNDERLINE" }
//   ],
// };
// EditorField.propTypes = {
//   onChange: PropTypes.func,
// };

// export default function EditorField({name,handleEditorContentChange,ref}) {
  
//   // const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString("", "markdown"));
//   const [editorValue, setEditorValue] = useState();
//   const[edit,setEdit]=useState(false);
//   const router=useRouter();
//   let load=false;
//   useEffect(() => {
//       const importModule = async () => {
//         const module = await import("react-rte");
//         console.log(module,"---------module----------")
//         setEditorValue(module.createValueFromString("dddddd", "markdown"));
//       };
//       importModule();

//   }, [router.pathname]);

//   const onChange=(value) =>{
//     // console.log(value.toString("markdown"));
//     // setTimeout(() => {
//       console.log(value.toString("markdown"),"----------------value--------------")
//       setEditorValue(value.toString("markdown"));
//       setEdit(true);
//     // }, 2000);
   
//   }
//   useEffect(()=>{
//     handleEditorContentChange(editorValue);
//     // setTimeout(() => {
//     //   handleEditorContentChange(editorValue);
//     // }, 1000);
//     // return()=>{
//     //   setEdit(false);
//     // }
//   },[editorValue])

//   return (

//     <>
//       {/* {(typeof window !== 'undefined') && */}
//        <RichTextEditor onChange={onChange} value={editorValue} toolbarConfig={toolbarConfig} editorClassName={name} ref={ref}/>
//       {/* } */}
//     </>
//   );
// }
import React from 'react'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})
const EditorField = ({id,name,value,handleChange,error,touch,event2,tdref}) => {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
     
    ],
  }
  console.log(tdref)
  return (
    <>
      <ReactQuill theme="snow"  
          id={id} 
          ref={tdref}
          // name={name} 
          onChange={handleChange}
          modules={modules} 
          // onBlur={event2} 
          value={value}
          />
         {error && touch ?(<span className='text-danger'>{error}</span>): null}
    </>
  )
}

export default React.memo(EditorField)