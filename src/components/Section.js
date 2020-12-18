import React, { Component } from 'react'
import {Route} from "react-router-dom"
import Cart from './section/Cart'


export class Section extends Component {
    render() {
        return (
            <>
                    <Route path="/" component={Cart}  exact/>
            </>
        )
    }
}

export default Section
