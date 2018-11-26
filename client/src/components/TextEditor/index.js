import React from 'react';
import {Editor} from 'react-draft-wysiwyg';
import {convertToRaw, EditorState} from 'draft-js';

export default class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            text: null,
            rawText: null
        }
    }

    getContent() {
        return this.state.text
    }

    getRawText() {
        return this.state.rawText
    }

    onEditorStateChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        const rawContent = convertToRaw(contentState);
        this.setState({
            editorState: editorState,
            text: JSON.stringify(rawContent),
            rawText: contentState.getPlainText()
        });
    };

    render() {
        return (
            <div>
                <Editor
                    editorState={this.state.editorState}
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        );
    }
}