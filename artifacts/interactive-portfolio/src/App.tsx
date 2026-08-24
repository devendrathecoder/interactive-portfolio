import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowDown, ArrowUpRight, Copy, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import fitopsDashboard from '@assets/image_1787498583881.png';
import fitopsDashboardCompact from '@assets/image_1787498602914.png';
import ampmProject from '@assets/image_1787498674176.png';
import navitiProject from '@assets/image_1787498699704.png';
import hareKrishnaProject from '@assets/image_1787498711071.png';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const work = [
  {
    id: '01',
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
    name: 'Naviti',
    accent: '',
    type: 'Web agency · 2025—now',
    summary: 'A digital agency creating custom-built websites and CRM systems for local businesses.',
    quote: 'From client acquisition to deployment, I manage the full software lifecycle and keep the work close to business reality.',
    stat: 'Udaipur, India',
    url: 'https://naviti.xyz/',
  },
];

const proof = [
  {
    name: 'AMPM Fitness',
    year: '01 / 03',
    mark: 'AMPM',
    tag: 'Growth + systems',
    quote: 'A custom CRM and lead-generation system designed around the real rhythm of a growing fitness business.',
    detail: 'Custom CRM, lead generation, and member management.',
    image: ampmProject,
    url: 'https://ampmfitness.vercel.app/',
  },
  {
    name: 'Hare Krishna Trust',
    year: '02 / 02',
    mark: 'HKT',
    tag: 'Digital home',
    quote: 'A public-facing website and analytics dashboard making the Trust’s operations easier to understand and act on.',
    detail: 'Web experience, data visualization, and analytics.',
    image: hareKrishnaProject,
    url: 'https://hare-krishna-trust.vercel.app/',
  },
  {
    name: 'Naviti',
    year: '03 / 03',
    mark: 'NAV',
    tag: 'Agency platform',
    quote: 'A sharp digital home for the agency behind the work — built to turn technical capability into clear business momentum.',
    detail: 'Brand site, service narrative, and conversion experience.',
    image: navitiProject,
    url: 'https://naviti.xyz/',
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

function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="nav-mark" href="#top" onClick={close} data-testid="link-home">
        <i aria-hidden="true" /> devendra / studio
      </a>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} data-testid="button-toggle-menu">
        {open ? <X size={15} /> : <Menu size={15} />} menu
      </button>
      <nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Primary navigation">
        <a href="#work" onClick={close} data-testid="link-work">Work</a>
        <a href="#proof" onClick={close} data-testid="link-proof">Proof</a>
        <a href="#method" onClick={close} data-testid="link-method">Method</a>
        <a href="#contact" onClick={close} data-testid="link-contact">Contact</a>
      </nav>
      <div className="nav-availability"><b /> taking on 1 good problem</div>
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
      <div className="hero-aside reveal reveal-delay-2" aria-label="Studio mark">
        <div className="hero-orbit" />
        <div className="hero-stamp">
          <strong>ship<br />useful<br />things</strong>
           <small>since 2025 · IN</small>
        </div>
        <div className="hero-signal hero-signal-top">
          <span>01 / role</span>
          <strong>founder<br />+ builder</strong>
        </div>
        <div className="hero-signal hero-signal-bottom">
          <span>live from</span>
          <strong>Udaipur →<br />everywhere</strong>
        </div>
        <div className="hero-stack-note">
          <span>currently using</span>
          <b>Next.js</b><b>Node</b><b>Supabase</b>
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
  const [active, setActive] = useState<string | null>(null);
  return (
    <section className="section work-section" id="work">
      <div className="section-label reveal"><b>01</b><span /> Selected work</div>
      <div className="work-intro reveal reveal-delay-1">
        <h2>Things I’ve helped<br />put into the world.</h2>
        <p>Two ongoing ventures, different surfaces, the same obsession with making the complicated feel obvious.</p>
      </div>
      <div className="work-list">
        {work.map((item, index) => (
          <div
            className={`work-card ${active === item.id ? 'is-active' : ''}`}
            key={item.id}
            onClick={() => setActive(active === item.id ? null : item.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setActive(active === item.id ? null : item.id); }}
            data-testid={`card-work-${item.id}`}
          >
            <div className="work-index">/{item.id}</div>
            <div>
              <h3>{item.name}<i>{item.accent}</i></h3>
              <p>{item.summary}</p>
            </div>
            <div className="work-meta">
              <strong>{item.type}</strong>
              <span>{active === item.id ? 'close detail' : 'open detail'} <ArrowUpRight size={13} /></span>
              {item.url && (
                <a
                  className="work-live"
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  visit live site <ArrowUpRight size={12} />
                </a>
              )}
            </div>
            {active === item.id && (
              <div className="work-detail">
                <blockquote>“{item.quote}”</blockquote>
                <div className="detail-stat"><span>signal</span><strong>{item.stat}</strong></div>
                {item.id === '01' && (
                  <div className="fitops-preview" aria-label="FitOps dashboard demo preview">
                    <div className="fitops-preview-head">
                      <span><b /> FitOps / dashboard preview</span>
                      <small>demo data · 2026</small>
                    </div>
                    <div className="fitops-preview-grid">
                      <div className="fitops-screen fitops-screen-main">
                        <img src={fitopsDashboard} alt="FitOps gym management dashboard with demo metrics and revenue chart" />
                      </div>
                      <div className="fitops-screen fitops-screen-secondary">
                        <img src={fitopsDashboardCompact} alt="FitOps compact gym dashboard view with demo metrics" />
                      </div>
                    </div>
                    <div className="fitops-demo-data">
                      <span><b>95</b> active members</span>
                      <span><b>₹22,000</b> monthly revenue</span>
                      <span><b>53</b> new admissions</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ProofSection() {
  const [selected, setSelected] = useState(0);
  const item = proof[selected];
  return (
    <section className="section proof-section" id="proof">
      <div className="section-label reveal"><b>02</b><span /> Proof of life</div>
      <div className="proof-layout">
        <div className="reveal">
          <h2>Ideas are cheap.<br /><em>Receipts</em> are not.</h2>
        </div>
        <div className="reveal reveal-delay-1">
          <div className="proof-tabs" role="tablist" aria-label="Proof projects">
            {proof.map((project, index) => (
              <button
                className={`proof-tab ${selected === index ? 'is-active' : ''}`}
                onClick={() => setSelected(index)}
                role="tab"
                aria-selected={selected === index}
                key={project.name}
                data-testid={`button-proof-${index}`}
              >
                {project.name}
              </button>
            ))}
          </div>
          <div className="proof-panel" key={item.name} data-testid="panel-selected-proof">
            <div className="proof-panel-top">
              <h3>{item.name}</h3>
              <span>{item.year}</span>
            </div>
            <div className="proof-project-image">
              <img src={item.image} alt={`${item.name} project preview`} />
              <span>live surface / demo capture</span>
            </div>
            <p className="proof-quote">“{item.quote}”</p>
             <div className="proof-bottom">
               <span>{item.tag} · {item.detail}</span>
               {item.url && <a className="proof-live" href={item.url} target="_blank" rel="noreferrer">open project <ArrowUpRight size={12} /></a>}
              <b className="proof-mark">{item.mark}</b>
            </div>
          </div>
        </div>
      </div>
    </section>
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
      <ProofSection />
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