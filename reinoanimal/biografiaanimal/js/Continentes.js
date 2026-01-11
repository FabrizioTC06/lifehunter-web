function crearGlobo(habitats = []) {
    Globe()(document.getElementById('globo3d'))
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
        .pointsData(habitats)
        .pointAltitude(0.06)
        .pointColor(d => d.color)
        .pointLabel(d => d.label)
        .backgroundColor('#ffffff')
        .showAtmosphere(false);
}