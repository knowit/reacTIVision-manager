import React, { useEffect } from 'react';
import { Container, Row, Col } from '../components/Grid'
import { LoadingButton } from '../components/Button'
import { useService } from '../hooks/serviceHooks'
import { useRunningStatus } from '../hooks/statusHooks'
import { RunningStatusProvider } from '../contexts/ServerStatus'
import Nav from '../components/Nav'

const ServerStatusLabel = ({ running }) => running 
    ? <span className="spinner-grow text-success" role="status"></span>
    : <span className="spinner-grow text-danger" role="status"></span>

const SideBar = () => {
    const [ running, checkServerStatus ] = useRunningStatus();

    const [
        startServer, 
        startServerLoading,
        startServerState ] = useService({ url: '/api/server/start' })
    const [
        stopServer, 
        stopServerLoading,
        stopServerState ] = useService({ url: '/api/server/stop' })

    useEffect(
        () => checkServerStatus(),
        [startServerState, stopServerState])

    return (
        <Row>
            <Col size={12}>
                <h3>
                    Status
                    <ServerStatusLabel running={running}/>
                </h3>
            </Col>
            <Col size={12}>
                <LoadingButton 
                    disabled={startServerLoading || stopServerLoading || running}
                    loading={startServerLoading}
                    onClick={startServer}>
                    Start
                </LoadingButton>
                <LoadingButton 
                    disabled={startServerLoading || stopServerLoading || !running}
                    loading={stopServerLoading}
                    color={"secondary"}
                    onClick={stopServer}>
                    Stop
                </LoadingButton>
            </Col>
        </Row>
    )
}

const Page = ({ title, children }) => {    
    return (
        <RunningStatusProvider>
            <Container>
                <Row>
                    <Col>
                        <h1>ReacTIVision Manager</h1>
                    </Col>
                </Row>
                <Row>
                    <Nav links={[
                        {href: '/', name: 'Home'},
                        {href: '/calibrate', name: 'Calibrate'}
                    ]}/>
                </Row>
                <Row>
                    <Col size={8}>
                        {children}
                    </Col>
                    <Col size={2}>
                        <SideBar />
                    </Col>
                </Row>
            </Container>
        </RunningStatusProvider>
    );
}

export default Page 
