/* eslint-disable jsx-a11y/label-has-associated-control */
import { Input, Button } from 'antd';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux/es/exports';
import { useHistory } from 'react-router';

import RealWorldService from '../../../services/RealWorldService';
import Error from '../../error/Error';

import Tag from './Tag';

import './createArticlePage.scss';

function CreateArticlePage() {
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(false);

  const token = useSelector((state) => state.appSlice.token);

  const history = useHistory();

  const {
    formState: { isValid },
    handleSubmit,
    control,
  } = useForm({
    mode: 'onBlur',
  });

  const addingTag = (label, id) => {
    setTags(() => [...tags, { label, id }]);
  };

  const deletingTag = (id) => {
    setTags(() => tags.filter((tag) => id !== tag.id));
  };

  const realWorldService = new RealWorldService();

  const tagsList = tags.map((tag) => (
    <Tag
      key={tag.id}
      id={tag.id}
      tagLabel={tag.label}
      deletingTag={deletingTag}
      tagStatus="false"
    />
  ));

  // Настраиваю норм передачу данных и запрос. Отправляю запрос и радуюсь
  // из формы все идет нормально. Осталось добавить поле tagList  с массивом артиклов

  const onSubmit = (data) => {
    if (isValid) {
      const newData = {
        article: { ...data, tagList: tags.map((tag) => tag.label) },
      };
      realWorldService
        .createArticle(newData, token)
        .then(() => history.push('/articles'))
        .catch(() => setError(() => true));
    }
  };

  const isError = error ? <Error /> : null;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="article-form">
      {isError}
      <header className="article-form__header">
        <h2 className="article-form__title">Create new article</h2>
      </header>
      <label className="article-form__label">
        <span className="article-form__input-description">Title</span>
        <Controller
          render={({ field, fieldState: { error } }) => {
            const inputStyle = error ? { border: '1px solid red' } : null;
            return (
              <>
                <Input
                  {...field}
                  placeholder="Title"
                  style={inputStyle}
                  autoComplete="on"
                />
                {error && <div style={{ color: 'red' }}>{error.message}</div>}
              </>
            );
          }}
          name="title"
          control={control}
          rules={{
            required: 'Title is required!',
            minLength: {
              value: 3,
              message: 'Title must consist of at least 3 characters',
            },
            maxLength: {
              value: 60,
              message: 'Title must not exceed 60 characters',
            },
          }}
        />
      </label>
      <label className="article-form__label">
        <span className="article-form__input-description">
          Short description
        </span>
        <Controller
          render={({ field, fieldState: { error } }) => {
            const inputStyle = error ? { border: '1px solid red' } : null;
            return (
              <>
                <Input
                  {...field}
                  placeholder="Description"
                  style={inputStyle}
                  autoComplete="on"
                />
                {error && <div style={{ color: 'red' }}>{error.message}</div>}
              </>
            );
          }}
          name="description"
          control={control}
          rules={{
            required: 'Description is required!',
          }}
        />
      </label>
      <label className="article-form__label">
        <span className="article-form__input-description">Text</span>
        <Controller
          render={({ field, fieldState: { error } }) => {
            const inputStyle = error ? { border: '1px solid red' } : null;
            return (
              <>
                <Input.TextArea
                  {...field}
                  placeholder="Text"
                  style={{ ...inputStyle, height: '168px' }}
                  autoComplete="on"
                />
                {error && <div style={{ color: 'red' }}>{error.message}</div>}
              </>
            );
          }}
          name="body"
          control={control}
          rules={{
            required: 'Text is required!',
          }}
        />
      </label>
      <label className="article-form__label article-form__label--tags">
        {tagsList}
        <Tag addingTag={addingTag} isActive />
      </label>
      <Button
        type="primary"
        htmlType="submit"
        style={{ width: '320px', height: '40px', alignSelf: 'flex-start' }}
      >
        Send
      </Button>
    </form>
  );
}

export default CreateArticlePage;
