import React from 'react';
import ImageUploader from '../ImageUploader';
import toastr from '../../services/toastr';
import TextEditor from '../TextEditor'
import {createSummary} from '../../services/axios';

export default class CreateSummariesPage extends React.Component {
    state = {
        title: '',
        description: '',
        text: ''
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

    onChangeText = (event) => {
        this.setState({
            text: event.target.value
        })
    };

    onClickCreateSummary = (event) => {
        event.preventDefault();
        const rawContent = this.refs.textEditorRef.getRawContent();
        const dataToSend = {
            title: this.state.title,
            description: this.state.description,
            text: rawContent
        };
        createSummary(dataToSend)
            .then((res) => {
                this.setState({
                    title: '',
                    description: '',
                    text: '',
                });
                toastr.success(`Конспект ${res.data.title} успешно создан`, "Поздравляем!");
            })
            .catch((error) => {
                toastr.warning('Проверьте все ли поля заполнены', 'Внимание!')
            });
    };

    render() {
        return (
            <div>
                <form>
                    <div className="sign">
                        <div className="container">
                            <h1>Создать конспект</h1>
                            <label><b>Название предмета</b></label>
                            <input type="text"
                                   maxLength="50"
                                   onChange={this.onChangeTitle}
                                   value={this.state.title}
                                   placeholder="Введите название предмета"
                                   required/>
                            <label><b>Тема</b></label>
                            <input type="text"
                                   maxLength="100"
                                   onChange={this.onChangeDescription}
                                   value={this.state.description}
                                   placeholder="Кратко расскажите о теме Вашего конспекта"
                                   required/>
                            <label><b>Материал</b></label>
                            <TextEditor ref={'textEditorRef'}/>
                        </div>
                    </div>
                    <p id="imageInput">Нажмите на стрелку или перетащите на неё картинку, для заголовка</p>
                    <ImageUploader/>
                    <button onClick={this.onClickCreateSummary}>Загрузить</button>
                </form>
            </div>
        );
    }
}