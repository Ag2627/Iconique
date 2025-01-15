

import { Button, Divider, Box, Typography, styled } from '@mui/material';
  
 import Carousel from 'react-multi-carousel';
 import "react-multi-carousel/lib/styles.css";
import Countdown from 'react-countdown';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


 const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};

const Component = styled(Box)`
    margin-top: 10px;
    background: #FFFFFF;
`;

const Deal = styled(Box)`
    display: flex;    
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    
`

const DealText = styled(Typography)`
    font-size: 22px;
    font-weight: 600;
    line-height: 32px;
    margin-right: 25px;
`

const Timer = styled(Box)`
    color: #7f7f7f;
    margin-left: 10px;
    display: flex;
    align-items: center;
`;

const ViewAllButton = styled(Button)`
    margin-left: auto;  
    background-color: #F33A6A; 
    border-radius: 2px;
    font-size: 13px;
    color: white;
    font-weight: 600;
    height: 30px;
    padding: 0 10px; /* Adjust padding for desired spacing around content */
    width: auto; /* Ensures size is based on content */
    white-space: nowrap; /* Prevents text wrapping if the content is long */
    &:hover {
        background-color: #FF6F91;  
    }
`;



const Image = styled('img')({
    width: 'auto',
    height: 150
})

const Text = styled(Typography)`
    font-size: 14px;
    margin-top: 5px
`

const RenderTimer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}));
      
// const MultiSlide = ({ data, timer, title }) => {
//     const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';

//     const renderer = ({ hours, minutes, seconds }) => {
//         return <RenderTimer variant="span">{hours} : {minutes} : {seconds}  Left</RenderTimer>;
//     };
    
//     return (
//         <Component>
//             <Deal>
//                 <DealText>{title}</DealText>
//                 {
//                     timer && <Timer>
//                                 <img src={timerURL} style={{ width: 24 }} alt='time clock' />
//                                 <Countdown date={Date.now() + 5.04e+7} renderer={renderer} />
//                         </Timer>
//                 }
//                 <ViewAllButton variant="contained" color="primary">View All</ViewAllButton>
//             </Deal>
//             <Divider />
//             <Carousel
//                 swipeable={false}
//                 draggable={false}
//                 responsive={responsive}
//                 centerMode={true}
//                 infinite={true}
//                 autoPlay={true}
//                 autoPlaySpeed={10000}
//                 keyBoardControl={true}
//                 showDots={false}
//                 containerClass="carousel-container"
//                 // removeArrowOnDeviceType={["tablet", "mobile"]}
//                 dotListClass="custom-dot-list-style"
//                 itemClass="carousel-item-padding-40-px"
//             >
//                 {
//                     data.map(temp => (
//                         <Link to={`product/${temp.id}`} style={{textDecoration: 'none'}}>
//                             <Box textAlign="center" style={{ padding: '25px 15px' }}>
//                                 <Image src={temp.url} />
//                                 <Text style={{ fontWeight: 600, color: '#212121' }}>{temp.title.shortTitle}</Text>
//                                 <Text style={{ color: 'green' }}>{temp.discount}</Text>
//                                 <Text style={{ color: '#212121', opacity: '.6' }}>{temp.tagline}</Text>
//                             </Box>
//                         </Link>
//                     ))
//                 }
//             </Carousel>
//         </Component>
//     )
// }

const Slide = ({ products }) => {
    const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';
    const navigate = useNavigate();

    if (!products || products.length === 0) {
        return <div>No products available</div>;
    }
    const renderer = ({ hours, minutes, seconds }) => {
        return <RenderTimer variant="span">{hours} : {minutes} : {seconds}  Left</RenderTimer>;
             };
    return (
        <Component>
            <Deal>
                <DealText>Deal of the Day</DealText>
                 <Timer>
                    <img src={timerURL} alt="timer"/>
                    <Countdown date={Date.now() + 5.04e+7} renderer={renderer}/>
                </Timer> 
                 <ViewAllButton variant="contained" >View All</ViewAllButton>
            </Deal>
            <Divider />
            <Carousel
                responsive={responsive}
                swipeable={false}
                draggable={false}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                centerMode={true}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
>
            {
                products.map(product => (
                    
                    <Box
                key={product._id}
                textAlign="center"
                style={{ padding: '25px 15px', cursor: 'pointer' }}
                onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${product._id}`);
                }}
            >
                <Image src={product.image} alt="product" />
                <Text style={{ fontWeight: 600, color: '#212121' }}>
                    {product.title.shortTitle || product.title}
                </Text>
                <Text style={{ color: '#FF6F91' }}>{product.discount}% OFF</Text>
                <Text style={{ color: '#212121', opacity: '0.6' }}>{product.tagline}</Text>
            </Box>
                    

                ))
            }

            </Carousel>
        </Component>
    )
}

export default Slide;