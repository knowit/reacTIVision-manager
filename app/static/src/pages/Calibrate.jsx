import React from 'react';
import Page from '../components/Page'

const Video = ({ width, height })  => <img src="/stream" width={width} height={height}/>

const Calibrate = () => {    
    return (
        <Page>
            <Video width={680} height={420}/>
        </Page>
    );
}
export default Calibrate  
