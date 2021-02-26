import React, { Component } from 'react';
import { FacebookProvider, Comments } from 'react-facebook';

export default class Example extends Component {

    render() {
        const { test } = this.props;
        return (
            <>
                <FacebookProvider appId="437273164213634">
                    <Comments href={`http://localhost:3000/detailBlogs/${test}`} />
                </FacebookProvider>
            </>
        );
    }
}