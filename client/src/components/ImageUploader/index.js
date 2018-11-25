import React from 'react';
import './index.css';


export default class ImageUploader extends React.Component {
    constructor() {
        super();
        this.handleAddImage = this.handleAddImage.bind(this);
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleCancelUpload = this.handleCancelUpload.bind(this);
        this.state = {
            file: null,
            dragOver: false,
            errorNotification: null
        };
    }

    handleDragEnter = (event) => {
        event.preventDefault();
    };

    handleDragOver = (event) => {
        event.preventDefault();
        if (!this.state.dragOver) {
            this.setState({
                dragOver: true
            });
        }
    };

    handleDragLeave = (event) => {
        event.preventDefault();
        this.setState({
            dragOver: false
        });
    };

    handleDrop = (event) => {
        event.preventDefault();
        let file = event.dataTransfer.files[0];
        let fileType = file.type.split("/")[0];
        if (fileType !== "image") {
            this.setState({
                file: null,
                errorNotification: "Вероятнее всего это не картинка",
                dragOver: false
            });
            return setTimeout(() => {
                this.setState({
                    errorNotification: null
                });
            }, 3000);
        }
        document.getElementById('upload-image-input').fileList = event.dataTransfer.files[0];
        this.setState({
            file,
            dragOver: false
        });
    };

    handleAddImage = (event) => {
        event.preventDefault();
        let file = this.refs.image.files[0];
        let fileType = this.refs.image.files[0].type.split('/')[0];
        if (fileType !== "image") {
            this.setState({
                file: null,
                errorNotification: "Вероятнее всего это не картинка",
                dragOverClass: ""
            });
            return setTimeout(() => {
                this.setState({
                    errorNotification: null
                });
            }, 3000);
        }
        this.setState({
            file
        });
    };

    handleUploadImage = (event) => {
        event.preventDefault();
    };

    handleCancelUpload = (event) => {
        event.preventDefault();
        this.setState({
            file: null
        });
    };

    render() {
        let dragOverClass = this.state.dragOver ? `display-box drag-over` : `display-box`;
        let uploadText = this.state.file
            ? <div>
                <p>{this.state.file.name}</p>
                <button
                    className="cancel-upload-button btn btn-warning"
                    onClick={this.handleCancelUpload}
                >
                    Отмена
                </button>
                <button
                    className="upload-button btn btn-primary"
                    onClick={this.handleUploadImage}
                >
                    Загрузить
                </button>
            </div>
            : <div>
                <p>Выберите картинку для загрузки</p>
            </div>;

        let errorNotification = this.state.errorNotification
            ? <div className="error-notification">
                <p>{this.state.errorNotification}</p>
            </div>
            : null;

        return (
            <div className="image-uploader-wrapper">
                <div className={dragOverClass}>
                    <div className="icon-text-box">
                        <div className="upload-icon">
                            <i className="fa fa-upload" aria-hidden="true"/>
                        </div>
                        <div className="upload-text">
                            {uploadText}
                        </div>
                        {errorNotification}
                    </div>
                    <div>
                        <input
                            type="file"
                            ref="image"
                            id="upload-image-input"
                            className="upload-image-input"
                            accept="image/*"
                            onDrop={this.handleDrop}
                            onDragEnter={this.handleDragEnter}
                            onDragOver={this.handleDragOver}
                            onDragLeave={this.handleDragLeave}
                            onChange={this.handleAddImage}
                        />
                    </div>
                </div>
            </div>
        );
    }
}