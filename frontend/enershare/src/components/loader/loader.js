import React from 'react'
import loadingGIF from "../../images/loading.gif"
import {
    StyledLoadingContainer,
    StyledLoader,
    StyledImage,
} from "./loader.styled"


function Loader() {

    return (
        <StyledLoadingContainer>
            <StyledLoader>
                <StyledImage alt="Loading..." title="Loading..." src={loadingGIF} />
            </StyledLoader>
        </StyledLoadingContainer>
    );
}

export default Loader;