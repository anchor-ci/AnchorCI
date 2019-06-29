import React from 'react';
import  { Terminal } from 'xterm';
import Button from 'antd/lib/button';
import "../../node_modules/xterm/dist/xterm.css";

const style = {
    height: '100%',
    width: '100%'
}

export default class XTerminal extends React.Component {
    componentDidMount() {
        let term = new Terminal();
        term.open(document.getElementById('terminal'));
    }

    render() {
        return (
            <div style={style}>
                <div id="terminal" style={style}>
                </div>
            </div>
        )
    }
}