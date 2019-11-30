import React from 'react';
import { Row, Col } from '../components/Grid'
import Page from '../components/Page'
import { useData } from '../hooks/serviceHooks'
import { useRunningStatus } from '../hooks/statusHooks'

const SettingsManager = () => {
    const [ serverSettings, loading ] = useData({ url: '/api/settings' })
    const [ running ] = useRunningStatus()

    return (
        <Row>
            <Col size={12}><h3>Settings</h3></Col>
            {!running ? 
            <Col size={12}>
                {!loading ? JSON.stringify(serverSettings) : null}
            </Col> :   
            <Col size={12}>
                <p>Cannot edit settings while ReacTIVision server is running</p>
            </Col>}
        </Row>
    )
}

const Home = () => {    
    return (
        <Page>
            <SettingsManager />
        </Page>
    );
}

export default Home 
