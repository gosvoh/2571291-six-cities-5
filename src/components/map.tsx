import { useEffect, useRef } from 'react';
import { Icon, Marker, layerGroup, LatLngBounds } from 'leaflet';
import { useMap } from '@/hooks';
import { MarkersIcons } from '@/constants';
import 'leaflet/dist/leaflet.css';

type Props = {
  city: OfferCityType;
  points: PointMap[];
  selectedPoint?: OffersType['id'];
};

const defaultCustomIcon = new Icon({
  iconUrl: MarkersIcons.UrlMarkerDefault,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: MarkersIcons.UrlMarkerCurrent,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

function Map({ city, points, selectedPoint }: Props) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const markerLayerRef = useRef(layerGroup());
  const markersRef = useRef<{ marker: Marker; id: OffersType['id'] }[]>([]);
  const lastSelectedPoint = useRef<{
    id: OffersType['id'];
    arrayIndex: number;
  }>();

  const staticPoints = JSON.stringify(points);

  useEffect(() => {
    if (!map || !points.length) {
      return;
    }

    const markerLayer = markerLayerRef.current;

    if (!markersRef.current.length) {
      points.forEach(({ latitude, longitude, id }, i) => {
        const marker = new Marker({ lat: latitude, lng: longitude })
          .setIcon(defaultCustomIcon)
          .addTo(markerLayer);
        marker.getElement()?.style.setProperty('z-index', `${i + 1}`);
        markersRef.current.push({ marker, id });
      });

      markerLayer.addTo(map);
    }

    const bounds = new LatLngBounds(
      points.map(({ latitude, longitude }) => [latitude, longitude])
    );
    map.fitBounds(bounds, { padding: [50, 50] });

    return () => {
      markerLayer.clearLayers();
      markersRef.current = [];
    };
    // Так как React не может обрабатывать массивы, а если передать points, то ререндер будет постоянным
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [map, staticPoints]);

  useEffect(() => {
    if (!map || !markersRef.current.length) {
      return;
    }

    if (lastSelectedPoint.current && !selectedPoint) {
      markersRef.current
        .find(({ id }) => id === lastSelectedPoint.current!.id)
        ?.marker?.setIcon(defaultCustomIcon);
      markersRef.current[lastSelectedPoint.current.arrayIndex].marker
        .getElement()
        ?.style.setProperty(
          'z-index',
          `${lastSelectedPoint.current.arrayIndex + 1}`
        );
      lastSelectedPoint.current = undefined;
    } else if (
      selectedPoint &&
      lastSelectedPoint.current &&
      selectedPoint !== lastSelectedPoint.current.id
    ) {
      markersRef.current
        .find(({ id }) => id === lastSelectedPoint.current?.id)
        ?.marker?.setIcon(defaultCustomIcon);
      markersRef.current[lastSelectedPoint.current.arrayIndex].marker
        .getElement()
        ?.style.setProperty(
          'z-index',
          `${lastSelectedPoint.current.arrayIndex + 1}`
        );
      const arrayIndex = markersRef.current.findIndex(
        ({ id }) => id === selectedPoint
      );
      markersRef.current[arrayIndex].marker.setIcon(currentCustomIcon);
      markersRef.current[arrayIndex].marker
        .getElement()
        ?.style.setProperty('z-index', '1000');
      lastSelectedPoint.current = { id: selectedPoint, arrayIndex };
    } else if (selectedPoint) {
      const arrayIndex = markersRef.current.findIndex(
        ({ id }) => id === selectedPoint
      );
      if (arrayIndex !== -1) {
        markersRef.current[arrayIndex].marker.setIcon(currentCustomIcon);
        markersRef.current[arrayIndex].marker
          .getElement()
          ?.style.setProperty('z-index', '1000');
        lastSelectedPoint.current = { id: selectedPoint, arrayIndex };
      } else {
        lastSelectedPoint.current = undefined;
      }
    } else {
      lastSelectedPoint.current = undefined;
    }
  }, [map, selectedPoint, markersRef.current.length]);

  return <div style={{ height: '100%' }} ref={mapRef} />;
}

export default Map;
