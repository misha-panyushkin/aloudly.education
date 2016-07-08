import './App.less'
import React from 'react'

export default function App ({ children }) {
    return (
        <section
            className={'App cPaper unselectable'}>
            { children }
        </section>
    );
}