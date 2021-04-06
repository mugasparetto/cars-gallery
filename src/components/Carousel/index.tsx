import React, { useCallback, useRef, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import RNCarousel, {
  Pagination as RNPagination,
} from 'react-native-snap-carousel';

import { Container, Image, Title } from './styles';

interface Data {
  id: string;
  url: string;
}

interface Props {
  data: Data[];
  itemWidth: number;
  title?: string;
}

const Carousel = ({ data, itemWidth, title }: Props) => {
  const [flatListWidth, setFlatListWidth] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  const carouselRef = useRef(null);

  const CarouselImage = useCallback(({ item }: { item: Data }) => {
    return <Image source={{ uri: item.url }} />;
  }, []);

  const Pagination = useCallback(() => {
    return (
      <RNPagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        dotStyle={{
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: '#476ff4',
        }}
        inactiveDotStyle={{
          backgroundColor: '#d4d4d4',
        }}
        inactiveDotOpacity={0.8}
        inactiveDotScale={0.8}
      />
    );
  }, [activeSlide, data.length]);

  return (
    <Container
      onLayout={(event: LayoutChangeEvent) => {
        setFlatListWidth(event.nativeEvent.layout.width);
      }}
    >
      {flatListWidth > 0 && (
        <RNCarousel
          ref={carouselRef}
          data={data}
          renderItem={CarouselImage}
          sliderWidth={flatListWidth}
          itemWidth={itemWidth}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
      )}
      {title && <Title>{title}</Title>}
      <Pagination />
    </Container>
  );
};

export default Carousel;
