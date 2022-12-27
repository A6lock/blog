/* eslint-disable jsx-a11y/label-has-associated-control */
import { Input, Button, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux/es/exports';
import { useHistory, useLocation, useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

import RealWorldService from '../../../services/RealWorldService';
import Error from '../../error/Error';

import Tag from './Tag';

import './createArticlePage.scss';

function CreateArticlePage() {
  // Стейт
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.appSlice.token);

  const realWorldService = new RealWorldService();

  const history = useHistory();

  const {
    formState: { isValid },
    handleSubmit,
    control,
    setValue,
  } = useForm({
    mode: 'onBlur',
  });

  // Определяю находится ли article на редактировании
  const isEdit = /edit/i.test(useLocation().pathname);

  const { slug } = useParams();

  // Если article на редактировании, получаю данные для установки value в RHF
  useEffect(() => {
    if (isEdit) {
      setLoading(() => true);

      realWorldService
        .getArticle(slug)
        .then(({ article }) => {
          setValue('title', article.title);
          setValue('description', article.description);
          setValue('body', article.body);
          setTags(() =>
            article.tagList.map((tag) => {
              const id = uuidv4();
              return {
                label: tag,
                id,
              };
            })
          );
        })
        .catch(() => setError(() => true))
        .finally(() => setLoading(() => false));
    } else {
      setTags(() => []);

      setValue('title', null);
      setValue('description', null);
      setValue('body', null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit]);

  // Добавление тега
  const addingTag = (label, id) => {
    setTags(() => [...tags, { label, id }]);
  };

  // Удаление тега
  const deletingTag = (id) => {
    setTags(() => tags.filter((tag) => id !== tag.id));
  };

  const tagsList = tags.map((tag) => {
    return (
      <Tag
        key={tag.id}
        id={tag.id}
        tagLabel={tag.label}
        deletingTag={deletingTag}
        tagStatus="false"
      />
    );
  });

  const onSubmit = (data) => {
    if (isValid) {
      const newData = {
        article: { ...data, tagList: tags.map((tag) => tag.label) },
      };
      const typeOfRequest = isEdit
        ? realWorldService.updateArticle(slug, newData, token)
        : realWorldService.createArticle(newData, token);

      typeOfRequest
        .then(() => history.push('/articles'))
        .catch(() => setError(() => true));
    }
  };

  const isLoading = loading ? <Spin /> : null;

  const isError = error ? <Error /> : null;

  const form = (
    <form onSubmit={handleSubmit(onSubmit)} className="article-form">
      {isError}
      <header className="article-form__header">
        <h2 className="article-form__title">
          {isEdit ? 'Edit article' : 'Create new article'}
        </h2>
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
            required: isEdit ? null : 'Title is required!',
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
            required: isEdit ? null : 'Description is required!',
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
            required: isEdit ? null : 'Title is required!',
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

  const content = loading ? isLoading : form;

  return (
    <>
      {error}
      {content}
    </>
  );
}

export default CreateArticlePage;
