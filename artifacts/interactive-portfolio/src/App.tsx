import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Copy, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, useRoute, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const work = [
  {
    id: '01',
    slug: 'fitops',
    name: 'FitOps',
    accent: 'OS',
    type: 'Gym management SaaS · 2026—now',
    summary: 'A full-stack gym management platform built to make fitness businesses easier to run, from leads to members.',
    quote: 'Turned a messy set of gym workflows into one calm, repeatable system with a paying gym owner already using it.',
    stat: 'active B2B subscriber',
    url: 'https://fitops.naviti.xyz/',
  },
  {
    id: '02',
    slug: 'naviti',
    name: 'Naviti',
    accent: '',
    type: 'Web agency · 2025—now',
    summary: 'A digital agency creating custom-built websites and CRM systems for local businesses.',
    quote: 'From client acquisition to deployment, I manage the full software lifecycle and keep the work close to business reality.',
    stat: 'Udaipur, India',
    url: 'https://naviti.xyz/',
  },
];

const cases = [
  {
    slug: 'fitops',
    name: 'FitOps',
    year: '01 / 04',
    eyebrow: 'FitOps / a live operating system',
    tag: 'Product · SaaS · B2B',
    headline: 'Making the daily chaos of a gym visible.',
    summary: 'A full-stack gym management platform for independent fitness businesses — shaped with a paying gym owner, not a speculative brief.',
    role: 'Founder & Lead Developer',
    duration: '2026 — present',
    url: 'https://fitops.naviti.xyz/',
    facts: ['95 active members in the live workspace', 'First paying B2B subscriber secured', 'Supabase + Firebase infrastructure'],
    chapters: [
      ['The tension', 'Gym owners were stitching leads, admissions, payments, and member follow-up across disconnected tools. The work was happening, but the business could not see its own rhythm.'],
      ['The move', 'I built one calm operating layer: responsive workflows for leads and members, plus the data surfaces that make a growing gym easier to run.'],
      ['The lesson', 'The strongest product feedback came after shipping. A real owner using the system made every next decision sharper.'],
    ],
  },
  {
    slug: 'naviti',
    name: 'Naviti',
    year: '02 / 04',
    eyebrow: 'Naviti / the studio behind the work',
    tag: 'Agency · Web · Systems',
    headline: 'A small agency with the range to go all the way.',
    summary: 'Naviti is my web development agency for local businesses that need more than a template — a sharper public presence, better workflows, and someone who owns the handoff.',
    role: 'Founder & Web Developer',
    duration: '2025 — present',
    url: 'https://naviti.xyz/',
    facts: ['Custom websites and CRM systems', 'Next.js, Vue, and Bootstrap delivery', 'Full lifecycle: acquisition to deployment'],
    chapters: [
      ['The position', 'Local businesses rarely need more software for its own sake. They need a digital presence that earns trust and an internal system that removes repeated work.'],
      ['The practice', 'I keep the distance between client, code, and outcome short. Discovery, interface, implementation, and deployment stay in the same conversation.'],
      ['The lesson', 'Good agency work is not a pile of deliverables. It is a business owner feeling more in control after the site goes live.'],
    ],
  },
  {
    slug: 'ampm-fitness',
    name: 'AMPM Fitness',
    year: '03 / 04',
    eyebrow: 'Naviti client work / AMPM Fitness',
    tag: 'CRM · Lead generation · Fitness',
    headline: 'Turning attention into a repeatable member pipeline.',
    summary: 'A public-facing fitness experience and personal CRM built around how a growing gym actually acquires, follows up with, and keeps members.',
    role: 'Founder & Web Developer',
    duration: '2025 — present',
    url: 'https://ampmfitness.vercel.app/',
    facts: ['Lead-generation experience', 'Member management workflows', 'Public website and CRM'],
    chapters: [
      ['The tension', 'The gym had energy and ambition, but the path from interested visitor to member was too dependent on memory and manual follow-up.'],
      ['The move', 'I connected the public experience to the operational reality behind it, giving the team a clearer way to see, respond to, and manage demand.'],
      ['The lesson', 'A website earns its keep when it makes the next real-world action easier — not when it only looks good in a launch post.'],
    ],
  },
  {
    slug: 'hare-krishna-trust',
    name: 'Hare Krishna Trust',
    year: '04 / 04',
    eyebrow: 'Naviti client work / Hare Krishna Trust',
    tag: 'Web · Data visualization · Charity',
    headline: 'Making service easier to understand and act on.',
    summary: 'A public-facing charity portal paired with an internal analytics dashboard for tracking, managing, and visualizing the Trust’s operations.',
    role: 'Founder & Web Developer',
    duration: '2025 — present',
    url: 'https://hare-krishna-trust.vercel.app/',
    facts: ['Public-facing charity portal', 'Internal operations dashboard', 'Metrics designed for clarity'],
    chapters: [
      ['The tension', 'The impact of a service organization can be difficult to see from the outside. The work is real, but the story and the operational signal live in different places.'],
      ['The move', 'I designed a digital home that pairs a human mission with a clearer view of the numbers behind the work.'],
      ['The lesson', 'Data visualization is not decoration. It is a way of giving a team and its supporters a shared picture of what is happening.'],
    ],
  },
];

function useReveals() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function Navigation({ theme = 'light' }: { theme?: 'light' | 'dark' } = {}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (theme === 'dark') {
        setScrolled(window.scrollY > window.innerHeight * 0.65);
      } else {
        setScrolled(window.scrollY > 24);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [theme]);
  return (
    <header className={`site-nav ${scrolled ? 'is-scrolled' : ''} ${theme === 'dark' && !scrolled ? 'nav-dark' : ''}`}>
      <a className="nav-mark" href="#top" data-testid="link-home">
        <i aria-hidden="true" /> devendra / studio
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
         <a href="/#work" data-testid="link-work">Index</a>
         <a href="/#identity" data-testid="link-about">Profile</a>
         <a href="/#contact" data-testid="link-contact">Inquiries</a>
      </nav>
      <div className="nav-availability"><b /> available for commissions</div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-content">
        <div className="eyebrow reveal"><span /> Product-minded developer / operator</div>
        <h1 className="hero-title reveal reveal-delay-1" data-testid="text-hero-title">
          I make the <em>mess</em><br />make sense.
        </h1>
        <p className="hero-copy reveal reveal-delay-2">
          I’m Devendra — a founder and full-stack developer turning hard-to-explain ideas into products people can feel, use, and come back to. Building from Udaipur, for everywhere.
        </p>
        <div className="hero-actions reveal reveal-delay-3">
          <button className="button-primary" onClick={() => scrollToSection('work')} data-testid="button-see-work">
            See the work <ArrowDown size={14} />
          </button>
          <button className="button-ghost" onClick={() => scrollToSection('contact')} data-testid="button-start-conversation">
            Start a conversation <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
      <div className="hero-aside reveal reveal-delay-2" aria-label="Product shipping console">
        <div className="hero-console">
          <div className="console-head">
            <span><b /> studio / shipping console</span>
            <small>build 026</small>
          </div>
          <div className="console-body">
            <span className="console-kicker">the useful bit</span>
            <strong>Thought →<br /><em>thing people use.</em></strong>
            <div className="console-rule"><i /><i /><i /><i /><i /></div>
            <div className="console-status">
              <span><b>01</b> find the tension</span><strong>done</strong>
              <span><b>02</b> build the smallest loop</span><strong>live</strong>
              <span><b>03</b> leave a better machine</span><strong>next</strong>
            </div>
          </div>
          <div className="console-foot">
            <span>shipping useful things</span>
            <b>↗</b>
          </div>
        </div>

        <p className="side-note">The work lives somewhere between a whiteboard and a live product.</p>
      </div>
    </section>
  );
}

function Identity() {
  return (
    <section className="section" id="identity">
      <div className="section-label reveal"><b>00</b><span /> Identity, in plain text</div>
      <div className="identity-grid">
        <aside className="identity-aside reveal">
           <p>Founder, full-stack developer, and Electrical Engineering student who likes taking products all the way from idea to market.</p>
           <p>Based in Udaipur, Rajasthan. Available for a small number of collaborations.</p>
        </aside>
        <div className="identity-copy">
          <h2 className="reveal reveal-delay-1">Not just a developer.<br /><span>A product person</span> who can code.</h2>
          <p className="reveal reveal-delay-2">
             I work where software, business, and people overlap. I’m currently studying at CTAE, Udaipur while building FitOps and running Naviti — staying close enough to the code and the customer to make ideas real.
          </p>
          <div className="principles reveal reveal-delay-3">
            <div className="principle">
              <b>01</b>
              <h3>Find the actual problem.</h3>
              <p>Not the loudest request. The one hiding underneath it.</p>
            </div>
            <div className="principle">
              <b>02</b>
              <h3>Make the first version useful.</h3>
              <p>Small enough to ship. Specific enough to teach us something.</p>
            </div>
            <div className="principle">
              <b>03</b>
              <h3>Leave a better machine.</h3>
              <p>Systems, teams, and products should compound after I leave.</p>
            </div>
          </div>
          <div className="identity-facts reveal reveal-delay-3">
            <div><span>studying</span><strong>B.Tech · CTAE Udaipur</strong></div>
            <div><span>stack</span><strong>Next.js · Node · Supabase</strong></div>
            <div><span>languages</span><strong>English · Hindi</strong></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkSection() {
  return (
    <section className="section work-section" id="work">
      <div className="section-label reveal"><b>01</b><span /> Selected work</div>
      <div className="work-intro reveal reveal-delay-1">
        <h2>Things I’ve helped<br />put into the world.</h2>
        <p>Ventures, client systems, and experiments — each one a different way of turning a loose idea into something that has to work.</p>
      </div>
      <div className="work-list">
        {cases.map((item, index) => (
          <a className={`work-card work-card-${index + 1}`} href={`/work/${item.slug}`} key={item.slug} data-testid={`card-work-${item.slug}`}>
            <div className="work-index">/{String(index + 1).padStart(2, '0')}</div>
            <div>
              <span className="work-card-eyebrow">{item.eyebrow}</span>
              <h3>{item.name}<i>{item.name === 'FitOps' ? 'OS' : ''}</i></h3>
              <p>{item.summary}</p>
            </div>
            <div className="work-meta">
              <strong>{item.tag}</strong>
              <span>read case study <ArrowUpRight size={13} /></span>
            </div>
          </a>
        ))}
      </div>
      <div className="work-count reveal reveal-delay-2"><span>04 chapters</span><span /><span>2 ventures · 2 client systems · still building</span></div>
    </section>
  );
}

function ProjectPage() {
  const [match, params] = useRoute('/work/:slug');
  const [scrolled, setScrolled] = useState(false);
  const itemIndex = cases.findIndex((project) => project.slug === params?.slug);
  const item = itemIndex !== -1 ? cases[itemIndex] : undefined;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!item) return <NotFound />;

  const nextItem = cases[(itemIndex + 1) % cases.length];
  return (
    <main className="case-page portfolio-shell">
      <Navigation theme="dark" />
      <section className="case-hero">
        <div className="case-topline"><a href="/#work"><ArrowLeft size={12} /> back to work</a><span>{item.year}</span></div>
        <div className="case-heading">
          <span className="case-eyebrow">{item.eyebrow}</span>
          <h1>{item.headline}</h1>
          <p>{item.summary}</p>
        </div>
        <div className="case-meta">
          <div><span>role</span><strong>{item.role}</strong></div>
          <div><span>duration</span><strong>{item.duration}</strong></div>
          <div><span>focus</span><strong>{item.tag}</strong></div>
          <a href={item.url} target="_blank" rel="noreferrer">visit live site <ArrowUpRight size={13} /></a>
        </div>
      </section>
      <section className="case-body">
        <div className="case-signal"><span>the short version</span><strong>{item.name} is where strategy meets the last mile of implementation.</strong></div>
        <div className="case-content">
          <div className="case-facts">{item.facts.map((fact, index) => <div key={fact}><b>0{index + 1}</b><span>{fact}</span></div>)}</div>
          <div className="case-chapters">
            {item.chapters.map(([title, copy], index) => (
              <article key={title}><span>0{index + 1}</span><div><h2>{title}</h2><p>{copy}</p></div></article>
            ))}
          </div>
        </div>
      </section>
      <section className="up-next">
        <span>Up next</span>
        <a href={`/work/${nextItem.slug}`}>
          <h2>{nextItem.name}</h2>
          <div className="up-next-arrow"><ArrowRight size={18} /></div>
        </a>
      </section>
      <footer className="case-footer"><a href="/#work"><ArrowLeft size={12} /> browse all work</a><span>© 2026 Devendra Meena / studio</span></footer>
      <div className={`floating-visit ${scrolled ? 'is-visible' : ''}`}>
        <span className="floating-name">{item.name}</span>
        <a href={item.url} target="_blank" rel="noreferrer" className="floating-button">
          visit site <ArrowUpRight size={14} />
        </a>
      </div>
    </main>
  );
}

function MethodSection() {
  const steps = [
    ['01', 'Listen for the tension', 'A kickoff is not a ceremony. It is a search for the gap between what people say and what the product needs.'],
    ['02', 'Draw the smallest loop', 'I map the moment someone arrives, acts, and gets a reason to return. Everything else can wait.'],
    ['03', 'Build close to reality', 'Real data, real constraints, real users. The interface gets clearer when the feedback gets closer.'],
    ['04', 'Stay for the handoff', 'A launch is a beginning. I leave behind decisions that are legible and a system that can keep moving.'],
  ];
  return (
    <section className="section method-section" id="method">
      <div className="section-label reveal"><b>03</b><span /> How I work</div>
      <div className="method-grid">
        <div className="method-title reveal">
          <h2>Less theatre.<br />More traction.</h2>
          <p>I’m comfortable in the fog, but I don’t romanticise it. Good process gives a team more room to be brave.</p>
        </div>
        <div className="timeline">
          {steps.map(([number, title, copy], index) => (
            <div className={`timeline-item reveal reveal-delay-${Math.min(index + 1, 3)}`} key={number}>
              <div className="timeline-no">{number}</div>
              <div><h3>{title}</h3><p>{copy}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!message.trim()) return;
    setSent(true);
  };
  const copyEmail = async () => {
    await navigator.clipboard?.writeText('devendrathecoder@gmail.com');
    setSent(true);
  };
  return (
    <section className="section contact-section" id="contact">
      <div className="section-label reveal"><b>04</b><span /> Open channel</div>
      <div className="contact-grid">
        <div className="reveal">
          <h2>Have a good<br /><span>problem?</span></h2>
          <p className="contact-intro">Tell me the version you are brave enough to build. I’ll tell you what I see.</p>
        </div>
        <div className="terminal reveal reveal-delay-1">
             <div className="terminal-bar"><i /> devendra@studio:~ / conversation</div>
          <div className="terminal-body">
            <div className="terminal-command">$ ./start-a-conversation</div>
            <p>{sent ? 'Message queued. I will be in touch soon.' : 'Leave a line. No decks required.'}</p>
            {!sent && (
              <form className="terminal-form" onSubmit={submit}>
                <span>→</span>
                <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="what are you building?" aria-label="Your message" data-testid="input-message" />
              </form>
            )}
            {sent ? <div className="terminal-success">&gt; received / thank you</div> : <button className="terminal-submit" type="submit" data-testid="button-send-message">send message ↵</button>}
          </div>
        </div>
      </div>
      <div className="contact-links reveal reveal-delay-2">
        <a href="mailto:devendrathecoder@gmail.com" data-testid="link-email"><Mail size={13} /> email</a>
        <a href="https://github.com/devendrathecoder" target="_blank" rel="noreferrer" data-testid="link-github"><Github size={13} /> github</a>
        <a href="https://www.linkedin.com/in/devendra-meena-83bab6370/" target="_blank" rel="noreferrer" data-testid="link-linkedin"><Linkedin size={13} /> linkedin</a>
        <button onClick={copyEmail} data-testid="button-copy-email"><Copy size={13} /> {sent ? 'copied' : 'copy email'}</button>
      </div>
    </section>
  );
}

function Home() {
  useReveals();
  return (
    <main className="portfolio-shell">
      <Navigation />
      <Hero />
      <div className="marquee" aria-label="Studio capabilities">
        <div className="marquee-track"><span>product strategy</span><span>interface systems</span><span>full-stack shipping</span><span>operator energy</span><span>product strategy</span><span>interface systems</span><span>full-stack shipping</span><span>operator energy</span></div>
      </div>
      <Identity />
      <WorkSection />
      <MethodSection />
      <ContactSection />
     <footer className="site-footer"><span>© 2026 Devendra Meena / studio</span><span>built with attention · Udaipur, IN</span></footer>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/work/:slug" component={ProjectPage} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;