import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


/*
// Fixing the AndroidBackButton
// =============== Not working for PWA ============
// ref: https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload
window.onunload = window.onbeforeunload = function(event) {
  event.preventDefault();
  event.stopPropagation();

  var dialogText = 'Do you really want to exit?';
  event.returnValue = dialogText;
  return dialogText;

  //return false
}
*/