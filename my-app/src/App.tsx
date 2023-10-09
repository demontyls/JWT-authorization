import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from "@tanstack/react-query";

function App() {
  const [data, setData] = useState<any>([]);
  const [reload, setReload] = useState<any>(true);
  const [inputValue, seInputValue] = useState<any>({
    id: 0,
    login: '',
    password: '',
  });

  const saveDataInTable = () => {
    fetch('/send_users', {
      method: "POST", // или 'PUT'
      body: JSON.stringify(inputValue), // данные могут быть 'строкой' или {объектом}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .catch(error => console.log(error))
      .then((response => setReload(true)))
      .then( (res) => {
        seInputValue({...inputValue, login: '', password: ''});
      });
  }

  const sendUser = (data:any) => {
      return fetch('/send_users', data);
  }

  const getLastId = (data: any[]) :number => {
    let lastId =  0;
    if (Boolean(data.length)) {
      lastId = data.sort((a:any ,b: any) => b.id - a.id).at(0).id + 1;
    }

    return lastId;
  }

  const getUser = () => {
    const name = inputValue.login;
    fetch(`/get_user/${JSON.stringify(name)}`)
      .then((response => response.json()))
      .then((resp) => {
        // setReload(true);
        setData(resp.data);
        console.log(resp);
      })
      .catch(error => console.log(error))
  }

  const deleteUsers = () => {
    fetch('/delete', {
      method: "POST", // или 'PUT'
      body: JSON.stringify({delete: true}), // данные могут быть 'строкой' или {объектом}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .catch(error => console.log(error))
      .then((response) => {
        setReload(true)
      })
  }

  useEffect(()=> {
    if (reload) {
      fetch('/get_data')
        .then((response => response.json()))
        .then( (res) => {
          console.log(res)
          setData(res?.data);
          seInputValue({...inputValue, id: getLastId([...res.data])});
          console.log('222')
          setReload(false);
        })
        .catch(error => console.log(error))
    }
  }, [reload]);

  const getFromQuery = () => {
    return  fetch('/get_data').then(res => res.json())
  }
  const test   = useQuery(['test'], getFromQuery )
  const mutation = useMutation(user => sendUser(user));

  useEffect(()=>{
    console.log(test,'aa')
  }, [])


  return (
    <>
      <button onClick={()=> getUser()} >Получить пользователя</button>
      <div className="col-4 m-auto p-3">
        <h3 className="text-center">Добавить пользователя</h3>
        <div className="d-flex flex-column">
          <input className="form-control mb-3" type="text" value={inputValue.login} onChange={(e) => seInputValue({...inputValue, login: e.target.value})}/>
          <input className="form-control mb-3" type="text" value={inputValue.password} onChange={(e) => seInputValue({...inputValue, password: e.target.value})}/>
        </div>
        <button className="btn btn-primary me-3" onClick={()=> saveDataInTable()}>Отправить</button>
        <button className="btn btn-danger" onClick={()=> deleteUsers()}>Очистить таблицу</button>
      </div>
        <button className="btn btn-primary me-3" onClick={()=> mutation.mutate(inputValue)}>qquary</button>

      <div className="px-3">
        {data?.map((elem: any, i:number) => {
          return (
            <div key={i} className="d-flex flex-row m-auto card mb-3 px-3">
              <div className="me-3">
                id: {elem.id}
              </div>
              <div className="me-3">
                логин: {elem.login}:
              </div>
              <div className="me-3">
                пароль: {elem.password ? elem.password :'не указан'}:
              </div>
              <div className="me-3">
                почта: {elem?.email}
              </div>
              <div className="me-3">
                info: {elem.last}
              </div>
            </div>
          )
        })}
      </div>
    </>
  );
}

export default App;
