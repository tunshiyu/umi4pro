
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodosComp from './components/Todos';
import styles from './index.less';
import './index.less';
import { Spin } from 'antd';

const Todos: React.FC = () => {
  //TODO: Data区域
  const [todos, setTodos] = useState<{ id: number, text: string, isCompleted: boolean }[]>([]);
  const [loading, setloading] = useState<boolean>(false);

  ///TODO: Mounted
  useEffect(() => {
    setloading(true)
    new Promise(res => setTimeout(() => {
      res([
        {
          id: 1,
          text: "Write a new blog post.",
          isCompleted: false
        },
        {
          id: 2,
          text: "Pick up laundry.",
          isCompleted: false
        },
        {
          id: 3,
          text: "Die.",
          isCompleted: false
        }
      ])

    }, 1000)).then(res => {
      setTodos(res || [] as any)
    }).finally(() => setloading(false))


    return () => {
      setTodos([])
    }
  }, [setTodos])

  const addTodo = (todo: string) => {
    setTodos([...todos, { text: todo }] as any);
  };

  const delTodo = () => {
    const newTodos = [...todos];
    setTodos(newTodos.filter(todo => !todo.isCompleted))
  }

  const markComplete = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const editTitle = (index: number, title: string) => {
    const newTodos = [...todos];
    newTodos[index].text = title;
    setTodos(newTodos);
  };

  ///TODO: template区域
  return (
    <PageContainer ghost>
      <div className="parent-container">
        <div className="container top-container">
          <div className="app">
            <div className="todoform">
              <TodoForm addTodo={addTodo} del={delTodo} />
              <Spin spinning={loading}>
                <TodosComp todos={todos} markComplete={markComplete} editTitle={editTitle} />
              </Spin>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Todos;
