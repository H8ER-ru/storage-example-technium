import { useState, useEffect } from 'react';

function IndexedDB() {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [storedItems, setStoredItems] = useState([]);
  const [status, setStatus] = useState('');

  const DB_NAME = 'exampleDatabase';
  const STORE_NAME = 'exampleStore';
  const DB_VERSION = 1;

  // Initialize the database on component mount
  useEffect(() => {
    initDB();
  }, []);

  // Initialize the IndexedDB database
  const initDB = () => {
    setStatus('Открытие базы данных...');

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      setStatus(`Ошибка базы данных: ${event.target.error}`);
    };

    request.onupgradeneeded = (event) => {
      setStatus('Создание хранилища объектов...');
      const db = event.target.result;

      // Create an object store if it doesn't exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      setStatus('База данных успешно открыта');
      refreshStoredItems();
    };
  };

  // Add or update an item in the database
  const handleSave = () => {
    if (key.trim() && value.trim()) {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (event) => {
        setStatus(`Ошибка открытия базы данных: ${event.target.error}`);
      };

      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        // Create an item object
        const item = {
          id: key,
          value: value,
          timestamp: new Date().getTime()
        };

        const addRequest = store.put(item);

        addRequest.onerror = (event) => {
          setStatus(`Ошибка добавления элемента: ${event.target.error}`);
        };

        addRequest.onsuccess = (event) => {
          setStatus('Элемент успешно добавлен');
          setKey('');
          setValue('');
          refreshStoredItems();
        };
      };
    }
  };

  // Remove an item from the database
  const handleRemove = (keyToRemove) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      setStatus(`Ошибка открытия базы данных: ${event.target.error}`);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      const deleteRequest = store.delete(keyToRemove);

      deleteRequest.onerror = (event) => {
        setStatus(`Ошибка удаления элемента: ${event.target.error}`);
      };

      deleteRequest.onsuccess = (event) => {
        setStatus('Элемент успешно удален');
        refreshStoredItems();
      };
    };
  };

  // Clear all items from the database
  const handleClearAll = () => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      setStatus(`Ошибка открытия базы данных: ${event.target.error}`);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      const clearRequest = store.clear();

      clearRequest.onerror = (event) => {
        setStatus(`Ошибка очистки хранилища: ${event.target.error}`);
      };

      clearRequest.onsuccess = (event) => {
        setStatus('Все элементы успешно очищены');
        refreshStoredItems();
      };
    };
  };

  // Refresh the list of stored items
  const refreshStoredItems = () => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      setStatus(`Ошибка открытия базы данных: ${event.target.error}`);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);

      const getAllRequest = store.getAll();

      getAllRequest.onerror = (event) => {
        setStatus(`Ошибка получения элементов: ${event.target.error}`);
      };

      getAllRequest.onsuccess = (event) => {
        setStoredItems(event.target.result);
      };
    };
  };

  return (
    <div className="storage-container">
      <h2>Пример IndexedDB</h2>

      <div className="storage-info">
        <p>
          IndexedDB - это низкоуровневый API для клиентского хранения значительных объемов структурированных данных.
          В отличие от localStorage и sessionStorage, он позволяет хранить гораздо большие объемы данных и 
          предоставляет расширенные возможности запросов.
        </p>
        <p>
          IndexedDB асинхронный, что означает, что он не блокирует основной поток при выполнении операций.
          Он идеально подходит для веб-приложений, которым необходимо хранить большие объемы данных или сложные структуры данных.
        </p>
      </div>

      <div className="status-message">
        <p>Статус: {status}</p>
      </div>

      <div className="storage-form">
        <div className="form-group">
          <label htmlFor="indexedDBKey">Ключ (ID):</label>
          <input
            id="indexedDBKey"
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Введите ключ"
          />
        </div>

        <div className="form-group">
          <label htmlFor="indexedDBValue">Значение:</label>
          <input
            id="indexedDBValue"
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
        {storedItems.length === 0 ? (
          <p>Нет элементов в IndexedDB</p>
        ) : (
          <ul>
            {storedItems.map((item) => (
              <li key={item.id}>
                <strong>{item.id}:</strong> {item.value}
                <span className="timestamp"> (Добавлено: {new Date(item.timestamp).toLocaleString()})</span>
                <button 
                  className="remove-btn" 
                  onClick={() => handleRemove(item.id)}
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

export default IndexedDB;
