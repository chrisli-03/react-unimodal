# React-UniModal
A unified modal component for React.JS

Create one modal and control it in any page/component

install
```
npm i --save react-unimodal
```

creating modal
```javascript
import { useUniModal } from 'react-unimodal'
// in any page/component, use useUniModal hook to create the component
// use like a normal component
function App() {
  const Modal = useUniModal('modal id', { header: () => <div>component header</div>})

  return (
  <div className="App">
    <Modal />
  </div>
  );
}
```
using modal
```javascript
// use these commands to control the modal
import { showModal, hideModal, updateModal } from 'react-unimodal'

const modalBody = () => {
  return (
    <div>modal body</div>
  )
}

const Component = () => {
  return (
    <div>
      <div>
        <button onClick={() => showModal('modal id')}>show modal</button>
        <button onClick={() => hideModal('modal id')}>hide modal</button>
        <button onClick={() => {updateModal('modal id', { body: modalBody })}}>update modal</button>
      </div>
    </div>
  );
}
```

params to pass

useUniModal
- passing 2 params
  - first param is id of modal
  - second param is configuration
- passing 1 param
  - first param is configuration
  - id will be default id

example

`useUniModal('modal id', { header, body, footer })` or `useUniModal({ header, body, footer })`

header, body, footer can be a component(function) or string

showModal
- call this function to display modal

hideModal
- call this function to hide modal

updateModal
- pass a configuration to change header, body, or footer of a modal, same as `useUniModal`
