import React from 'react';
import { Row, Col } from '../components/Grid'
import Page from '../components/Page'
import { useData, useService } from '../hooks/serviceHooks'
import { useRunningStatus } from '../hooks/statusHooks'
import { 
    Form, 
    TextField, 
    Submit, 
    FormGroup,
    CheckboxField,
    SelectField,
    FormList } from '../components/Form'


const SettingsForm = ({ settings }) => {
    const [ running ] = useRunningStatus()

    const [ updateSettings, loading ] = useService({ url: '/api/settings', method: 'POST' })

    return (
        <Form readonly={running} loading={loading} onSubmit={updateSettings}>
            <FormGroup name="camera" label="Camera Settings">

            </FormGroup>

            <FormList name="connections" label="Connections" items={settings.connections}>
                {connection => (
                    <Row>
                        <Col size={4}>
                            <TextField name="host" label="Host" initialValue={connection.host}/>
                        </Col>
                        <Col size={4}>
                            <TextField name="port" label="Port" initialValue={connection.port}/>
                        </Col>
                        <Col size={4}>
                            <SelectField 
                                label="Type" 
                                name="protocol" 
                                initialValue={connection.protocol} 
                                items={[
                                    {label: "UDP", value: "udp"},
                                    {label: "TCP", value: "tcp"},
                                    {label: "Web Socket", value: "web"},
                                    {label: "Flash", value: "flc"}
                                ]} />
                        </Col>
                    </Row>
                )}
            </FormList>

            <FormGroup name="fiducial" label="Fiducial Settings">
                <SelectField 
                    label="Ameba type" 
                    name="amoeba" 
                    initialValue={settings.fiducial.amoeba} 
                    items={[
                        {label: "Default", value: "default"},
                        {label: "Small", value: "small"},
                        {label: "Mini", value: "mini"}
                    ]} />
                <CheckboxField label="Mirror" name="mirror" initialValue={settings.fiducial.mirror} />
                <CheckboxField label="Use Yamaarashi" name="yamaarashi" initialValue={settings.fiducial.yamaarashi} />
            </FormGroup>

            <FormGroup name="calibration" label="Calibration Settings">
                <SelectField 
                    label="Use calibration" 
                    name="file" 
                    initialValue={settings.calibration.file} 
                    items={{ url: '/api/calibration', root: 'calibrations' }} />
            </FormGroup>

            <Submit label="Save" />
        </Form>
    )
}

const SettingsManager = () => {
    const [ settings, loading ] = useData({ url: '/api/settings' })

    return (
        <Row>
            <Col size={12}>
                {loading ? null : <SettingsForm settings={settings}/>}
            </Col>
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
