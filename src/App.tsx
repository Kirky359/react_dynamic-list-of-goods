import React, { useEffect, useState } from 'react';
import './App.scss';
import { GoodsList } from './GoodsList';
import { getAll, get5First, getRedGoods } from './api/goods';
import { Good } from './types/Good';

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([]);
  const [filter, setFilter] = useState<'all' | 'first5' | 'red' | null>(null);

  useEffect(() => {
    if (filter === 'all') {
      getAll().then(setGoods);
    }

    if (filter === 'first5') {
      get5First().then(setGoods);
    }

    if (filter === 'red') {
      getRedGoods().then(setGoods);
    }
  }, [filter]);

  return (
    <div className="App">
      <h1>Dynamic list of Goods</h1>

      <button
        type="button"
        data-cy="all-button"
        onClick={() => setFilter('all')}
      >
        Load all goods
      </button>

      <button
        type="button"
        data-cy="first-five-button"
        onClick={() => setFilter('first5')}
      >
        Load 5 first goods
      </button>

      <button
        type="button"
        data-cy="red-button"
        onClick={() => setFilter('red')}
      >
        Load red goods
      </button>

      {filter && <GoodsList goods={goods} />}
    </div>
  );
};
