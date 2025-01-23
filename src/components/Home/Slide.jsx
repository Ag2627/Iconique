import { Button, Divider, Box, Typography, styled } from '@mui/material';
import Slider from 'react-slick';
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Component = styled(Box)`
    margin-top: 10px;
    background: #FFFFFF;
`;

const Deal = styled(Box)`
    display: flex;    
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
`;

const DealText = styled(Typography)`
    font-size: 22px;
    font-weight: 600;
    line-height: 32px;
    margin-right: 25px;
`;

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
    padding: 0 10px;
    width: auto;
    white-space: nowrap;
    &:hover {
        background-color: #FF6F91;  
    }
`;

const Image = styled('img')({
    width: 'auto',
    height: 150,
});

const Text = styled(Typography)`
    font-size: 14px;
    margin-top: 5px;
`;

const RenderTimer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));

// Custom arrow component
const CustomArrow = ({ className, style, onClick, direction }) => (
    <div
        className={className}
        style={{
            ...style,
            display: 'block',
            background: direction === 'left' ? '#F33A6A' : '#FF6F91', // Arrow styling
            borderRadius: '50%', // Make the arrow round
            height: '40px',
            width: '40px',
            zIndex: 2, // Ensure the arrow appears on top of the slider
        }}
        onClick={onClick} // Handle click event to slide
    />
);


const Slide = ({ products, title, timer }) => {
    const sliderSettings = {
        infinite: true, // Enables infinite looping
        slidesToShow: 5, // Number of slides visible at once
        slidesToScroll: 1, // Number of slides to move on arrow click
        autoplay: timer, // Enables/disables autoplay (based on the 'timer' prop)
        speed: 500, // Transition speed in milliseconds
        nextArrow: <CustomArrow direction="right" />, // Custom right arrow
        prevArrow: <CustomArrow direction="left" />, // Custom left arrow
        responsive: [
            {
                breakpoint: 1024, // For screens below 1024px
                settings: {
                    slidesToShow: 3, // Show 3 slides
                },
            },
            {
                breakpoint: 464, // For screens below 464px
                settings: {
                    slidesToShow: 1, // Show 1 slide
                },
            },
        ],
    };
    

    const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';
    const navigate = useNavigate();

    if (!products || products.length === 0) {
        return <div>No products available</div>;
    }

    const renderer = ({ hours, minutes, seconds }) => (
        <RenderTimer variant="span">
            {hours} : {minutes} : {seconds} Left
        </RenderTimer>
    );

    return (
        <Component>
            <Deal>
                <DealText>{title}</DealText>
                {timer && (
                    <Timer>
                        <img src={timerURL} alt="timer" />
                        <Countdown date={Date.now() + 5.04e7} renderer={renderer} />
                    </Timer>
                )}
                {/* <ViewAllButton variant="contained">View All</ViewAllButton> */}
            </Deal>
            <Divider />
            <Slider {...sliderSettings}>
                {products.map((product) => (
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
                ))}
            </Slider>
        </Component>
    );
};

export default Slide;
