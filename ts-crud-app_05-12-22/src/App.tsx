import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import InputField from './components/InputField';
import { Data, MultiData } from './components/model';
import useMultiData from './components/useMultiData';
import ViewData from './components/ViewData';
import ViewMultiData from './components/ViewMultiData';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { addTodo, getPosts } from './redux/slices/apiSlice';
import { AppDispatch } from './redux/store';

const App: React.FC = () => {

  const [name, setName] = useState<string>('');
  const [data, setData] = useState<Data[]>([]);
  const [listArray,setListArray] = useState<Data[]>([])
  const [array,setArray] = useState<MultiData[]>(useMultiData());
  // const dispatch = useAppDispatch();
  const dispatch = useDispatch<AppDispatch>()
  let list = useAppSelector((state)=>state.apiSlice.list);

  let apiList = useAppSelector((state)=> state.apiSlice.data)
  useEffect(()=>{
    dispatch(getPosts())
  },[])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (name) {
      setData([...data, { id: Date.now(), name: name }]);
      dispatch(addTodo({ id: Date.now(), name: name }))
      setListArray(list);
    }
    setName('');
  }

  const handleDelete = (item:Data) =>{
    setData(data.filter((d)=>d.id != item.id));
    setListArray(listArray.filter((d)=>d.id != item.id))
  }

  return (
    <div className="App">
      <InputField name={name} setName={setName} handleAdd={handleAdd} />
      {data?.length > 0 && <ViewData data={listArray} handleDelete={handleDelete}/>}
      <ViewMultiData array={array}/>
    </div>
  );
}

export default App;
