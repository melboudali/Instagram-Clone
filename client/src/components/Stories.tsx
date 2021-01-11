import { useRef, useState } from 'react';
import styled from 'styled-components';
import Story from './layouts/Story';
import Assets from '../assets/images/798b49104da7.png';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 116px;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  margin: 54px 0 16px;
  overflow: hidden;
`;

const Main = styled.div<{ translateValue: number }>`
  height: 100%;
  width: fit-content;
  display: flex;
  flex-grow: 1;
  align-items: center;
  transform: ${({ translateValue }) => `translateX(-${translateValue}px)`};
  transition: transform 1s ease-out;
`;

const NextBtn = styled.button`
  right: 0;
  cursor: pointer;
  padding: 0;
  background: 0 0;
  border: 0;
  justify-self: center;
  outline: 0;
  padding: 16px 8px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const Next = styled.div`
  height: 45px;
  width: 45px;
  background-image: url(${Assets});
  background-repeat: no-repeat;
  background-position: -294px -273px;
`;

type StoriesProps = {};

const Stories = ({}: StoriesProps) => {
  const StoriesData: { name: string; image: string }[] = [
    {
      name: 'mercedes',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/128444312_195044392220087_2626476807974979382_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=6eukZvzDplAAX8SPuqu&tp=1&oh=e80692a5b919db2d9a3ee11dba33e643&oe=602692DC'
    },
    {
      name: 'pullandbear',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/119967716_168469141494754_1912290642671596029_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=xVXj9KZleKQAX_sBAH5&tp=1&oh=293f0d86a158dead8247ab2da6aaefdc&oe=60232E38'
    },
    {
      name: 'voguemagazine',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/25024975_1053395324802105_3204556493470826496_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=42hUmjDaErAAX_rQGos&tp=1&oh=99e131336e1f9be396ce30c13775c2f9&oe=6025D940'
    },
    {
      name: 'versace',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/64887406_2419362201457012_4649003460253974528_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=bN4uaYUUoU8AX9ZrIjd&tp=1&oh=b09096258865e3f8df8d6711ae40f90c&oe=602684FB'
    },
    {
      name: 'dolcegabbana',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/110186591_652942011965204_3898636332437750301_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=GEJ9i7G2bpsAX_Y9nJm&tp=1&oh=6ca512147fa1f182a965f31ae4bdb573&oe=6025FBD9'
    },
    {
      name: 'mercedes',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/128444312_195044392220087_2626476807974979382_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=6eukZvzDplAAX8SPuqu&tp=1&oh=e80692a5b919db2d9a3ee11dba33e643&oe=602692DC'
    },
    {
      name: 'pullandbear',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/119967716_168469141494754_1912290642671596029_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=xVXj9KZleKQAX_sBAH5&tp=1&oh=293f0d86a158dead8247ab2da6aaefdc&oe=60232E38'
    },
    {
      name: 'voguemagazine',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/25024975_1053395324802105_3204556493470826496_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=42hUmjDaErAAX_rQGos&tp=1&oh=99e131336e1f9be396ce30c13775c2f9&oe=6025D940'
    },
    {
      name: 'versace',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/64887406_2419362201457012_4649003460253974528_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=bN4uaYUUoU8AX9ZrIjd&tp=1&oh=b09096258865e3f8df8d6711ae40f90c&oe=602684FB'
    },
    {
      name: 'dolcegabbana',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/110186591_652942011965204_3898636332437750301_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=GEJ9i7G2bpsAX_Y9nJm&tp=1&oh=6ca512147fa1f182a965f31ae4bdb573&oe=6025FBD9'
    },
    {
      name: 'mercedes',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/128444312_195044392220087_2626476807974979382_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=6eukZvzDplAAX8SPuqu&tp=1&oh=e80692a5b919db2d9a3ee11dba33e643&oe=602692DC'
    },
    {
      name: 'pullandbear',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/119967716_168469141494754_1912290642671596029_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=xVXj9KZleKQAX_sBAH5&tp=1&oh=293f0d86a158dead8247ab2da6aaefdc&oe=60232E38'
    },
    {
      name: 'voguemagazine',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/25024975_1053395324802105_3204556493470826496_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=42hUmjDaErAAX_rQGos&tp=1&oh=99e131336e1f9be396ce30c13775c2f9&oe=6025D940'
    },
    {
      name: 'versace',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/64887406_2419362201457012_4649003460253974528_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=bN4uaYUUoU8AX9ZrIjd&tp=1&oh=b09096258865e3f8df8d6711ae40f90c&oe=602684FB'
    },
    {
      name: 'dolcegabbana',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/110186591_652942011965204_3898636332437750301_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=GEJ9i7G2bpsAX_Y9nJm&tp=1&oh=6ca512147fa1f182a965f31ae4bdb573&oe=6025FBD9'
    },
    {
      name: 'mercedes',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/128444312_195044392220087_2626476807974979382_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=6eukZvzDplAAX8SPuqu&tp=1&oh=e80692a5b919db2d9a3ee11dba33e643&oe=602692DC'
    },
    {
      name: 'pullandbear',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/119967716_168469141494754_1912290642671596029_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=xVXj9KZleKQAX_sBAH5&tp=1&oh=293f0d86a158dead8247ab2da6aaefdc&oe=60232E38'
    },
    {
      name: 'voguemagazine',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/25024975_1053395324802105_3204556493470826496_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=42hUmjDaErAAX_rQGos&tp=1&oh=99e131336e1f9be396ce30c13775c2f9&oe=6025D940'
    },
    {
      name: 'versace',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/64887406_2419362201457012_4649003460253974528_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=bN4uaYUUoU8AX9ZrIjd&tp=1&oh=b09096258865e3f8df8d6711ae40f90c&oe=602684FB'
    },
    {
      name: 'dolcegabbana',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/110186591_652942011965204_3898636332437750301_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=GEJ9i7G2bpsAX_Y9nJm&tp=1&oh=6ca512147fa1f182a965f31ae4bdb573&oe=6025FBD9'
    }
  ];

  const SliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [translate, setTranslate] = useState<number>(0);

  const NextSlide = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // TODO: i need to fix this slider later
    let leftWidth = (currentIndex + 5) * 88 - StoriesData.length * 88;
    if (leftWidth > (currentIndex + 5) * 88) {
      setCurrentIndex(currentIndex + 5);
      setTranslate((currentIndex + 5) * 88);
    } else {
      setCurrentIndex(currentIndex - StoriesData.length);
      setTranslate(leftWidth);
    }
  };

  return (
    <Container ref={SliderRef}>
      <Main translateValue={translate}>
        {StoriesData.map(({ name, image }, i) => (
          <Story key={i} name={name} image={image} />
        ))}
      </Main>
      <NextBtn>
        <Next onClick={NextSlide} />
      </NextBtn>
    </Container>
  );
};

export default Stories;
