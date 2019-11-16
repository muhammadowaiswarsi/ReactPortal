import React, { Component } from 'react'
import ReactDOM from 'react-dom';

const root = document.getElementById('root')
const modalRoot = document.getElementById('testing-portals')

class PortalsTesting extends Component {
    render() {
        return ReactDOM.createPortal(
            <button onClick={() => alert('hello world')}>Show Modal</button>,
            document.getElementById('testing-portals')
        )
    }
}
export default PortalsTesting