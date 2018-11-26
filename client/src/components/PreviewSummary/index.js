import React from 'react';
import {Editor} from 'react-draft-wysiwyg';
import {convertFromRaw, EditorState} from 'draft-js';


export default class PreviewSummary extends React.Component {

    render() {
        let content;
        if (this.props.text) {
            content = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.text)));
        }
        return (
            <div>
                {this.props.text && <Editor editorState={content} readOnly={true} disabled/>}
            </div>
        );
    }
}