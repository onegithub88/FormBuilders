import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
var setDataString = 'text/html';
const changeDataStringForIe=function () {
    var userAgent = window.navigator.userAgent,
    msie = userAgent.indexOf('MSIE'),   
    trident = userAgent.indexOf('Trident/');
    if (msie > 0 || trident > 0) {
        setDataString = 'Text';
        return true;
    } else {
        return false;
     }
}();
ReactDOM.render(<App/>, document.getElementById('root'));
