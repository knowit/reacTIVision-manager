import React, { 
    useRef,
    useImperativeHandle,
    forwardRef } from 'react';
import Page from '../components/Page'
import { Row, Col } from '../components/Grid'
import { LoadingButton } from '../components/Button'
import { useCalibrationRender, useCalibrationGrid, useCameraSettings } from '../hooks/calibrationHooks'

const Video = ({ width, height }) => 
    <img 
        style={{
            position: 'absolute',
            zIndex: -1
        }}
        src={`/stream?width=${width}&height=${height}`} 
        width={width} 
        height={height} />

const Canvas = forwardRef(
    ({ width, height }, ref) => {
        const canvasRef = useRef();
        useImperativeHandle(ref, () => ({
            getContext: (x) => canvasRef.current.getContext(x)
        }));
        return <canvas 
            style={{
                position: 'absolute'
            }}
            ref={canvasRef}
            width={width} 
            height={height}/>
    })

const CalibrateRender = ({ width, height, grid }) => {
    const [ canvasRef ] = useCalibrationRender(width, height, grid)

    return (
        <Row>
            <Col size={12}>
                <div style={{width, height}}>
                    <Canvas ref={canvasRef} width={width} height={height}/>
                    <Video width={width} height={height}/>
                </div>
            </Col>
        </Row>
    )
}


const CalibrateSession = ({ name }) => {
    const { width, height } = useCameraSettings()
    const grid = useCalibrationGrid(width, height, name)

    return (
        <>
            <Row>
                <Col>
                    <CalibrateRender width={width} height={height} grid={grid} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Help text</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <LoadingButton>
                        Save
                    </LoadingButton>
                </Col>
            </Row>
        </>
    )
}



const Calibrate = () => {
    return (
        <Page>
            <CalibrateSession name={"test"}/>
        </Page>
    );
}
export default Calibrate  
