import { v4 as uuidv4 } from 'uuid';
import { Input } from 'antd';
import { useState, useEffect } from 'react';

function Tag({ tagLabel, isActive, addingTag, deletingTag, id }) {
  const [label, setLabel] = useState('' || tagLabel);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [label]);

  const addTag = () => {
    if (!label) {
      setError(() => true);
      return;
    }
    addingTag(label, uuidv4());
    setLabel(() => null);
  };

  const addButton = isActive ? (
    <button
      className="tag__button tag__button--add"
      type="button"
      onClick={() => addTag()}
    >
      Add tag
    </button>
  ) : null;

  const errorStyle = error ? 'red' : null;
  const errorMessage = error ? (
    <div style={{ color: 'red' }}>Tag is required!</div>
  ) : null;

  return (
    <>
      <div className="tag__wrapper">
        <Input
          placeholder="Enter the tag"
          value={label}
          style={{ height: '40px', width: '300px', borderColor: errorStyle }}
          onChange={(e) => setLabel(e.target.value)}
          disabled={!isActive}
          onPressEnter={(e) => addTag(e)}
        />
        <button
          type="button"
          className="tag__button"
          // Я не понял, для чего нужна кнопка удаления тега на импуте, через который ведется добавление,
          // поэтому решил сделать логику, что на "Главном импуте она чистит введенный текст", добавленные
          // теги удаляет
          onClick={() => (isActive ? setLabel('') : deletingTag(id))}
        >
          Delete
        </button>
        {addButton}
      </div>
      {errorMessage}
    </>
  );
}

export default Tag;
