import React from 'react';
import { LogBox } from 'react-native';
import Routes from './routes';
import './config/StatusBarConfig';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const App = () => <Routes />;

export default App;