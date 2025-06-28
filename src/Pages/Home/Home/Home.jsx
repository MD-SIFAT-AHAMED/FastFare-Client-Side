import React from 'react';
import Banner from '../Banner/Banner';
import OurServices from '../OurServices/OurServices';
import ClientLogoMarquee from '../ClientLogoMarquee/ClientLogoMarquee';
import ServiceProdive from '../ServiceProvide/ServiceProvide';
import BeMerchant from '../BeMerchant/BeMerchant';
import CommentSwiper from '../CommentSwiper/CommentSwiper';
import FaqSection from '../FaqSection/FaqSection';

const Home = () => {
    return (
        <div>
            <Banner/>
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