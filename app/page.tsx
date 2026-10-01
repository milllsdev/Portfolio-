import { projects, experience, skillGroups, activities } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { Portrait } from "@/components/portrait";
function Arrow({ diagonal = true }: { diagonal?: boolean }) { return <span aria-hidden="true" className="arrow">{diagonal ? "↗" : "↓"}</span>; }
function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) { return <a className="text-link" href={href} target="_blank" rel="noopener noreferrer">{children}<Arrow /><span className="sr-only"> (opens in a new tab)</span></a>; }
function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) { return <div className="section-label"><span>{number} /</span><span>{children}</span></div>; }
export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header shell">
      <a href="#home" className="wordmark" aria-label="Michel Atayi home">MA<span>.</span></a>
      <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact <Arrow /></a></nav>
    </header>
    <main id="main">
      <section id="home" className="hero shell" aria-labelledby="hero-title">
        <div className="hero-top eyebrow"><span>Michel Ayikoe Atayi</span><span className="hero-location">Based in Salisbury, NC</span></div>
        <h1 id="hero-title">Thoughtful<br />software<span className="accent">.</span><br /><span className="hero-light">Built with care.</span></h1>
        <div className="hero-bottom"><p>Computer Science Student &amp; Software Engineer<br /><span>Turning ideas into useful, considered digital experiences.</span></p><a className="text-link" href="#work">Explore selected work <Arrow diagonal={false} /></a></div>
        <div className="hero-index eyebrow"><span>Portfolio / Selected work</span><span>01 — 04</span></div>
      </section>
      <section id="work" className="work shell" aria-labelledby="work-title">
        <Reveal><SectionLabel number="01">Selected work</SectionLabel><div className="section-heading"><h2 id="work-title">Ideas into<br /><span className="serif">working software.</span></h2><p>From product intelligence to creative tools.<br />A selection of things I’ve built.</p></div></Reveal>
        {projects.map((project, index) => <Reveal key={project.name}><article className="project" aria-labelledby={project.theme + "-title"}>
          <div className={`project-art ${project.theme}`} aria-hidden="true"><div className="art-top"><span>{project.name}</span><span>{String(index + 1).padStart(2, "0")} / SELECTED WORK</span></div><div className="art-shape"><span /><span /><span /></div><div className="art-bottom"><span>{project.statement}</span><span>↗</span></div></div>
          <div className="project-details"><div><p className="eyebrow project-category">{project.category}</p><h3 id={project.theme + "-title"}>{project.name}</h3><div className="project-links">{project.github && <ExternalLink href={project.github}>GitHub</ExternalLink>}{project.live && <ExternalLink href={project.live}>Live Project</ExternalLink>}{!project.live && <span className="deployment-note">Frontend not deployed</span>}</div></div>
          <div className="project-copy"><p className="project-description">{project.description}</p>{project.highlights.length > 0 && <><h4 className="eyebrow highlights-label">Engineering highlights</h4><ul>{project.highlights.map(point => <li key={point}>{point}</li>)}</ul></>}{project.technologies.length > 0 && <ul className="technologies" aria-label="Technologies">{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>}</div></div>
        </article></Reveal>)}
      </section>
      <section id="experience" className="experience shell section-space" aria-labelledby="experience-title">
        <Reveal><SectionLabel number="02">Experience</SectionLabel><div className="section-heading"><h2 id="experience-title">Learning by<br /><span className="serif">building.</span></h2><p>Real teams. Real constraints.<br />Better software, together.</p></div></Reveal>
        {experience.map(item => <Reveal key={item.company}><article className="experience-row"><div><p className="eyebrow">{item.date}</p><h3>{item.company}</h3><p className="role">{item.role}</p><p className="muted small">{item.location}</p></div><ul>{item.points.map(point => <li key={point}>{point}</li>)}</ul></article></Reveal>)}
      </section>
      <section id="about" className="about section-space" aria-labelledby="about-title"><div className="shell"><Reveal><SectionLabel number="03">A little about me</SectionLabel><div className="about-grid"><Portrait /><div className="about-copy"><h2 id="about-title">Curious by nature.<br /><span className="serif">Engineer in progress.</span></h2><p>I’m Michel, a computer science student at Livingstone College. My work spans responsive interfaces, API integrations, AI-powered tools, and the testing that helps make software reliable.</p><p>I enjoy connecting the details of engineering with the people who use what we build.</p><div className="education"><p className="eyebrow">Education</p><h3>Livingstone College</h3><p>Bachelor of Science in Computer Science</p><p className="muted">Salisbury, North Carolina · Expected May 2029</p><p className="gpa">4.0 / 4.0 <span>GPA</span></p><h4 className="eyebrow">Relevant coursework</h4><p className="coursework">Data Structures &amp; Algorithms · Object-Oriented Programming · Discrete Mathematics · Operating Systems · Databases</p></div></div></div></Reveal></div></section>
      <section className="skills shell section-space" aria-labelledby="skills-title"><Reveal><SectionLabel number="04">Technical toolkit</SectionLabel><h2 id="skills-title">Tools of the <span className="serif">trade.</span></h2><div className="skills-grid">{skillGroups.map(group => <div key={group.title}><h3 className="eyebrow">{group.title}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div></Reveal></section>
      <section className="activities shell section-space" aria-labelledby="activities-title"><Reveal><SectionLabel number="05">Beyond the code</SectionLabel><h2 id="activities-title">Community &amp; <span className="serif">connection.</span></h2><div className="activity-list">{activities.map(activity => <article key={activity.name}><h3>{activity.name}</h3><p>{activity.role}<span>{activity.location}</span></p><p className="activity-date">August 2025 – Present</p></article>)}</div></Reveal></section>
      <section id="contact" className="contact" aria-labelledby="contact-title"><div className="shell"><Reveal><SectionLabel number="06">Get in touch</SectionLabel><h2 id="contact-title">Let’s build<br /><span className="serif">something useful.</span></h2><p>Have an opportunity, an idea, or a question? I’d love to hear from you.</p><a className="contact-email" href="mailto:atayimicheal78@gmail.com">atayimicheal78@gmail.com <Arrow /></a><div className="contact-socials"><ExternalLink href="https://www.linkedin.com/in/michel-atayi">LinkedIn</ExternalLink><ExternalLink href="https://github.com/milllsdev">GitHub</ExternalLink></div></Reveal><footer><span>© {new Date().getFullYear()} Michel Ayikoe Atayi</span><a href="#home">Back to top ↑</a></footer></div></section>
    </main>
  </>;
}
