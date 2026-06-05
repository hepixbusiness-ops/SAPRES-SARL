import Link from 'next/link'
import Image from 'next/image'

const LINKS_ENTREPRISE = [
  { href: '/a-propos',     label: 'À Propos' },
  { href: '/realisations', label: 'Nos Réalisations' },
  { href: '/blog',         label: 'Blog & Actualités' },
  { href: '/recrutement',  label: 'Carrières' },
  { href: '/contact',      label: 'Contact' },
]

const LINKS_SERVICES = [
  { href: '/services', label: 'Installation Solaire' },
  { href: '/services', label: 'Pompage Solaire' },
  { href: '/services', label: 'Lampadaires Solaires' },
  { href: '/services', label: 'Maintenance' },
  { href: '/services', label: 'Audit Énergétique' },
]

const LINKS_PRODUITS = [
  { href: '/produits', label: 'Panneaux Solaires' },
  { href: '/produits', label: 'Batteries Lithium' },
  { href: '/produits', label: 'Onduleurs' },
  { href: '/produits', label: 'Éclairage LED' },
  { href: '/devis',    label: 'Demander un Devis' },
]

export default function Footer() {
  return (
    <footer>
      <div className="foot-grid" style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: 36,
        marginBottom: 38,
      }}>
        {/* Colonne brand */}
        <div>
          <div className="foot-logo" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <Image
              src="/logo.png" alt="SAPRES Logo"
              width={46} height={46}
              style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 14px rgba(140,198,63,.28))' }}
            />
            <span className="foot-brand">SAPRES SARL</span>
          </div>
          <p className="foot-p">
            Leader de l'énergie solaire au Cameroun. Partenaire officiel Blue Carbon.
            Installations résidentielles, industrielles et solutions d'éclairage public.
          </p>

          {/* Réseaux sociaux */}
          <div className="soc-links">
            {[
              { icon: 'f', label: 'Facebook',  href: '#' },
              { icon: 'in', label: 'Instagram', href: '#' },
              { icon: 'li', label: 'LinkedIn',  href: '#' },
              { icon: '▶',  label: 'YouTube',   href: '#' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="soc-btn"
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'rgba(255,255,255,.6)', textDecoration: 'none' }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Liens Entreprise */}
        <FootCol title="Entreprise" links={LINKS_ENTREPRISE} />

        {/* Liens Services */}
        <FootCol title="Services" links={LINKS_SERVICES} />

        {/* Liens Produits */}
        <FootCol title="Produits" links={LINKS_PRODUITS} />
      </div>

      {/* Bottom bar */}
      <div className="foot-bottom">
        <p>
          © {new Date().getFullYear()} <span className="fg-c">SAPRES SARL</span> — Tous droits réservés
        </p>
        <p>
          Partenaire Officiel{' '}
          <span className="fg-c" style={{ fontWeight: 700 }}>Blue Carbon</span>
        </p>
      </div>

      <style>{`
        @media(max-width:768px){
          .foot-grid { grid-template-columns: 1fr 1fr !important; gap: 22px !important; }
          .foot-bottom { flex-direction: column !important; gap: 5px !important; text-align: center !important; }
        }
        @media(max-width:420px){
          .foot-grid { grid-template-columns: 1fr !important; }
        }
        .soc-btn { display:flex; align-items:center; justify-content:center; width:33px; height:33px; background:rgba(255,255,255,.05); border-radius:8px; font-size:.84rem; cursor:pointer; transition:all .28s; }
        .soc-btn:hover { background:var(--g); transform:translateY(-2px); }
        .foot-grid { display:grid; }
        .foot-brand { font-family:'Raleway',sans-serif; font-size:.97rem; font-weight:800; color:#fff; }
        .foot-p { font-size:.75rem; color:rgba(255,255,255,.35); line-height:1.8; max-width:300px; }
        .foot-col h4 { font-family:'Raleway',sans-serif; color:#fff; font-size:.8rem; font-weight:700; margin-bottom:10px; }
        .foot-col ul { list-style:none; display:flex; flex-direction:column; gap:6px; }
        .foot-col ul li a { color:rgba(255,255,255,.34); font-size:.74rem; text-decoration:none; transition:color .18s; }
        .foot-col ul li a:hover { color:var(--g); }
        .foot-bottom { border-top:1px solid rgba(255,255,255,.06); padding-top:17px; display:flex; justify-content:space-between; align-items:center; }
        .foot-bottom p { font-size:.69rem; color:rgba(255,255,255,.22); }
        .fg-c { color:var(--g); }
        .soc-links { display:flex; gap:6px; margin-top:13px; }
        .foot-logo { display:flex; align-items:center; gap:8px; margin-bottom:8px; }
      `}</style>
    </footer>
  )
}

function FootCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div className="foot-col">
      <h4>{title}</h4>
      <ul>
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
