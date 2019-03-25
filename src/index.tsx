import "node_modules/bootstrap/dist/css/bootstrap.css";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { AppRouter } from './route';

ReactDOM.render(<AppRouter />, document.getElementById(
  "root"
) as HTMLElement);
registerServiceWorker();
