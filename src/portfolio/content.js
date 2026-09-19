import resume from '../data/resume.json';
import blog from '../data/blog.json';
import graingerLogo from '../assets/grainger.png';
import dellLogo from '../assets/dell.png';
import indianaLogo from '../assets/Indiana.png';
import manipalLogo from '../assets/Manipal.png';
import gitImage from '../assets/git.webp';
import aiGuardiansImage from '../assets/ai_guardians.webp';

export { resume };

export const SCHOLAR_URL = resume.external_links.google_scholar;

export const socials = [
  { label: 'LinkedIn', href: resume.contact.linkedin, kind: 'linkedin' },
  { label: 'GitHub', href: resume.contact.github, kind: 'github' },
  { label: 'Google Scholar', href: SCHOLAR_URL, kind: 'scholar' },
  { label: 'Email', href: `mailto:${resume.contact.email}`, kind: 'email' },
];

export const roles = [
  'Machine Learning Scientist',
  'AI Engineer',
  'Generative AI Specialist',
  'Recommendation Systems',
];

export const about = {
  // Original copy, split so the scroll reveal can light it up word by word.
  lead:
    "Hey everyone, I'm Immanuel Savio, people call me Manny. I've been in the machine learning space for the last 8 years, starting all the way from Fourier transforms in MATLAB to all the LLMs we have today.",
  body: [
    "I love making computers think and teaching them to predict the future. It's pretty wild seeing models actually work and do cool stuff in the real world.",
    'Hit me up if you want to collaborate on something cool or if you just want to talk tech and AI. Always down for a good conversation. Cheers!',
  ],
  facts: [
    'Based in Chicago, Illinois',
    '4+ years of professional experience and over 8+ years in AI',
    'Always learning, always building',
  ],
};

const companyLogos = { 'W.W. Grainger': graingerLogo, 'Dell Technologies': dellLogo };
const schoolLogos = { 'Indiana University Bloomington': indianaLogo, 'Sikkim Manipal University': manipalLogo };

// Flatten roles so each one can be its own stacked card.
export const experience = resume.experience.flatMap((company) =>
  company.roles.map((role) => {
    const [title, team] = role.title.split(' | ');
    return {
      ...role,
      title,
      team: team ?? null,
      company: company.company,
      logo: companyLogos[company.company],
    };
  }),
);

export const education = resume.education.map((e) => ({ ...e, logo: schoolLogos[e.institution] }));

export const patents = resume.authorized_patents;

export const projects = resume.projects.map((p) => {
  const [title, subtitle] = p.title.split(': ');
  return { ...p, title, subtitle: subtitle ?? null, link: p.link && p.link !== '#' ? p.link : null };
});

export const publications = [...resume.publications].sort((a, b) => (b.citations ?? 0) - (a.citations ?? 0));

export const totalCitations = resume.publications.reduce((sum, p) => sum + (p.citations ?? 0), 0);

export const skills = [
  { title: 'Specializations', items: resume.profile_summary.specializations },
  { title: 'Languages & Frameworks', items: resume.profile_summary.languages_frameworks },
  { title: 'Platforms & Tools', items: resume.profile_summary.platforms_tools },
  { title: 'Core Competencies', items: resume.profile_summary.core_competencies },
];

export const talk = {
  event: 'AI4 2024',
  place: 'Las Vegas, NV',
  year: '2024',
  youtubeId: '2Ika2I8Jxl4',
  url: 'https://youtu.be/2Ika2I8Jxl4',
};

const blogImages = { 'git-zero-to-hero': gitImage, 'ai-guardians': aiGuardiansImage };

export const posts = [...blog]
  .map((p) => ({ ...p, cover: blogImages[p.id] || p.image }))
  .sort((a, b) => b.date.localeCompare(a.date));

export const formatDate = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

// Home sections, in page order. Ids are stable anchors (kept from the old site).
export const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'publications', label: 'Research' },
  { id: 'talks', label: 'Talks' },
  { id: 'contact', label: 'Contact' },
];
