import React from 'react';
import Banner from '../Banner/Banner';
import OurServices from '../OurServices/OurServices';
import ClientLogoMarquee from '../ClientLogoMarquee/ClientLogoMarquee';
import ServiceProdive from '../ServiceProvide/ServiceProvide';
import BeMerchant from '../BeMerchant/BeMerchant';
import CommentSwiper from '../CommentSwiper/CommentSwiper';
import FaqSection from '../FaqSection/FaqSection';
import HowWorks from '../HowWorks/HowWorks';

const Home = () => {
    return (
        <div>
            <Banner/>
            <HowWorks/>
            <OurServices/>
            <ClientLogoMarquee/>
            <ServiceProdive/>
            <BeMerchant/>
            <CommentSwiper/>
            <FaqSection/>
        </div>
    );
};

export default Home;