// import { Typography,Box } from "@mui/material";
import sustainability from '../../assets/sustainability.jpg'

const SustainabilityTag=({isSus})=>{
    return(
        <>
            {(isSus==='true') && <img src={sustainability} width='3%'/>}
        </>
    )

}

export default SustainabilityTag;