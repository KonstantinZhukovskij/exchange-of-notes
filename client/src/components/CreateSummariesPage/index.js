import React from 'react';
import ImageUploader from '../ImageUploader';
import toastr from '../../services/toastr';
import TextEditor from '../TextEditor'
import {createSummary} from '../../services/axios';

export default class CreateSummariesPage extends React.Component {
    state = {
        title: '',
        description: '',
        text: '',
        rawText: '',
        imageSrc: 'https://i.ibb.co/kGS6hrm/no-image-available.jpg',
        likes: [0]
    };

    onChangeTitle = (event) => {
        this.setState({
            title: event.target.value
        })
    };

    onChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    };

    onClickCreateSummary = (event) => {
        event.preventDefault();
        const rawContent = this.refs.textEditorRef.getContent();
        const dataToSend = {
            title: this.state.title,
            description: this.state.description,
            text: rawContent,
            rawText: this.refs.textEditorRef.getRawText(),
            imageSrc: this.state.imageSrc,
            likes: this.state.likes
        };
        createSummary(dataToSend)
            .then((res) => {
                this.setState({
                    title: '',
                    description: '',
                    text: '',
                    rawText: ''
                });
                toastr.success(`Конспект ${res.data.title} успешно создан`, "Успех!");
                setTimeout(() => window.location = "/", 1000);
            })
            .catch((error) => {
                toastr.warning('Проверьте все ли поля заполнены', 'Внимание!')
            });
    };
    setImageSrcToState = (imageSrc) => {
        this.setState({
            imageSrc: imageSrc
        });
        toastr.success('Ваша картинка успешно загружена')
    };

    render() {
        return (
            <div>
                <form>
                    <div className="sign">
                        <div className="container">
                            <h1>Создать конспект</h1>
                            <label><b>Название темы</b></label>
                            <input type="text"
                                   maxLength="50"
                                   onChange={this.onChangeTitle}
                                   value={this.state.title}
                                   placeholder="Введите название темы"
                                   required/>
                            <label><b>Предмет</b></label>
                            <input type="text"
                                   maxLength="100"
                                   onChange={this.onChangeDescription}
                                   value={this.state.description}
                                   placeholder="Название предмета"
                                   required/>
                            <label><b>Материал</b></label>
                            <TextEditor ref={'textEditorRef'}/>
                        </div>
                    </div>
                    <p id="imageInput">Нажмите на стрелку или перетащите на неё картинку, для заголовка</p>
                    <ImageUploader setImageSrcToState={this.setImageSrcToState}/>
                    <button id="downloadSummary" className="fas fa-upload"
                            onClick={this.onClickCreateSummary}>Создать конспект
                    </button>
                </form>
            </div>
        );
    }
}