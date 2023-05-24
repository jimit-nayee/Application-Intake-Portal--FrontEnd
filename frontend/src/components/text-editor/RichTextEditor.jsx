import React, { useState } from "react";
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import "./style.css"
import { BigButton } from "../../pdf/components/BigButton";

const RichTextEditor = ({setData,setViewPdfOrTextEditor}) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    return (
        <div className="App" >
            <h1 style={{display:"flex",justifyContent:"center",fontWeight:"bold",marginBottom:"20px"}}>Specify Reason For Rejecting Application In mast format</h1>
            <header className="App-header" style={{display:"flex",}}>
                <BigButton
                    marginRight={8}
                    inverted={true}
                    title={"Done"}
                    customFillColor="green"
                    hoverTextColor="white"
                    initialBgColor="white"
                    onClick={() => {
                        setData(draftToHtml(convertToRaw(editorState.getCurrentContent())))
                    }}



                />
                <BigButton
                    marginRight={8}
                    inverted={true}
                    title={"Back"}
                    customFillColor="red"
                    hoverTextColor="white"
                    initialBgColor="white"
                    onClick={() => {
                        setViewPdfOrTextEditor("pdf")
                    }}


                />
            </header>
            <Editor

                defaultEditorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
            />

        </div>
    );
};

export default RichTextEditor;
