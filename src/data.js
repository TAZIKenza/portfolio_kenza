// ✏️ EDIT YOUR INFO HERE
export const profile = {
  firstName: 'Kenza',
  lastName: 'Tazi',
  title: 'Software Engineering Student · AI & Big Data',
  status: 'Open to an end-of-studies internship in 2027',
  intro:
    'Fifth-year Data & Artificial Intelligence student at EMSI Casablanca. I design data-driven solutions that turn information into actionable value, and I want to contribute to data science and AI projects through analysis and intelligent systems.',
  email: 'kenzatazi91@gmail.com',
  linkedin: 'https://linkedin.com/in/kenzatazi04',
  github: 'https://github.com/TAZIKenza',
  location: 'Casablanca, Morocco',
  cv: '/cv/TAZI_Kenza_CV.pdf', // remplace le fichier dans public/cv/ pour changer ton CV
}

export const education = [
  {
    title: 'Engineering Degree in Computer Science, Data & AI (5th year)',
    place: 'École Marocaine des Sciences de l’Ingénieur (EMSI)',
    date: '10/2024 – Present',
  },
  {
    title: 'Preparatory Cycle in Sciences',
    place: 'École Marocaine des Sciences de l’Ingénieur (EMSI)',
    date: '10/2022 – 06/2024',
  },
  {
    title: 'International Baccalaureate, Mathematical Sciences B',
    place: 'Groupe scolaire Bourgogne',
    date: '09/2021 – 06/2022',
  },
]

export const experience = [
  {
    role: 'Treasury Reporting Intern (Power BI)',
    company: 'Sonasid',
    date: '07/2026 – 08/2026',
    text: 'Built a Power BI platform to monitor and manage treasury. Data architecture and modeling (26 tables), Power Query transformations, complex DAX measures, and 12 analytical dashboards (Cash Forecasts, Bank Performance, GAP Analysis, FX Positions). Deployed the solution in production and validated it with the business.',
  },
  {
    role: 'Business Intelligence Intern (Power BI)',
    company: 'Sonasid',
    date: '07/2025',
    text: 'Built management-control dashboards (sales analysis, KPIs, dynamic visualizations) and designed a treasury forecasting report together with a treasurer. Contributed to structuring the data and setting up financial decision-support tools.',
  },
  {
    role: 'Career Center Ambassador',
    company: 'EMSI',
    date: '10/2024 – Present',
    text: 'Helped organize events related to professional integration, including a career forum, contributing to coordination and to the smooth running of activities.',
  },
]

export const projects = [
  {
    name: 'PrepAI · Intelligent Interview Simulator',
    year: '2026',
    stack: ['Python', 'React (Vite)', 'Deep Learning'],
    text: 'An interview simulation system where candidates practice and get complete feedback on their performance. It analyzes answers, facial expressions, voice and body language, then generates a detailed evaluation report.',
    github: 'https://github.com/TAZIKenza', // ← colle ici le lien du repo de ce projet
    demo: '', // optionnel : lien de démo
  },
  {
    name: 'RAG Question-Answering System',
    year: '2026',
    stack: ['Python', 'LLM', 'LangChain'],
    text: 'A question-answering system to query documents with a language model, built on a RAG architecture that combines retrieval of relevant context with coherent answer generation by an LLM.',
    github: 'https://github.com/TAZIKenza', // ← colle ici le lien du repo de ce projet
    demo: '', // optionnel : lien de démo
  },
  {
    name: 'LapMatch · Laptop Recommendation App',
    year: '2025',
    stack: ['React Native', 'FastAPI', 'Neo4j'],
    text: 'A mobile app that recommends laptops based on users’ needs and budget. Includes data collection through scraping, a Neo4j graph database, and a filtering and performance-comparison system to improve recommendation relevance.',
    github: 'https://github.com/TAZIKenza', // ← colle ici le lien du repo de ce projet
    demo: '', // optionnel : lien de démo
  },
]

export const skills = [
  { group: 'Data & AI', icon: 'ai', items: ['Python', 'Machine Learning (Scikit-learn)', 'Deep Learning (CNN)', 'NLP (Transformers)', 'LLM', 'RAG', 'Power BI'] },
  { group: 'Development & APIs', icon: 'dev', items: ['JavaScript', 'Java', 'C#', 'FastAPI', 'REST API', 'Symfony', 'SQL (PostgreSQL, MySQL)', 'NoSQL (MongoDB)', 'Neo4j'] },
  { group: 'Tools & Software Engineering', icon: 'tools', items: ['Excel', 'Git/GitHub', 'Docker', 'Linux', 'Postman'] },
  { group: 'Embedded & IoT', icon: 'iot', items: ['C/C++', 'Arduino'] },
]

export const certifications = [
  { name: 'AI for Detection of Anomalies (XGBoost, Autoencoders, GANs)', issuer: 'NVIDIA', year: '2026', image: 'public/certificates/images.png', link: 'https://www.linkedin.com/in/kenzatazi04/' },
  { name: 'Using Python to Access Web Data', issuer: 'University of Michigan', year: '2025', image: '', link: '' },
]

export const soft = ['Clear, professional communication', 'Teamwork', 'Analytical thinking']
export const languages = ['Arabic (native)', 'French (fluent)', 'English (technical)']
