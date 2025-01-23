import {ToDo, useGlobalTodos} from "../../globalStore/globalTodos.ts";

export default function ClearCompletedItems(): React.JSX.Element
{
  const {globalTodos, setGlobalTodos} = useGlobalTodos();

  /*
  * Функция удаления выполненных заданий
  */
  function fnClearCompleted(): void
  {
    const arrToDo: Array<ToDo> = new Array<ToDo>();
    globalTodos.forEach((item: ToDo) =>
    {
      if (!item.done)
      {
        arrToDo.push(item);
      }
    })
    setGlobalTodos(arrToDo);
  }

  return (
    <div className={"opacity-[0.5] text-[15px] hover:cursor-pointer hover:text-black hover:opacity-[0.9]"}
         title={"Clear completed items?"}
         onClick={fnClearCompleted}>
      Clear completed
    </div>
  )
}