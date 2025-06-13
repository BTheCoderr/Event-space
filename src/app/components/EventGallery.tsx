'use client'

import { useState } from 'react'
import { Eye, Calendar, Users, X, Play, Upload, Image as ImageIcon, Video } from 'lucide-react'

interface MediaItem {
  type: 'image' | 'video'
  url: string
  thumbnail?: string
}

interface Event {
  id: string
  title: string
  date: string
  guestCount: number
  type: string
  media: MediaItem[]
  description: string
  featured: boolean
}

const events: Event[] = [
  {
    id: '1',
    title: 'Sweet 15 Elegant Celebration',
    date: '',
    guestCount: 80,
    type: 'Quinceañera/Sweet 16',
    media: [
      { type: 'image', url: '/images/gallery/sweet15blkandred/sweet15-elegant-celebration-05.jpg' },
      { type: 'image', url: '/images/gallery/sweet15blkandred/sweet15-elegant-celebration-01.jpg' },
      { type: 'image', url: '/images/gallery/sweet15blkandred/sweet15-elegant-celebration-02.jpg' },
      { type: 'image', url: '/images/gallery/sweet15blkandred/sweet15-elegant-celebration-03.jpg' },
      { type: 'image', url: '/images/gallery/sweet15blkandred/sweet15-elegant-celebration-04.jpg' },
      { type: 'image', url: '/images/gallery/sweet15blkandred/sweet15-elegant-celebration-06.jpg' }
    ],
    description: 'An elegant quinceañera celebration featuring luxurious black and gold decor, throne seating, and stunning floral arrangements. A truly magical evening celebrating this milestone birthday with style and sophistication.',
    featured: true
  },
  {
    id: '2',
    title: 'Graduation Celebration - Black & Pink',
    date: '',
    guestCount: 60,
    type: 'Graduation Party',
    media: [
      { type: 'image', url: '/images/gallery/graduationpartyblkandpink/graduation-celebration-blkpink-01.jpg' },
      { type: 'image', url: '/images/gallery/graduationpartyblkandpink/graduation-celebration-blkpink-02.jpg' },
      { type: 'image', url: '/images/gallery/graduationpartyblkandpink/graduation-celebration-blkpink-03.jpg' },
      { type: 'image', url: '/images/gallery/graduationpartyblkandpink/graduation-celebration-blkpink-04.jpg' },
      { type: 'image', url: '/images/gallery/graduationpartyblkandpink/graduation-celebration-blkpink-05.jpg' },
      { type: 'image', url: '/images/gallery/graduationpartyblkandpink/graduation-celebration-blkpink-06.jpg' },
      { type: 'image', url: '/images/gallery/graduationpartyblkandpink/graduation-celebration-blkpink-07.jpg' },
      { type: 'image', url: '/images/gallery/graduationpartyblkandpink/graduation-celebration-blkpink-08.jpg' },
      { type: 'image', url: '/images/gallery/graduationpartyblkandpink/graduation-celebration-blkpink-09.jpg' },
      { type: 'image', url: '/images/gallery/graduationpartyblkandpink/graduation-celebration-blkpink-10.jpg' },
      { type: 'image', url: '/images/gallery/graduationpartyblkandpink/graduation-celebration-blkpink-11.jpg' },
      { type: 'image', url: '/images/gallery/graduationpartyblkandpink/graduation-celebration-blkpink-12.jpg' },
      { type: 'image', url: '/images/gallery/graduationpartyblkandpink/graduation-celebration-blkpink-13.jpg' },
      { type: 'image', url: '/images/gallery/graduationpartyblkandpink/graduation-celebration-blkpink-14.jpg' }
    ],
    description: 'A stunning graduation celebration featuring elegant black and pink decor. This milestone celebration showcased sophisticated styling with balloon arrangements, custom signage, and beautiful table settings. A perfect example of how Events On Charles transforms academic achievements into memorable celebrations.',
    featured: true
  },
  {
    id: '3',
    title: 'Easter Celebration Party',
    date: '',
    guestCount: 45,
    type: 'Holiday Party',
    media: [
      { type: 'image', url: '/images/gallery/easterparty/easter-celebration-party-03.jpg' },
      { type: 'image', url: '/images/gallery/easterparty/easter-celebration-party-01.jpg' },
      { type: 'image', url: '/images/gallery/easterparty/easter-celebration-party-02.jpg' },
      { type: 'image', url: '/images/gallery/easterparty/easter-celebration-party-04.jpg' },
      { type: 'image', url: '/images/gallery/easterparty/easter-celebration-party-05.jpg' },
      { type: 'image', url: '/images/gallery/easterparty/easter-celebration-party-06.jpg' },
      { type: 'image', url: '/images/gallery/easterparty/easter-celebration-party-07.jpg' },
      { type: 'image', url: '/images/gallery/easterparty/easter-celebration-party-08.jpg' },
      { type: 'image', url: '/images/gallery/easterparty/easter-celebration-party-09.jpg' },
      { type: 'image', url: '/images/gallery/easterparty/easter-celebration-party-10.jpg' },
      { type: 'image', url: '/images/gallery/easterparty/easter-celebration-party-11.jpg' },
      { type: 'image', url: '/images/gallery/easterparty/easter-celebration-party-12.jpg' }
    ],
    description: 'A delightful Easter celebration filled with joy and festive spring decor. This holiday party featured beautiful pastel arrangements, themed decorations, and a warm family atmosphere. Events On Charles transformed the space into a perfect Easter wonderland for this special seasonal gathering.',
    featured: true
  },
  {
    id: '4',
    title: 'Kids Birthday Party Fun',
    date: '',
    guestCount: 25,
    type: 'Birthday Party',
    media: [
      { type: 'image', url: '/images/gallery/kidsbirthdayparty/kids-birthday-party-fun-01.jpg' },
      { type: 'image', url: '/images/gallery/kidsbirthdayparty/kids-birthday-party-fun-02.jpg' },
      { type: 'image', url: '/images/gallery/kidsbirthdayparty/kids-birthday-party-fun-03.jpg' },
      { type: 'image', url: '/images/gallery/kidsbirthdayparty/kids-birthday-party-fun-04.jpg' },
      { type: 'image', url: '/images/gallery/kidsbirthdayparty/kids-birthday-party-fun-05.jpg' }
    ],
    description: 'A vibrant and joyful kids birthday party filled with laughter and excitement. This colorful celebration featured fun decorations, entertaining activities, and all the elements needed for an unforgettable childhood birthday experience. Events On Charles creates magical moments that children will treasure forever.',
    featured: true
  },
  {
    id: '5',
    title: 'Sweet 16 Gold & Red Elegance',
    date: '',
    guestCount: 75,
    type: 'Quinceañera/Sweet 16',
    media: [
      { type: 'image', url: '/images/gallery/sweet15blkgldred/sweet15-gold-red-celebration-01.jpg' },
      { type: 'image', url: '/images/gallery/sweet15blkgldred/sweet15-gold-red-celebration-02.jpg' },
      { type: 'image', url: '/images/gallery/sweet15blkgldred/sweet15-gold-red-celebration-03.jpg' },
      { type: 'image', url: '/images/gallery/sweet15blkgldred/sweet15-gold-red-celebration-04.jpg' },
      { type: 'image', url: '/images/gallery/sweet15blkgldred/sweet15-gold-red-celebration-05.jpg' },
      { type: 'image', url: '/images/gallery/sweet15blkgldred/sweet15-gold-red-celebration-06.jpg' },
      { type: 'image', url: '/images/gallery/sweet15blkgldred/sweet15-gold-red-celebration-07.jpg' },
      { type: 'image', url: '/images/gallery/sweet15blkgldred/sweet15-gold-red-celebration-08.jpg' },
      { type: 'image', url: '/images/gallery/sweet15blkgldred/sweet15-gold-red-celebration-09.jpg' },
      { type: 'image', url: '/images/gallery/sweet15blkgldred/sweet15-gold-red-celebration-10.jpg' }
    ],
    description: 'A sophisticated Sweet 15 celebration featuring stunning black, gold, and red color palette. This quinceañera showcased elegant balloon arrangements, luxurious table settings, and dramatic lighting that created an unforgettable atmosphere. Events On Charles delivered a truly royal celebration befitting this important milestone.',
    featured: true
  },
  {
    id: '6',
    title: 'Happy Birthday Black & Gold Elegance',
    date: '',
    guestCount: 50,
    type: 'Birthday Party',
    media: [
      { type: 'image', url: '/images/gallery/happybirthdayblkgld/happy-birthday-black-gold-01.jpg' },
      { type: 'image', url: '/images/gallery/happybirthdayblkgld/happy-birthday-black-gold-02.jpg' },
      { type: 'image', url: '/images/gallery/happybirthdayblkgld/happy-birthday-black-gold-03.jpg' },
      { type: 'image', url: '/images/gallery/happybirthdayblkgld/happy-birthday-black-gold-04.jpg' },
      { type: 'image', url: '/images/gallery/happybirthdayblkgld/happy-birthday-black-gold-05.jpg' },
      { type: 'image', url: '/images/gallery/happybirthdayblkgld/happy-birthday-black-gold-06.jpg' },
      { type: 'image', url: '/images/gallery/happybirthdayblkgld/happy-birthday-black-gold-07.jpg' },
      { type: 'image', url: '/images/gallery/happybirthdayblkgld/happy-birthday-black-gold-08.jpg' },
      { type: 'image', url: '/images/gallery/happybirthdayblkgld/happy-birthday-black-gold-09.jpg' },
      { type: 'image', url: '/images/gallery/happybirthdayblkgld/happy-birthday-black-gold-10.jpg' },
      { type: 'image', url: '/images/gallery/happybirthdayblkgld/happy-birthday-black-gold-11.jpg' },
      { type: 'image', url: '/images/gallery/happybirthdayblkgld/happy-birthday-black-gold-12.jpg' },
      { type: 'image', url: '/images/gallery/happybirthdayblkgld/happy-birthday-black-gold-13.jpg' }
    ],
    description: 'An sophisticated adult birthday celebration featuring an elegant black and gold theme. This stylish party showcased premium balloon arrangements, luxurious table settings, and refined decorations. Events On Charles created a memorable celebration that perfectly balanced sophistication with festive birthday joy.',
    featured: true
  },
  {
    id: '7',
    title: 'Happy 40th Birthday Red & Black Celebration',
    date: '',
    guestCount: 65,
    type: 'Birthday Party',
    media: [
      { type: 'image', url: '/images/gallery/happy40thbirthdayredblk/happy-40th-birthday-redblk-01.jpg' },
      { type: 'image', url: '/images/gallery/happy40thbirthdayredblk/happy-40th-birthday-redblk-02.jpg' },
      { type: 'image', url: '/images/gallery/happy40thbirthdayredblk/happy-40th-birthday-redblk-03.jpg' },
      { type: 'image', url: '/images/gallery/happy40thbirthdayredblk/happy-40th-birthday-redblk-04.jpg' },
      { type: 'image', url: '/images/gallery/happy40thbirthdayredblk/happy-40th-birthday-redblk-05.jpg' },
      { type: 'image', url: '/images/gallery/happy40thbirthdayredblk/happy-40th-birthday-redblk-06.jpg' },
      { type: 'image', url: '/images/gallery/happy40thbirthdayredblk/happy-40th-birthday-redblk-07.jpg' }
    ],
    description: 'A spectacular 40th birthday celebration featuring a bold red and black color scheme. This milestone birthday party showcased dramatic balloon arrangements, elegant table settings, and sophisticated decorations. Events On Charles created an unforgettable celebration that perfectly honored this special milestone with style and flair.',
    featured: true
  },
  {
    id: '8',
    title: 'Baby Shower White & Pink Elegance',
    date: '',
    guestCount: 45,
    type: 'Baby Shower',
    media: [
      { type: 'image', url: '/images/gallery/birthdaypartywhitepink/birthday-party-whitepink-01.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartywhitepink/birthday-party-whitepink-02.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartywhitepink/birthday-party-whitepink-03.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartywhitepink/birthday-party-whitepink-04.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartywhitepink/birthday-party-whitepink-05.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartywhitepink/birthday-party-whitepink-06.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartywhitepink/birthday-party-whitepink-07.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartywhitepink/birthday-party-whitepink-08.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartywhitepink/birthday-party-whitepink-09.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartywhitepink/birthday-party-whitepink-10.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartywhitepink/birthday-party-whitepink-11.jpg' }
    ],
    description: 'An elegant and sophisticated baby shower featuring a classic white and pink color palette. This beautiful celebration welcomed the upcoming arrival with refined balloon arrangements, pristine table settings, and delicate floral touches. Events On Charles delivered a timeless celebration that combined elegance with joyful anticipation.',
    featured: true
  },
  {
    id: '9',
    title: 'Themed Birthday Party Celebration',
    date: '',
    guestCount: 40,
    type: 'Birthday Party',
    media: [
      { type: 'image', url: '/images/gallery/themedbirthday/themed-birthday-party-01.jpg' },
      { type: 'image', url: '/images/gallery/themedbirthday/themed-birthday-party-02.jpg' },
      { type: 'image', url: '/images/gallery/themedbirthday/themed-birthday-party-03.jpg' },
      { type: 'image', url: '/images/gallery/themedbirthday/themed-birthday-party-04.jpg' },
      { type: 'image', url: '/images/gallery/themedbirthday/themed-birthday-party-05.jpg' },
      { type: 'image', url: '/images/gallery/themedbirthday/themed-birthday-party-06.jpg' },
      { type: 'image', url: '/images/gallery/themedbirthday/themed-birthday-party-07.jpg' },
      { type: 'image', url: '/images/gallery/themedbirthday/themed-birthday-party-08.jpg' },
      { type: 'image', url: '/images/gallery/themedbirthday/themed-birthday-party-09.jpg' }
    ],
    description: 'A creative and fun-filled themed birthday party that brought imagination to life. This special celebration featured custom decorations, themed elements, and coordinated styling that perfectly matched the party theme. Events On Charles specializes in creating unique themed celebrations that make every birthday dream come true.',
    featured: true
  },
  {
    id: '10',
    title: 'Baby Shower Blue White & Silver Elegance',
    date: '',
    guestCount: 35,
    type: 'Baby Shower',
    media: [
      { type: 'image', url: '/images/gallery/babyshowerbluewhitesliver/baby-shower-bluewhitesliver-01.jpg' },
      { type: 'image', url: '/images/gallery/babyshowerbluewhitesliver/baby-shower-bluewhitesliver-02.jpg' },
      { type: 'image', url: '/images/gallery/babyshowerbluewhitesliver/baby-shower-bluewhitesliver-03.jpg' },
      { type: 'image', url: '/images/gallery/babyshowerbluewhitesliver/baby-shower-bluewhitesliver-04.jpg' },
      { type: 'image', url: '/images/gallery/babyshowerbluewhitesliver/baby-shower-bluewhitesliver-05.jpg' },
      { type: 'image', url: '/images/gallery/babyshowerbluewhitesliver/baby-shower-bluewhitesliver-06.jpg' },
      { type: 'image', url: '/images/gallery/babyshowerbluewhitesliver/baby-shower-bluewhitesliver-07.jpg' },
      { type: 'image', url: '/images/gallery/babyshowerbluewhitesliver/baby-shower-bluewhitesliver-08.jpg' },
      { type: 'image', url: '/images/gallery/babyshowerbluewhitesliver/baby-shower-bluewhitesliver-09.jpg' },
      { type: 'image', url: '/images/gallery/babyshowerbluewhitesliver/baby-shower-bluewhitesliver-10.jpg' },
      { type: 'image', url: '/images/gallery/babyshowerbluewhitesliver/baby-shower-bluewhitesliver-11.jpg' },
      { type: 'image', url: '/images/gallery/babyshowerbluewhitesliver/baby-shower-bluewhitesliver-12.jpg' },
      { type: 'image', url: '/images/gallery/babyshowerbluewhitesliver/baby-shower-bluewhitesliver-13.jpg' }
    ],
    description: 'An elegant and sophisticated baby shower featuring a beautiful blue, white, and silver color palette. This special celebration welcomed the upcoming arrival with stunning balloon arrangements, coordinated table settings, and delicate decorative touches. Events On Charles created a memorable celebration that perfectly honored this joyous milestone with style and grace.',
    featured: true
  },
  {
    id: '11',
    title: 'Minnie Mouse Birthday Themed Party',
    date: '',
    guestCount: 30,
    type: 'Birthday Party',
    media: [
      { type: 'image', url: '/images/gallery/minniebirthdaythemedparty/minnie-birthday-themed-party-01.jpg' },
      { type: 'image', url: '/images/gallery/minniebirthdaythemedparty/minnie-birthday-themed-party-02.jpg' },
      { type: 'image', url: '/images/gallery/minniebirthdaythemedparty/minnie-birthday-themed-party-03.jpg' },
      { type: 'image', url: '/images/gallery/minniebirthdaythemedparty/minnie-birthday-themed-party-04.jpg' },
      { type: 'image', url: '/images/gallery/minniebirthdaythemedparty/minnie-birthday-themed-party-05.jpg' },
      { type: 'image', url: '/images/gallery/minniebirthdaythemedparty/minnie-birthday-themed-party-06.jpg' },
      { type: 'image', url: '/images/gallery/minniebirthdaythemedparty/minnie-birthday-themed-party-07.jpg' }
    ],
    description: 'A magical Minnie Mouse themed birthday party that brought Disney magic to life! This delightful celebration featured adorable Minnie Mouse decorations, themed table settings, and playful elements that created a perfect party atmosphere for young Disney fans. Events On Charles specializes in creating enchanting themed celebrations that make childhood dreams come true.',
    featured: true
  },
  {
    id: '12',
    title: 'Birthday Party Black & Bronze Elegance',
    date: '',
    guestCount: 65,
    type: 'Birthday Party',
    media: [
      { type: 'image', url: '/images/gallery/birthdaypartyblkandbronze/birthday-party-blkbronze-01.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartyblkandbronze/birthday-party-blkbronze-02.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartyblkandbronze/birthday-party-blkbronze-03.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartyblkandbronze/birthday-party-blkbronze-04.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartyblkandbronze/birthday-party-blkbronze-05.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartyblkandbronze/birthday-party-blkbronze-06.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartyblkandbronze/birthday-party-blkbronze-07.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartyblkandbronze/birthday-party-blkbronze-08.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartyblkandbronze/birthday-party-blkbronze-09.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartyblkandbronze/birthday-party-blkbronze-10.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartyblkandbronze/birthday-party-blkbronze-11.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartyblkandbronze/birthday-party-blkbronze-12.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartyblkandbronze/birthday-party-blkbronze-13.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartyblkandbronze/birthday-party-blkbronze-14.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartyblkandbronze/birthday-party-blkbronze-15.jpg' }
    ],
    description: 'A sophisticated birthday celebration featuring an elegant black and bronze color palette. This stylish party showcased luxurious balloon arrangements, metallic accents, and refined decorations that created a glamorous atmosphere. Events On Charles delivered a memorable celebration that perfectly balanced elegance with festive birthday joy.',
    featured: true
  },
  {
    id: '13',
    title: 'Birthday Party Blue White & Gold Elegance',
    date: '',
    guestCount: 55,
    type: 'Birthday Party',
    media: [
      { type: 'image', url: '/images/gallery/birthdaypartybluewhitegold/birthday-party-bluewhitegold-01.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartybluewhitegold/birthday-party-bluewhitegold-02.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartybluewhitegold/birthday-party-bluewhitegold-03.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartybluewhitegold/birthday-party-bluewhitegold-04.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartybluewhitegold/birthday-party-bluewhitegold-05.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartybluewhitegold/birthday-party-bluewhitegold-06.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartybluewhitegold/birthday-party-bluewhitegold-07.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartybluewhitegold/birthday-party-bluewhitegold-08.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartybluewhitegold/birthday-party-bluewhitegold-09.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartybluewhitegold/birthday-party-bluewhitegold-10.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartybluewhitegold/birthday-party-bluewhitegold-11.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartybluewhitegold/birthday-party-bluewhitegold-12.jpg' }
    ],
    description: 'A stunning birthday celebration featuring a beautiful blue, white, and gold color scheme. This elegant party showcased sophisticated balloon arrangements, coordinated table settings, and luxurious gold accents that created a regal atmosphere. Events On Charles created a memorable celebration that combined classic elegance with festive birthday spirit.',
    featured: true
  },
  {
    id: '14',
    title: 'Halloween Theme Party Celebration',
    date: '',
    guestCount: 40,
    type: 'Holiday Party',
    media: [
      { type: 'image', url: '/images/gallery/halloweenthemeparty/halloween-theme-party-01.jpg' },
      { type: 'image', url: '/images/gallery/halloweenthemeparty/halloween-theme-party-02.jpg' },
      { type: 'image', url: '/images/gallery/halloweenthemeparty/halloween-theme-party-03.jpg' },
      { type: 'image', url: '/images/gallery/halloweenthemeparty/halloween-theme-party-04.jpg' },
      { type: 'image', url: '/images/gallery/halloweenthemeparty/halloween-theme-party-05.jpg' },
      { type: 'image', url: '/images/gallery/halloweenthemeparty/halloween-theme-party-06.jpg' },
      { type: 'image', url: '/images/gallery/halloweenthemeparty/halloween-theme-party-07.jpg' },
      { type: 'image', url: '/images/gallery/halloweenthemeparty/halloween-theme-party-08.jpg' },
      { type: 'image', url: '/images/gallery/halloweenthemeparty/halloween-theme-party-09.jpg' },
      { type: 'image', url: '/images/gallery/halloweenthemeparty/halloween-theme-party-10.jpg' }
    ],
    description: 'A spooktacular Halloween themed party that brought the spirit of the season to life! This festive celebration featured creative Halloween decorations, themed elements, and atmospheric lighting that created the perfect spooky ambiance. Events On Charles specializes in creating memorable seasonal celebrations that capture the magic of every holiday.',
    featured: true
  },
  {
    id: '15',
    title: 'Animal Themed Baby Shower',
    date: '',
    guestCount: 50,
    type: 'Baby Shower',
    media: [
      { type: 'image', url: '/images/gallery/animalthemedbabyshower/animal-themed-babyshower-01.jpg' },
      { type: 'image', url: '/images/gallery/animalthemedbabyshower/animal-themed-babyshower-02.jpg' },
      { type: 'image', url: '/images/gallery/animalthemedbabyshower/animal-themed-babyshower-03.jpg' },
      { type: 'image', url: '/images/gallery/animalthemedbabyshower/animal-themed-babyshower-04.jpg' },
      { type: 'image', url: '/images/gallery/animalthemedbabyshower/animal-themed-babyshower-05.jpg' },
      { type: 'image', url: '/images/gallery/animalthemedbabyshower/animal-themed-babyshower-06.jpg' },
      { type: 'image', url: '/images/gallery/animalthemedbabyshower/animal-themed-babyshower-07.jpg' },
      { type: 'image', url: '/images/gallery/animalthemedbabyshower/animal-themed-babyshower-08.jpg' },
      { type: 'image', url: '/images/gallery/animalthemedbabyshower/animal-themed-babyshower-09.jpg' },
      { type: 'image', url: '/images/gallery/animalthemedbabyshower/animal-themed-babyshower-10.jpg' },
      { type: 'image', url: '/images/gallery/animalthemedbabyshower/animal-themed-babyshower-11.jpg' },
      { type: 'image', url: '/images/gallery/animalthemedbabyshower/animal-themed-babyshower-12.jpg' },
      { type: 'image', url: '/images/gallery/animalthemedbabyshower/animal-themed-babyshower-13.jpg' },
      { type: 'image', url: '/images/gallery/animalthemedbabyshower/animal-themed-babyshower-14.jpg' },
      { type: 'image', url: '/images/gallery/animalthemedbabyshower/animal-themed-babyshower-15.jpg' },
      { type: 'image', url: '/images/gallery/animalthemedbabyshower/animal-themed-babyshower-16.jpg' },
      { type: 'image', url: '/images/gallery/animalthemedbabyshower/animal-themed-babyshower-17.jpg' }
    ],
    description: 'An adorable animal themed baby shower that brought the wild kingdom to life! This charming celebration featured cute animal decorations, safari-inspired elements, and playful touches that created a perfect jungle adventure atmosphere. Events On Charles created a memorable celebration that perfectly captured the joy and excitement of welcoming a new little one.',
    featured: true
  },
  {
    id: '16',
    title: 'Race Car Theme Kids Birthday Party',
    date: '',
    guestCount: 25,
    type: 'Birthday Party',
    media: [
      { type: 'image', url: '/images/gallery/racecarthemekidsbirthday/racecar-theme-kids-birthday-01.jpg' },
      { type: 'image', url: '/images/gallery/racecarthemekidsbirthday/racecar-theme-kids-birthday-02.jpg' },
      { type: 'image', url: '/images/gallery/racecarthemekidsbirthday/racecar-theme-kids-birthday-03.jpg' },
      { type: 'image', url: '/images/gallery/racecarthemekidsbirthday/racecar-theme-kids-birthday-04.jpg' },
      { type: 'image', url: '/images/gallery/racecarthemekidsbirthday/racecar-theme-kids-birthday-05.jpg' },
      { type: 'image', url: '/images/gallery/racecarthemekidsbirthday/racecar-theme-kids-birthday-06.jpg' },
      { type: 'image', url: '/images/gallery/racecarthemekidsbirthday/racecar-theme-kids-birthday-07.jpg' },
      { type: 'image', url: '/images/gallery/racecarthemekidsbirthday/racecar-theme-kids-birthday-08.jpg' },
      { type: 'image', url: '/images/gallery/racecarthemekidsbirthday/racecar-theme-kids-birthday-09.jpg' }
    ],
    description: 'A high-speed race car themed birthday party that brought the excitement of the racetrack to life! This thrilling celebration featured racing decorations, checkered flag elements, and automotive-inspired touches that created the perfect speedway atmosphere. Events On Charles delivered an action-packed celebration that had young racing fans revving with excitement.',
    featured: true
  },
  {
    id: '17',
    title: 'Birthday Party Celebration',
    date: '',
    guestCount: 45,
    type: 'Birthday Party',
    media: [
      { type: 'image', url: '/images/gallery/birthdayparty/birthday-party-celebration-01.jpg' },
      { type: 'image', url: '/images/gallery/birthdayparty/birthday-party-celebration-02.jpg' },
      { type: 'image', url: '/images/gallery/birthdayparty/birthday-party-celebration-03.jpg' },
      { type: 'image', url: '/images/gallery/birthdayparty/birthday-party-celebration-04.jpg' },
      { type: 'image', url: '/images/gallery/birthdayparty/birthday-party-celebration-05.jpg' },
      { type: 'image', url: '/images/gallery/birthdayparty/birthday-party-celebration-06.jpg' },
      { type: 'image', url: '/images/gallery/birthdayparty/birthday-party-celebration-07.jpg' }
    ],
    description: 'A classic birthday party celebration that captured the joy and excitement of a special day! This festive gathering featured beautiful decorations, coordinated styling, and all the elements needed for a memorable birthday experience. Events On Charles created a perfect celebration that brought smiles and happiness to everyone in attendance.',
    featured: true
  },
  {
    id: '18',
    title: 'Birthday Party Black & Gold Celebration',
    date: '',
    guestCount: 50,
    type: 'Birthday Party',
    media: [
      { type: 'image', url: '/images/gallery/birthdaypartyblkgld/birthday-party-black-gold-01.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartyblkgld/birthday-party-black-gold-02.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartyblkgld/birthday-party-black-gold-03.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartyblkgld/birthday-party-black-gold-04.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartyblkgld/birthday-party-black-gold-05.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartyblkgld/birthday-party-black-gold-06.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartyblkgld/birthday-party-black-gold-07.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartyblkgld/birthday-party-black-gold-08.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartyblkgld/birthday-party-black-gold-09.jpg' },
      { type: 'image', url: '/images/gallery/birthdaypartyblkgld/birthday-party-black-gold-10.jpg' }
    ],
    description: 'An elegant birthday party celebration featuring a sophisticated black and gold color scheme. This stylish celebration showcased luxurious balloon arrangements, coordinated table settings, and refined decorations that created a glamorous atmosphere. Events On Charles delivered a memorable birthday experience that perfectly balanced elegance with festive joy.',
    featured: true
  }
]

const eventTypes = [
  'All', 
  'Wedding', 
  'Quinceañera/Sweet 16', 
  'Corporate Event', 
  'Birthday Party', 
  'Anniversary', 
  'Baby Shower',
  'Bridal Shower',
  'Engagement Party',
  'Graduation Party',
  'Holiday Party',
  'Retirement Party',
  'Memorial Service',
  'Religious Ceremony',
  'Networking Event',
  'Product Launch',
  'Gala/Fundraiser',
  'Reunion',
  'Fashion Show',
  'Art Exhibition'
]

export default function EventGallery() {
  const [selectedType, setSelectedType] = useState('All')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [showUploadModal, setShowUploadModal] = useState(false)

  const filteredEvents = selectedType === 'All' 
    ? events 
    : events.filter(event => event.type === selectedType)

  const openEventModal = (event: Event) => {
    setSelectedEvent(event)
    setCurrentMediaIndex(0)
  }

  const closeModal = () => {
    setSelectedEvent(null)
    setCurrentMediaIndex(0)
  }

  const nextMedia = () => {
    if (selectedEvent) {
      setCurrentMediaIndex((prev) => 
        prev === selectedEvent.media.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevMedia = () => {
    if (selectedEvent) {
      setCurrentMediaIndex((prev) => 
        prev === 0 ? selectedEvent.media.length - 1 : prev - 1
      )
    }
  }

  const getMediaCounts = (event: Event) => {
    const images = event.media.filter(item => item.type === 'image').length
    const videos = event.media.filter(item => item.type === 'video').length
    return { images, videos }
  }

  const getCurrentMedia = () => {
    if (!selectedEvent) return null
    return selectedEvent.media[currentMediaIndex]
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header with Upload Button */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-4">Filter by Event Type:</h3>
            <div className="flex flex-wrap gap-2">
              {eventTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                    selectedType === type
                      ? 'bg-yellow-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2 self-start"
          >
            <Upload className="w-4 h-4" />
            <span>Add Media</span>
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => {
          const { images, videos } = getMediaCounts(event)
          const coverMedia = event.media[0]
          
          return (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => openEventModal(event)}
            >
              <div className="relative">
                {coverMedia.type === 'video' ? (
                  <div className="relative">
                    <img
                      src={coverMedia.thumbnail || coverMedia.url}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>
                ) : (
                  <img
                    src={coverMedia.url}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                
                {event.featured && (
                  <div className="absolute top-2 left-2 bg-yellow-600 text-white px-2 py-1 rounded text-xs font-medium">
                    Featured
                  </div>
                )}
                
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  <div className="flex items-center space-x-2">
                    {images > 0 && (
                      <span className="flex items-center space-x-1">
                        <ImageIcon className="w-3 h-3" />
                        <span>{images}</span>
                      </span>
                    )}
                    {videos > 0 && (
                      <span className="flex items-center space-x-1">
                        <Video className="w-3 h-3" />
                        <span>{videos}</span>
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity" />
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date ? new Date(event.date).toLocaleDateString() : 'Recent Event'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{event.guestCount} guests</span>
                  </div>
                </div>
                <span className="inline-block bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs font-medium">
                  {event.type}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">{selectedEvent.title}</h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Carousel */}
            <div className="relative">
              {getCurrentMedia()?.type === 'video' ? (
                <video
                  src={getCurrentMedia()?.url}
                  className="w-full h-96 object-cover"
                  controls
                  poster={getCurrentMedia()?.thumbnail}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={getCurrentMedia()?.url}
                  alt={`${selectedEvent.title} - Media ${currentMediaIndex + 1}`}
                  className="w-full h-96 object-contain bg-gray-100"
                />
              )}
              
              {selectedEvent.media.length > 1 && (
                <>
                  <button
                    onClick={prevMedia}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextMedia}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
                  >
                    →
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {selectedEvent.media.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentMediaIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentMediaIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
              
              {/* Media Type Indicator */}
              <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                {getCurrentMedia()?.type === 'video' ? (
                  <>
                    <Video className="w-3 h-3" />
                    <span>Video</span>
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-3 h-3" />
                    <span>Photo</span>
                  </>
                )}
                <span>({currentMediaIndex + 1}/{selectedEvent.media.length})</span>
              </div>
            </div>

            {/* Event Details */}
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-yellow-600" />
                  <span>{selectedEvent.date ? new Date(selectedEvent.date).toLocaleDateString() : 'Recent Event'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-yellow-600" />
                  <span>{selectedEvent.guestCount} guests</span>
                </div>
                <span className="inline-block bg-yellow-100 text-yellow-600 px-3 py-1 rounded font-medium">
                  {selectedEvent.type}
                </span>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-4">{selectedEvent.description}</p>
              
              {/* Media Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold mb-2">Media Gallery</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <ImageIcon className="w-4 h-4" />
                    <span>{getMediaCounts(selectedEvent).images} Photos</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Video className="w-4 h-4" />
                    <span>{getMediaCounts(selectedEvent).videos} Videos</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <button className="w-full bg-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-yellow-700 transition-colors">
                  Book Similar Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Add Event Media</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drag and drop your videos and photos here</p>
                <p className="text-sm text-gray-500 mb-4">Supports: MP4, MOV, JPG, PNG (Max 100MB per file)</p>
                <button className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                  Choose Files
                </button>
              </div>
              
              <div className="text-sm text-gray-600">
                <p><strong>Tips for best results:</strong></p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Videos should be 1080p or higher resolution</li>
                  <li>Keep video files under 100MB for faster loading</li>
                  <li>Include both wide shots and detail shots of your events</li>
                  <li>Good lighting and stable footage work best</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 