import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

export type ToDo = {
  id: number,
  text: string,
  done: boolean
}

type GlobalToDo =
{
  globalTodos: Array<ToDo>;
  setGlobalTodos: (listToDo: Array<ToDo>) => void;
}

export const useGlobalTodos = create<GlobalToDo>()(
    persist(
        (set) => ({
          globalTodos: new Array<ToDo>(),
          setGlobalTodos: (listToDo: Array<ToDo>) => set({ globalTodos: listToDo }),
        }),
        {
            name: 'Todos',
            storage: createJSONStorage(() => localStorage),
        },
    ),
)