# React-UniModal
A unified modal component for React.JS

Create one modal and control it in any page/component

install
```
npm i --save react-unimodal
```

add `import 'react-unimodal/dist/style.css';` to your app.js file to use default styles

creating modal
```javascript
import { useUniModal } from 'react-unimodal'
// in any page/component, use useUniModal hook to create the component
// use like a normal component
function App() {
  const Modal = useUniModal({ id: 'modal id', header: <Header />, body: <Body />, footer: <Footer /> })

  return (
    <div className="App">
      <Modal />
    </div>
  )
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
        <button onClick={() => {updateModal({ id: 'modal id', body: modalBody })}}>update modal</button>
      </div>
    </div>
  )
}
```

params to pass

useUniModal
- object
  - id: optional, id of modal, default is used if not set
  - header: optional, header component of modal
  - body: body component of modal
  - footer: optional, footer component of modal

example

`useUniModal({ id: 'modal id', header, body, footer })` or `useUniModal({ header, body, footer })`

header, body, footer can be a react element or string

showModal
- call this function to display modal
- id: optional, default is used if not set

hideModal
- call this function to hide modal
- id: optional, id of modal, default is used if not set

updateModal
- pass a configuration to change header, body, or footer of a modal, same as `useUniModal`
- object
    - id: optional, id of modal, default is used if not set
    - header: optional, header component of modal
    - body: body component of modal
    - footer: optional, footer component of modal
