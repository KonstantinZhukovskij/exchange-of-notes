import React from 'react';
import {Editor} from 'react-draft-wysiwyg';
import {convertToRaw, EditorState} from 'draft-js';


export default class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            rawContent: null
        }
    }

    getRawContent() {
        return this.state.rawContent
    }

    onEditorStateChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        const rawContent = convertToRaw(contentState);
        this.setState({
            editorState: editorState,
            rawContent: JSON.stringify(rawContent)
        });
    };

    render() {
        return (
            <div>
                <Editor
                    editorState={this.state.editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        );
    }
}