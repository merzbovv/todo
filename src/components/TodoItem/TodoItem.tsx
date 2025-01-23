import {ToDo, useGlobalTodos} from "../../globalStore/globalTodos.ts";

type ToDoProps = {
  props: {
    item: ToDo
  }
}

export default function TodoItem(props: ToDoProps): React.JSX.Element
{
  const {globalTodos, setGlobalTodos} = useGlobalTodos();

  /*
   * Функция смены статуса задания
   */
  function fnDone(event: React.MouseEvent<HTMLDivElement>): void
  {
    globalTodos.forEach((item: ToDo) =>
    {
      if (item.id === Number(event.currentTarget.id))
      {
        item.done = true;
      }
    })
    setGlobalTodos(globalTodos);
  }

  return (
    <div className={"flex items-center justify-between p-[15px] border-b hover:bg-blue-600 hover:text-white"}
         style={props.props.item.done ? {} : {cursor: "pointer"}}
         id={String(props.props.item.id)}
         title={props.props.item.done ? "Done" : "Click to complete a task"}
         onClick={props.props.item.done ? () => {} : fnDone}>
      <p style={props.props.item.done ? {textDecoration: "line-through", opacity: "0.3"} : {}}>
        {props.props.item.text}
      </p>
      {
        props.props.item.done &&
          <div title={"Done"}>
              <svg xmlns="http://www.w3.org/2000/svg"
                   width="15"
                   height="15"
                   viewBox="0 0 448 512">
                  <path
                      d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
              </svg>
          </div>
      }
    </div>
  )
}