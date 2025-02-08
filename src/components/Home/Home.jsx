
import { useEffect } from "react";
import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/actions/productAction";

//import NavBar from "./NavBar";
import Banner from "./Banner";
import Slide from "./Slide";

const Component = styled(Box)`
    padding: 10px;
    background: #f5f5f5; /* Ensure a clean background */
    overflow-x: hidden; /* Prevent horizontal scrolling */
`;

const Home = () => {
    const { products } = useSelector((state) => state.fetchProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const productArray = products?.data || [];

    const filterProductsByCategory = (category) => {
        return productArray.filter((product) => product.category === category);
    };
    const filterProductsBySustainablility = (value) => {
        return productArray.filter(
          (product) => product.sustainable === "true" || product.sustainable === "YES"
        );
      };

    return (
        <>
            
            <Component>
            <div style={{ marginTop: '50px' }}>
                <Banner />
            </div>

                {/* Filtered products for each category */}
                <Slide products={productArray} title="Deal of the Day" timer={true} />
                <Slide products={filterProductsByCategory("women")} title="Bejeweled and Bright" timer={false} />
                <Slide products={filterProductsByCategory("men")} title="Dapper & Distinguished" timer={false} />
                <Slide products={filterProductsByCategory("kids")} title="Tiny Trendsetters" timer={false} />
                <Slide products={filterProductsByCategory("footwear")} title="Stride & Style" timer={false} />
                <Slide products={filterProductsByCategory("accessories")} title="Adorn & Elevate" timer={false} />
                <Slide products={filterProductsBySustainablility("true")} title="Sustainable Products" timer={false} />

            </Component>
        </>
    );
};

export default Home;
