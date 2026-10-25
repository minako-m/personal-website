import { useRef, useState } from 'react'
import PixelCharacter from './PixelCharacter'
import Shelves from './Shelves'

export default function Hero() {
  // Dropping a matcha on the character bumps `feeds`, which makes her drink and jump
  const characterRef = useRef(null)
  const [feeds, setFeeds] = useState(0)

  return (
    <section id="home" className="hero">
      <div className="hero-blob-1" />
      <div className="hero-blob-2" />
      <div className="container hero-content">
        <div className="hero-top">
          <div>
            <p className="hero-greeting">Hi there, I'm</p>
            <h1 className="hero-name">
              <span className="first-name-stage">
                Amira
                <PixelCharacter imgRef={characterRef} feedCount={feeds} />
              </span><br />
              <span className="hero-name-accent">Mahmedjan.</span>
            </h1>
          </div>
          <Shelves targetRef={characterRef} onFeed={() => setFeeds(f => f + 1)} />
        </div>
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
