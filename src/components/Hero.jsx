import WalkingCharacter from './WalkingCharacter'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-blob-1" />
      <div className="hero-blob-2" />
      <div className="container hero-content">
        <p className="hero-greeting">Hi there, I'm</p>
        <h1 className="hero-name">
          Amira<br />
          <span className="last-name-stage">
            <span className="hero-name-accent">Mahmedjan.</span>
            <WalkingCharacter />
          </span>
        </h1>
        <p className="hero-tagline">
          Software Engineer &amp; Stanford CS Systems.
        </p>
        <div className="hero-links">
          <a
            href="https://github.com/minako-m"
            target="_blank"
            rel="noreferrer"
            className="hero-link primary"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/amira-mahmedjan/"
            target="_blank"
            rel="noreferrer"
            className="hero-link"
          >
            LinkedIn ↗
          </a>
          <a href="mailto:mahmedjan.amira@gmail.com" className="hero-link">
            Email ↗
          </a>
        </div>
      </div>
    </section>
  )
}
