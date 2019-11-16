import React from 'react';
import ReactDOM from 'react-dom';

const root = document.getElementById('root')
const modalRoot = document.getElementById('modal-root')

class Modal extends React.Component {
    state = { param: '', feedback: '' }
    componentDidMount() {
        if (this.props.param) {
            this.setState({ param: this.props.param })
        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitFeedback = async () => {
        alert(this.state.feedback)
        let data = this.state.feedback
        await fetch('http://localhost:5000/api/sys/feedback', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer <valid-token>'
            },
            body: JSON.stringify(data)
        }).then((res) => res.json())
        .then((data) => resolve(data))
        .then((err) => reject(err))
    }
    render() {
        return ReactDOM.createPortal(
            <div
                style={{
                    position: 'absolute',
                    top: '0',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    display: 'grid',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                }}
            >
                <div
                    style={{
                        padding: 20,
                        background: '#fff',
                        borderRadius: '2px',
                        display: 'inline-block',
                        minHeight: '300px',
                        margin: '1rem',
                        position: 'relative',
                        minWidth: '300px',
                        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
                        justifySelf: 'center',
                    }}
                >
                    <button style={{ backgroundColor: this.state.param === "Happy" ? 'lightblue' : null }} onClick={() => this.setState({ param: 'Happy' })}>Happy</button>
                    <button style={{ backgroundColor: this.state.param === "Idea" ? 'lightblue' : null }} onClick={() => this.setState({ param: 'Idea' })}>Idea</button>
                    <button style={{ backgroundColor: this.state.param === "Sad" ? 'lightblue' : null }} onClick={() => this.setState({ param: 'Sad' })}>Sad</button>
                    <hr />
                    <input type='text' placeholder="Enter your feedback here" onChange={this.handleChange} name="feedback" value={this.state.feedback} /><br />
                    <button onClick={() => this.submitFeedback()}>Submit Feedback</button>
                    <button onClick={this.props.onClose}>Close</button>
                </div>
            </div>,
            modalRoot,
        )
    }
}

class App extends React.Component {
    state = { showModal: false, param: '' }
    handleShowMessageClick = (param) => this.setState({ showModal: true, param })
    handleCloseModal = () => { this.setState({ showModal: false }) }
    render() {
        return (
            <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <div style={{ maxWidth: 400, position: 'relative', }}>
                    <h1>My App</h1>
                    {/* <p>This is an example of how you might use React.createPortal. I think it is a pretty neat API that is yet another awesome escape hatch that React provides for practical reasons. Sometimes you just need to render something completely outside the React Tree.</p> */}
                    <button onClick={() => this.handleShowMessageClick('Happy')}>Happy</button><button onClick={() => this.handleShowMessageClick('Idea')}>Idea</button><button onClick={() => this.handleShowMessageClick('Sad')}>Sad</button><br /><br />
                    {/* <button onClick={this.handleShowMessageClick}>Show Secret Modal</button> */}
                    {this.state.showModal ? (<Modal onClose={this.handleCloseModal} param={this.state.param} />) : null}
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, root);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
