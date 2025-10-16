import React from 'react';
import ModelGallery from '../../src/components/app/ModelGalleryComponent/ModelGallery';
import { models } from '../../src/components/app/ModelGalleryComponent/ModelsData';

const Index = () => {
    return (
        <>
            <ModelGallery models={models}/>
        </>
    );
};

export default Index;