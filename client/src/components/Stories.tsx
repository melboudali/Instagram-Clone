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
  transition: transform 500ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
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

const PrevBtn = styled.button`
  left: 0;
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

const Prev = styled.div`
  height: 45px;
  width: 45px;
  background-image: url(${Assets});
  background-repeat: no-repeat;
  background-position: -294px -226px;
`;

type StoriesProps = {};

const Stories = ({}: StoriesProps) => {
  const StoriesData: { name: string; image: string }[] = [
    {
      name: 'versace',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/64887406_2419362201457012_4649003460253974528_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=bN4uaYUUoU8AX9ZrIjd&tp=1&oh=b09096258865e3f8df8d6711ae40f90c&oe=602684FB'
    },
    {
      name: 'ferrari',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/13256976_998954483525291_2088181491_a.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=_HwKzaGtBFoAX_aYplU&tp=1&oh=c9b497fd527f4df09e45683e29ab82a3&oe=6027E16C'
    },
    {
      name: 'lamborghini',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/10914351_445156875637393_373836994_a.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=68MQfFBzrRMAX9yDrPp&oh=059b8ece9522801147ce86c81d25631a&oe=602881EC'
    },
    {
      name: 'pullandbear',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/119967716_168469141494754_1912290642671596029_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=xVXj9KZleKQAX_sBAH5&tp=1&oh=293f0d86a158dead8247ab2da6aaefdc&oe=60232E38'
    },
    {
      name: 'porsche',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/72477687_2436503716627621_3330394547002802176_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=eTheBcKg3FUAX_L6A7g&tp=1&oh=00baefb9e0abdb1779d2eeb63a9d5252&oe=6025F6C8'
    },
    {
      name: 'dior',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/42633985_1927008894059358_8334422696888631296_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=M7zS9McaNOcAX88S_VE&tp=1&oh=a5b071a63b71536b8eff464beaf0e10a&oe=602935F0'
    },
    {
      name: 'louisvuitton',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/914335_653223868059486_1434031198_a.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=U6vgVx_e8o4AX833F7W&oh=0339da54381d42d4f923b0c15c373397&oe=60266A46'
    },
    {
      name: 'voguemagazine',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/25024975_1053395324802105_3204556493470826496_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=42hUmjDaErAAX_rQGos&tp=1&oh=99e131336e1f9be396ce30c13775c2f9&oe=6025D940'
    },
    {
      name: 'chanelofficial',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/66505567_684858381987599_4049279537282809856_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=JlK4jzw1zM8AX9FMHuU&tp=1&oh=5eb83b40f465669d993bb6602752d4d7&oe=60271462'
    },
    {
      name: 'mercedes',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/128444312_195044392220087_2626476807974979382_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=6eukZvzDplAAX8SPuqu&tp=1&oh=e80692a5b919db2d9a3ee11dba33e643&oe=602692DC'
    },
    {
      name: 'dolcegabbana',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/110186591_652942011965204_3898636332437750301_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=GEJ9i7G2bpsAX_Y9nJm&tp=1&oh=6ca512147fa1f182a965f31ae4bdb573&oe=6025FBD9'
    },
    {
      name: 'versace',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/64887406_2419362201457012_4649003460253974528_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=bN4uaYUUoU8AX9ZrIjd&tp=1&oh=b09096258865e3f8df8d6711ae40f90c&oe=602684FB'
    },
    {
      name: 'ferrari',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/13256976_998954483525291_2088181491_a.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=_HwKzaGtBFoAX_aYplU&tp=1&oh=c9b497fd527f4df09e45683e29ab82a3&oe=6027E16C'
    },
    {
      name: 'lamborghini',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/10914351_445156875637393_373836994_a.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=68MQfFBzrRMAX9yDrPp&oh=059b8ece9522801147ce86c81d25631a&oe=602881EC'
    },
    {
      name: 'pullandbear',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/119967716_168469141494754_1912290642671596029_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=xVXj9KZleKQAX_sBAH5&tp=1&oh=293f0d86a158dead8247ab2da6aaefdc&oe=60232E38'
    },
    {
      name: 'porsche',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/72477687_2436503716627621_3330394547002802176_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=eTheBcKg3FUAX_L6A7g&tp=1&oh=00baefb9e0abdb1779d2eeb63a9d5252&oe=6025F6C8'
    },
    {
      name: 'dior',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/42633985_1927008894059358_8334422696888631296_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=M7zS9McaNOcAX88S_VE&tp=1&oh=a5b071a63b71536b8eff464beaf0e10a&oe=602935F0'
    },
    {
      name: 'louisvuitton',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/914335_653223868059486_1434031198_a.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=U6vgVx_e8o4AX833F7W&oh=0339da54381d42d4f923b0c15c373397&oe=60266A46'
    },
    {
      name: 'voguemagazine',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/25024975_1053395324802105_3204556493470826496_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=42hUmjDaErAAX_rQGos&tp=1&oh=99e131336e1f9be396ce30c13775c2f9&oe=6025D940'
    },
    {
      name: 'chanelofficial',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/66505567_684858381987599_4049279537282809856_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=JlK4jzw1zM8AX9FMHuU&tp=1&oh=5eb83b40f465669d993bb6602752d4d7&oe=60271462'
    },
    {
      name: 'mercedes',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/128444312_195044392220087_2626476807974979382_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=6eukZvzDplAAX8SPuqu&tp=1&oh=e80692a5b919db2d9a3ee11dba33e643&oe=602692DC'
    },
    {
      name: 'dolcegabbana',
      image:
        'https://instagram.fcmn3-2.fna.fbcdn.net/v/t51.2885-19/s150x150/110186591_652942011965204_3898636332437750301_n.jpg?_nc_ht=instagram.fcmn3-2.fna.fbcdn.net&_nc_ohc=GEJ9i7G2bpsAX_Y9nJm&tp=1&oh=6ca512147fa1f182a965f31ae4bdb573&oe=6025FBD9'
    }
  ];

  const SliderRef = useRef<HTMLDivElement>(null);
  const ContainerRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(4);
  const [translateValue, setTranslateValue] = useState<number>(0);
  const [keepSliding, setKeepSliding] = useState<{ right: boolean; left: boolean }>({
    right: true,
    left: false
  });
  const [LeftItems, setLeftItems] = useState<number>(StoriesData.length - 4);
  const [slideButtons, setSlideButtons] = useState<{ leftButton: boolean; rightButton: boolean }>({
    leftButton: false,
    rightButton: true
  });

  const NextSlide = () => {
    if (LeftItems > currentIndex) {
      if (keepSliding.right) {
        setLeftItems(LeftItems - 4);
        setCurrentIndex(currentIndex + 4);
        setTranslateValue(currentIndex * 88);
        setSlideButtons({ leftButton: true, rightButton: true });
      }
    } else {
      if (keepSliding.right) {
        setKeepSliding({ ...keepSliding, right: true });
        if (SliderRef.current && ContainerRef.current) {
          setTranslateValue(SliderRef.current?.clientWidth - ContainerRef.current?.clientWidth);
        }
        setSlideButtons({ leftButton: true, rightButton: false });
      }
    }
  };

  const PrevSlide = () => {
    // TODO: Fix this later ...
    // if (LeftItems < currentIndex) {
    //   if (keepSliding.left) {
    //     setLeftItems(LeftItems - 4);
    //     setCurrentIndex(currentIndex + 4);
    //     setTranslateValue(currentIndex * 88);
    //     setSlideButtons({ leftButton: true, rightButton: true });
    //   }
    // } else {
    //   if (keepSliding) {
    //     setKeepSliding({...keepSliding, left:false});
    //     if (SliderRef.current && ContainerRef.current) {
    //       setTranslateValue(SliderRef.current?.clientWidth - ContainerRef.current?.clientWidth);
    //     }
    //     setSlideButtons({ leftButton: true, rightButton: false });
    //   }
    // }
  };

  return (
    <Container ref={ContainerRef}>
      <Main translateValue={translateValue} ref={SliderRef}>
        {StoriesData.map(({ name, image }, i) => (
          <Story key={i} name={name} image={image} />
        ))}
      </Main>
      {slideButtons.leftButton && (
        <PrevBtn>
          <Prev onClick={PrevSlide} />
        </PrevBtn>
      )}
      {slideButtons.rightButton && (
        <NextBtn>
          <Next onClick={NextSlide} />
        </NextBtn>
      )}
    </Container>
  );
};

export default Stories;
