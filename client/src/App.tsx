import logo from './logo.svg';
import './App.css';
import { useRegisterMutation } from './generated/graphql';
import { useCallback, useEffect } from 'react';

function App() {
  const [register] = useRegisterMutation();

  const response = useCallback(
    async () =>
      await register({
        variables: {
          registerInputs: {
            userName: 'fromReact6',
            email: 'fromReact@fromReact6',
            password: 'fromReact6',
            fullName: 'fromReact6'
          }
        }
      }),
    [register]
  );

  useEffect(() => {
    response().then(({ data }) => {
      if (data?.register.errors) {
        console.log({
          registred: false,
          error: {
            field: data?.register.errors[0].field,
            message: data?.register.errors[0].message
          }
        });
      } else if (data?.register.user) {
        console.log({ registred: true, user: data.register.user });
      }
    });
  }, [response]);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
