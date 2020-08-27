import React from 'react';
import './reset.css';
import './app.css';
import 'antd/dist/antd.css';

import { Tabs } from 'antd';

// import view
import Calculator from './views/Calculator';
import RpsTester from './views/RpsTester';

const { TabPane } = Tabs;

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    render() {
        return (
            <div className="app">
                <Tabs defaultActiveKey="2">
                    <TabPane tab="111" key="1">
                        <Calculator />
                    </TabPane>
                    <TabPane tab="222" key="2">
                        <RpsTester />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
