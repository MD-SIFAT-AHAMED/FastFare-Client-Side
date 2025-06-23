import React from 'react';
import Banner from '../Banner/Banner';
import OurServices from '../OurServices/OurServices';
import ClientLogoMarquee from '../ClientLogoMarquee/ClientLogoMarquee';
import ServiceProdive from '../ServiceProvide/ServiceProvide';
import BeMerchant from '../BeMerchant/BeMerchant';

const Home = () => {
    return (
        <div>
            <Banner/>
            <OurServices/>
            <ClientLogoMarquee/>
            <ServiceProdive/>
            <BeMerchant/>
        </div>
    );
};

export default Home;