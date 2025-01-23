import {useState} from 'react';
import './App.css';
import {ToDo, useGlobalTodos} from "./globalStore/globalTodos.ts";
import TodoItem from "./components/TodoItem/TodoItem.tsx";
import ClearCompletedItems from "./components/TodoItem/ClearCompletedItems.tsx";

export default function ToDoList(): React.JSX.Element
{
  const {globalTodos, setGlobalTodos} = useGlobalTodos();
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [textTodo, setTextTodo] = useState<string>("");
  /*
   * 1 - All;
   * 2 - Active;
   * 3 - Completed;
   */
  const [menu, setMenu] = useState<number>(1);

  /*
   * Функция для отображения списка заданий
   */
  function fnShowDetails(): void
  {
    setShowDetails(!showDetails);
  }

  /*
   * Функция обработки ввода текста
   */
  function fnChangeTextTodo(event: React.ChangeEvent<HTMLInputElement>): void
  {
    event.preventDefault();
    setTextTodo(event.currentTarget.value);
  }

  /*
   * Функция добавления введенного текста
   */
  function fnAddTodo(event: React.MouseEvent<HTMLDivElement>): void
  {
    event.preventDefault();
    if (textTodo.length === 0)
    {
      return;
    }
    const toDo: ToDo = {
      id: globalTodos.length,
      text: textTodo,
      done: false
    }
    globalTodos.push(toDo);
    setGlobalTodos(globalTodos);
    setTextTodo("");
  }

  /*
   * Функция сортировки заданий
   */
  function fnSortBy(event: React.MouseEvent<HTMLInputElement>): void
  {
    switch (event.currentTarget.value)
    {
      case "All":
        setMenu(1);
        break;

      case "Active":
        setMenu(2);
        break;

      case "Completed":
        setMenu(3);
        break;

      default:
        break;
    }
  }

  // Создаём новый массив, по которому в разметке считаем кол-во оставшихся заданий
  const arrToDo: Array<ToDo> = new Array<ToDo>();
  // Создаём новый массив, по которому в разметке считаем кол-во выполненных заданий
  const arrToDoDone: Array<ToDo> = new Array<ToDo>();
  if (globalTodos.length !== 0)
  {
    globalTodos.forEach((item: ToDo) =>
    {
      if (!item.done)
      {
        // Пушим невыполненные todo в новый массив
        arrToDo.push(item);
      }
      else
      {
        arrToDoDone.push(item);
      }
    })
  }

  return (
    <div className={"flex flex-col items-center"}>
      <h1 data-testid="todos" className={"text-3xl font-bold mb-[15px]"} title="todos">todos</h1>
      <div className={"border-2  shadow-md mb-[15px]"}>
        <input className={"p-[10px] outline-[0px]"} type="text" onChange={fnChangeTextTodo} value={textTodo}
               data-testid={"todo-input"}
               placeholder={"Print text here..."}/>
        <input className={"p-[10px] bg-blue-600 text-white hover:cursor-pointer hover:bg-blue-700"} onClick={fnAddTodo}
               data-testid={"add-todo-input"}
               type={"button"}
               value={"Add Todo"}/>
      </div>
      <div className={"w-[500px] border-2 rounded-[10px] shadow-md"}>
        <div className={"flex flex-row p-[15px] border-b-2 hover:cursor-pointer hover:text-blue-600"}
             onClick={fnShowDetails}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 19 36"
            fill="none"
            className={"mt-[5px] mr-[10px]"}
            style={showDetails ? {transform: "rotate(90deg)", transition: "0.2s"} : {
              transform: "rotate(0deg)",
              transition: "0.2s"
            }}
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 2L16.8146 16.8146C17.1966 17.1966 17.2077 17.8111 16.8379 18.2048C14.5878 20.6 7.09277 28.5787 2 34"
              stroke="#131313" strokeWidth="3" strokeLinecap="round"/>
          </svg>
          <p>
            What needs to be done?
          </p>
        </div>
        {
          showDetails &&
            <div data-testid={"todo-list"}>
              {
                globalTodos.length !== 0 ?
                  <>
                    {
                      globalTodos.map((item: ToDo, index: number) =>
                      {
                        if (menu === 1)
                        {
                          return <TodoItem key={index} props={{item: item}}/>
                        }
                        if (menu === 2 && !item.done)
                        {
                          return <TodoItem key={index} props={{item: item}}/>
                        }
                        if (menu === 3 && item.done)
                        {
                          return <TodoItem key={index} props={{item: item}}/>
                        }
                      })
                    }
                  </>
                  :
                  <div>List empty</div>
              }
            </div>
        }
        <div className={"flex flex-row justify-between"}>
          <div className={"p-[15px] opacity-[0.5] text-[15px]"}>
            {
              arrToDo.length !== 0 && <>{arrToDo.length} item(s) left</>
            }
          </div>
          <div className={"flex flex-row"}>
            <input className={"p-[15px]"} type="button"
                   style={menu === 1 ? {color: "#2563eb", cursor: "default"} : {cursor: "pointer"}} onClick={fnSortBy}
                   value="All"/>
            <input className={"p-[15px]"} type="button"
                   style={menu === 2 ? {color: "#2563eb", cursor: "default"} : {cursor: "pointer"}} onClick={fnSortBy}
                   value="Active"/>
            <input className={"p-[15px]"} type="button"
                   style={menu === 3 ? {color: "#2563eb", cursor: "default"} : {cursor: "pointer"}} onClick={fnSortBy}
                   value="Completed"/>
          </div>
          <div className={"p-[15px]"}>
            {globalTodos.length !== 0 && <>{arrToDoDone.length !== 0 && <ClearCompletedItems/>}</>}
          </div>
        </div>
      </div>
    </div>
  )
}