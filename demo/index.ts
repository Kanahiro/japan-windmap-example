import { Deck } from '@deck.gl/core';
import { TileLayer, BitmapLayer } from 'deck.gl';
// @ts-ignore
import { ParticleLayer } from 'deck.gl-particle';
import GL from '@luma.gl/constants';

const bounds = [119.96875, 22.375, 150.03125, 47.625];

const background = new TileLayer({
    id: 'background',
    data: 'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
    minZoom: 0,
    maxZoom: 17,
    tileSize: 256,
    extent: bounds as any,
    renderSubLayers: (props) => {
        const {
            bbox: { west, south, east, north },
        } = props.tile;
        return new BitmapLayer(props, {
            data: null,
            image: props.data,
            bounds: [west, south, east, north],
        });
    },
});

const image = new Image();
image.onload = () => {
    const particle = new ParticleLayer({
        id: 'particle',
        maxAge: 40,
        numParticles: 1500,
        image,
        speedFactor: 1.0,
        width: 2,
        opacity: 0.5,
        animate: true,
        bounds,
        textureParameters: {
            [GL.TEXTURE_WRAP_S]: GL.CLAMP_TO_EDGE,
        },
    });
    new Deck({
        initialViewState: {
            longitude: 136,
            latitude: 37.78,
            zoom: 4,
        },
        controller: true,
        layers: [background, particle],
        _animate: true,
    });
};
image.src = 'wind_rgb.png';
