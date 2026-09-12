import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROJECTS, getProject } from '@/data/portfolio';
import SpecularButton from '@/components/reactbits/SpecularButton';
import styles from './project.module.css';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const project = getProject(params.slug);
  if (!project) return { title: 'Project' };
  return {
    title: project.name,
    description: project.idea,
  };
}

export default function ProjectPage({ params }) {
  const project = getProject(params.slug);
  if (!project) return notFound();

  const idx = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  const CASE = [
    { label: 'The Idea', body: project.idea },
    { label: 'The Approach', body: project.approach },
    { label: 'The Work', body: project.work },
    { label: 'The Result', body: project.result },
  ];

  return (
    <article>
      <header className={styles.hero} style={{ '--pc': project.color }}>
        <div className="container">
          <Link href="/portfolio" className={styles.back}>← All work</Link>
          <p className="eyebrow" style={{ marginTop: '1.5rem' }}>{project.category} · {project.year}</p>
          <h1 className={styles.title}>{project.name}</h1>
          <p className={styles.client}>For {project.client}</p>
          <div className={styles.disciplines}>
            {project.disciplines?.map((d) => <span key={d}>{d}</span>)}
          </div>
        </div>
      </header>

      <div className={styles.cover}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.cover} alt={project.name} />
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.caseGrid}>
            {CASE.map((c) => (
              <div key={c.label} className={styles.caseBlock}>
                <h2 className={styles.caseLabel}>{c.label}</h2>
                <p className={styles.caseBody}>{c.body}</p>
              </div>
            ))}
          </div>

          {project.tools?.length > 0 && (
            <div className={styles.tools}>
              <span className={styles.toolsLabel}>Tools</span>
              <div className={styles.toolList}>
                {project.tools.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>
          )}

          {project.gallery?.length > 1 && (
            <div className={styles.gallery}>
              {project.gallery.map((g, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={g} alt={`${project.name} ${i + 1}`} loading="lazy" />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={styles.next}>
        <div className="container">
          <p className="eyebrow">Next project</p>
          <Link href={`/portfolio/${next.slug}`} className={styles.nextLink}>{next.name} →</Link>
          <div style={{ marginTop: '2rem' }}>
            <SpecularButton href="/contact" variant="accent">Start your project</SpecularButton>
          </div>
        </div>
      </section>
    </article>
  );
}
