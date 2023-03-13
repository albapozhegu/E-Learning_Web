import academyIcon from 'assets/icons/topics/academy.png';
import animalIcon from 'assets/icons/topics/animal.png';
import bodyIcon from 'assets/icons/topics/body.png';
import colorIcon from 'assets/icons/topics/color.png';
import cultureIcon from 'assets/icons/topics/culture.png';
import entertainmentIcon from 'assets/icons/topics/entertainment.png';
import excitingIcon from 'assets/icons/topics/exciting.png';
import flagIcon from 'assets/icons/topics/flag.png';
import foodIcon from 'assets/icons/topics/food.png';
import healthIcon from 'assets/icons/topics/health.png';
import hobbyIcon from 'assets/icons/topics/hobby.png';
import jobIcon from 'assets/icons/topics/job.png';
import othersIcon from 'assets/icons/topics/others.png';
import skillIcon from 'assets/icons/topics/skill.png';
import socialIcon from 'assets/icons/topics/social.png';
import spiritualityIcon from 'assets/icons/topics/spirituality.png';
import sportIcon from 'assets/icons/topics/sport.png';
import technologyIcon from 'assets/icons/topics/technology.png';
import travelIcon from 'assets/icons/topics/travel.png';
import treeIcon from 'assets/icons/topics/tree.png';
import toeicIcon from 'assets/icons/topics/toeic.png';
import ieltsIcon from 'assets/icons/topics/ielts.png';
import natureIcon from 'assets/icons/topics/nature.png';
import familyIcon from 'assets/icons/topics/family.png';
import clothesIcon from 'assets/icons/topics/clothes.png';

export const TOEIC_KEY = '20';

export const TOPICS = [
  {
    key: '0',
    title: 'Plants',
    icon: treeIcon,
  },
  {
    key: '1',
    title: 'Life',
    icon: socialIcon,
  },
  {
    key: '2',
    title: 'Health',
    icon: healthIcon,
  },
  {
    key: '3',
    title: 'Culianry',
    icon: foodIcon,
  },
  {
    key: '4',
    title: 'Culture',
    icon: cultureIcon,
  },
  {
    key: '6',
    title: 'Animals',
    icon: animalIcon,
  },
  {
    key: '7',
    title: 'Skills',
    icon: skillIcon,
  },
  {
    key: '9',
    title: 'Technology',
    icon: technologyIcon,
  },
  {
    key: '10',
    title: 'Human',
    icon: bodyIcon,
  },
  {
    key: '11',
    title: 'Job',
    icon: jobIcon,
  },
  {
    key: '12',
    title: 'Entertainment',
    icon: entertainmentIcon,
  },
  {
    key: '13',
    title: 'Hobbies',
    icon: hobbyIcon,
  },
  {
    key: '14',
    title: 'Sports',
    icon: sportIcon,
  },
  {
    key: '15',
    title: 'Travel',
    icon: travelIcon,
  },
  {
    key: '16',
    title: 'Country',
    icon: flagIcon,
  },
  {
    key: '17',
    title: 'Color',
    icon: colorIcon,
  },
  {
    key: '18',
    title: 'Faith',
    icon: spiritualityIcon,
  },
  {
    key: '19',
    title: 'Interests',
    icon: excitingIcon,
  },
  {
    key: TOEIC_KEY,
    title: 'TOEIC',
    icon: toeicIcon,
  },
  {
    key: '21',
    title: 'IELTS',
    icon: ieltsIcon,
  },
  {
    key: '23',
    title: 'Nature',
    icon: natureIcon,
  },
  {
    key: '24',
    title: 'Relationship',
    icon: familyIcon,
  },
  {
    key: '25',
    title: 'Outfit',
    icon: clothesIcon,
  },
  {
    key: '26',
    title: 'Academy',
    icon: academyIcon,
  },
  {
    key: '22',
    title: 'Others',
    icon: othersIcon,
  },
];

export const TOPIC_OPTIONS = TOPICS.map((topic) => ({
  value: topic.key,
  label: topic.title,
}));
