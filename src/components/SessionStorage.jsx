import { useState, useEffect } from 'react';

function SessionStorage() {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [storedItems, setStoredItems] = useState({});

  // Load all sessionStorage items on component mount
  useEffect(() => {
    refreshStoredItems();
  }, []);

  // Refresh the list of stored items
  const refreshStoredItems = () => {
    const items = {};
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      items[key] = sessionStorage.getItem(key);
    }
    setStoredItems(items);
  };

  // Add or update an item
  const handleSave = () => {
    if (key.trim() && value.trim()) {
      sessionStorage.setItem(key, value);
      refreshStoredItems();
      setKey('');
      setValue('');
    }
  };

  // Remove an item
  const handleRemove = (keyToRemove) => {
    sessionStorage.removeItem(keyToRemove);
    refreshStoredItems();
  };

  // Clear all items
  const handleClearAll = () => {
    sessionStorage.clear();
    refreshStoredItems();
  };

  return (
    <div className="storage-container">
      <h2>Пример Сессионного Хранилища</h2>

      <div className="storage-info">
        <p>
          Сессионное хранилище предоставляет способ хранения пар ключ/значение в браузере. 
          Данные доступны только на протяжении сессии страницы 
          (они удаляются при закрытии вкладки браузера).
        </p>
        <p>
          В отличие от куки, данные сессионного хранилища никогда не отправляются на сервер 
          и имеют больший объем хранения (обычно 5-10МБ).
        </p>
      </div>

      <div className="storage-form">
        <div className="form-group">
          <label htmlFor="sessionKey">Ключ:</label>
          <input
            id="sessionKey"
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Введите ключ"
          />
        </div>

        <div className="form-group">
          <label htmlFor="sessionValue">Значение:</label>
          <input
            id="sessionValue"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Введите значение"
          />
        </div>

        <button onClick={handleSave}>Сохранить</button>
        <button onClick={handleClearAll}>Очистить всё</button>
      </div>

      <div className="storage-items">
        <h3>Сохраненные элементы:</h3>
        {Object.keys(storedItems).length === 0 ? (
          <p>Нет элементов в сессионном хранилище</p>
        ) : (
          <ul>
            {Object.entries(storedItems).map(([itemKey, itemValue]) => (
              <li key={itemKey}>
                <strong>{itemKey}:</strong> {itemValue}
                <button 
                  className="remove-btn" 
                  onClick={() => handleRemove(itemKey)}
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SessionStorage;
