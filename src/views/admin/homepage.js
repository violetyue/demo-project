import React, { Component } from 'react';
import { login } from '../../api/index'
import JsSha from 'jssha';

export const hashPassword = (password) => {
    const sha = new JsSha('SHA3-224', 'TEXT');
    sha.update(password);
    return sha.getHash('HEX');
};

class homepage extends Component {

    

    render() { 
        return (
            <div>
                <h1>zhuye</h1>
            </div>
        );
    }
}
 
export default homepage;