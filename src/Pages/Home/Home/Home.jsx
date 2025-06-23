import React from 'react';
import Banner from '../Banner/Banner';
import OurServices from '../OurServices/OurServices';
import ClientLogoMarquee from '../ClientLogoMarquee/ClientLogoMarquee';
import ServiceProdive from '../ServiceProvide/ServiceProvide';

const Home = () => {
    return (
        <div>
            <Banner/>
            <OurServices/>
            <ClientLogoMarquee/>
            <ServiceProdive/>
        </div>
    );
};

export default Home;