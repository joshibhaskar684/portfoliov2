import {
  SiReact,
  SiNextdotjs,
  SiMysql,
  SiDocker,
  SiSpringboot,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

// Grouping skills into categories for a much cleaner UI
const skillCategories = [
  {
    title: "Frontend Development",
    skills: [
      { name: 'React.js', icon: <SiReact className="text-[#61DAFB]" /> },
      { name: 'Next.js', icon: <SiNextdotjs className="text-black dark:text-white" /> },
      { name: 'HTML5', icon: <span className="text-orange-600">🌐</span> },
      { name: 'CSS3', icon: <span className="text-blue-600">🎨</span> },
      { name: 'JavaScript', icon: <span className="text-yellow-500">JS</span> },
      { name: 'Tailwind', icon: <span className="text-cyan-500">🌊</span> },
      { name: 'Redux', icon: <span className="text-purple-600">⚛️</span> },
      { name: 'Material UI', icon: <span className="text-blue-700">MUI</span> },
    ]
  },
  {
    title: "Backend Development",
    skills: [
      { name: 'Java', icon: <FaJava className="text-orange-600" /> },
      { name: 'Spring Boot', icon: <SiSpringboot className="text-green-600" /> },
      { name: 'REST APIs', icon: <span className="text-gray-500">API</span> },
      { name: 'Microservices', icon: <span className="text-gray-500">MS</span> },
    ]
  },
  {
    title: "Databases",
    skills: [
      { name: 'MySQL', icon: <SiMysql className="text-blue-700" /> },
      { name: 'PostgreSQL', icon: <span className="text-indigo-600">🐘</span> },
      { name: 'MongoDB', icon: <span className="text-green-600">🍃</span> },
      { name: 'Redis', icon: <span className="text-red-500">⚡</span> },
      { name: 'Firebase', icon: <span className="text-yellow-500">🔥</span> },
      { name: 'Elasticsearch', icon: <span className="text-sky-600">🔎</span> },
    ]
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: 'AWS', icon: <span className="text-orange-500">☁️</span> },
      { name: 'Docker', icon: <SiDocker className="text-blue-400" /> },
      { name: 'Docker Compose', icon: <span className="text-blue-400">🐳</span> },
      { name: 'Docker Swarm', icon: <span className="text-blue-500">🐳</span> },
      { name: 'CI/CD', icon: <span className="text-gray-500">🚀</span> },
      { name: 'GitHub Actions', icon: <span className="text-black dark:text-white">⚙️</span> },
    ]
  },
  {
    title: "Tools & Version Control",
    skills: [
      { name: 'Git', icon: <span className="text-orange-600 font-bold">Git</span> },
      { name: 'GitHub', icon: <span className="text-black dark:text-white">🐙</span> },
      { name: 'Maven', icon: <span className="text-red-600 font-bold">M</span> },
      { name: 'Postman', icon: <span className="text-orange-500">📬</span> },
      { name: 'Swagger', icon: <span className="text-green-500">📄</span> },
      { name: 'Vercel', icon: <span className="text-black dark:text-white">▲</span> },
    ]
  },
  {
    title: "Security & Integrations",
    skills: [
      { name: 'OAuth2', icon: <span className="text-blue-600">🔐</span> },
      { name: 'JWT', icon: <span className="text-purple-600">🪪</span> },
      { name: 'Spring Security', icon: <span className="text-green-700">🛡️</span> },
      { name: 'Kafka', icon: <span className="text-black dark:text-white">📨</span> },
      { name: 'Razorpay', icon: <span className="text-blue-600">💳</span> },
    ]
  },
  {
    title: "Architecture & AI",
    skills: [
      { name: 'System Design', icon: <span className="text-gray-500">🏗️</span> },
      { name: 'DSA', icon: <span className="text-gray-500">🧠</span> },
      { name: 'OOP', icon: <span className="text-gray-500">🧩</span> },
      { name: 'Load Balancing', icon: <span className="text-gray-500">⚖️</span> },
      { name: 'Spring AI', icon: <span className="text-green-600">🤖</span> },
      { name: 'n8n', icon: <span className="text-red-500 text-sm font-bold">n8n</span> },
    ]
  }
];

export default function SkillPage() {
  return (
    <section id="skills" className="py-20 bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Technical <span className="text-blue-600">Skills</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise, ranging from modern frontend frameworks to robust cloud-native backend architectures.
          </p>
          <div className="h-1 w-20 bg-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Skills Grid - Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
            >
              <h3 className="text-xl font-bold mb-6 text-foreground border-b border-gray-100 dark:border-gray-800 pb-3">
                {category.title}
              </h3>
              
              {/* Individual Skill Badges */}
              <div className="flex flex-wrap gap-3 mt-auto">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg hover:-translate-y-1 hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all duration-200 cursor-default group"
                  >
                    <div className="text-xl group-hover:scale-110 transition-transform duration-200">
                      {skill.icon}
                    </div>
                    <span className="text-sm font-semibold text-foreground/80 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}