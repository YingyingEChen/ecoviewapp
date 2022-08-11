import React from 'react';
import LandInfo from './components/LandInfo';

import { DashboardLayout } from './components/Layout';
import Map from './components/Map';

const HomePage = () => {
    return (
        <DashboardLayout>
            <Map />
        </DashboardLayout>
    )
}

export default HomePage;