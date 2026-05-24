import { useEffect, useRef, useState } from "react";
import "./App.css";

import tortugaVid from "./assets/tortugaVid.mp4";
import photographyImg1 from "./assets/photography.png";
import photographyImg2 from "./assets/photography2.png";
import photographyImg3 from "./assets/photography3.png";
import photographyImg4 from "./assets/photography4.jpg";
import utVid from "./assets/videoeditVid.mp4";
import ninjaImg from "./assets/ninjaslide.png";
import junkImg from "./assets/junkslide.png";

const slides = [
  {
    type: "intro",
    title: "Developer & Digital Designer",
    eyebrow: "Websites · Branding · Design · Content",
    description:
      "I build modern websites, visual identities, and digital content for businesses — blending clean development, thoughtful design, and practical marketing.",
  },
  {
    title: "Tortuga Pool Services",
    category: "Website / Full-Stack",
    description:
      "A clean service-based website for a pool company, featuring responsive layouts, customer-focused sections, and contact form functionality.",
    image: tortugaVid,
  },
  {
    title: "Branding & Logos",
    category: "Brand Identity",
    description:
      "Logo concepts and visual identity systems designed to help small businesses look polished and memorable.",
    slideshow: [ninjaImg, junkImg],
  },
  {
    title: "Photography",
    category: "Photography / Visual Content",
    description:
      "Photography and visual content created for branding, websites, social media, and polished business presentation.",
    slideshow: [
      photographyImg1,
      photographyImg2,
      photographyImg3,
      photographyImg4,
    ],
  },
  {
    title: "Video & Content Editing",
    category: "Content / Motion",
    description:
      "Photo cleanup, color correction, short-form edits, and polished visual content for websites and social media.",
    image: utVid,
  },
];

function HeroSlideshow({ slide }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setPhotoIndex((prev) => prev + 1);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="heroPhotoSlider">
      <div
        className="heroPhotoTrack"
        style={{
          transform: `translateX(-${photoIndex * 100}%)`,
          transition: isTransitioning ? "transform 900ms ease" : "none",
        }}
        onTransitionEnd={() => {
          if (photoIndex === slide.slideshow.length) {
            setIsTransitioning(false);
            setPhotoIndex(0);
          }
        }}
      >
        {[...slide.slideshow, slide.slideshow[0]].map((photo, i) => (
          <img
            key={i}
            src={photo}
            alt={`${slide.title} ${i + 1}`}
            className="showcaseImage heroSlidePhoto"
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const showcaseRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      const showcase = showcaseRef.current;
      if (!showcase) return;

      const rect = showcase.getBoundingClientRect();
      const isInsideShowcase =
        rect.top <= 76 && rect.bottom >= window.innerHeight;

      if (!isInsideShowcase) return;

      if (Math.abs(e.deltaY) < 15) {
        e.preventDefault();
        return;
      }

      if (isLocked) {
        e.preventDefault();
        return;
      }

      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      if (scrollingDown && activeSlide < slides.length - 1) {
        e.preventDefault();
        setIsLocked(true);
        setActiveSlide((prev) => prev + 1);

        setTimeout(() => {
          setIsLocked(false);
        }, 1100);
      } else if (scrollingUp && activeSlide > 0) {
        e.preventDefault();
        setIsLocked(true);
        setActiveSlide((prev) => prev - 1);

        setTimeout(() => {
          setIsLocked(false);
        }, 1100);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [activeSlide, isLocked]);

  return (
    <main>
      <header className="siteHeader">
        <a href="#home" className="logo">
          Jacob<span>.dev</span>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#showcase">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section
        id="showcase"
        ref={showcaseRef}
        className="horizontalSection"
        style={{
          height: `${(slides.length + 1) * 30}vh`,
        }}
      >
        <div className="horizontalSticky">
          <div
            className="horizontalTrack"
            style={{
              transform: `translateX(-${activeSlide * 100}vw)`,
            }}
          >
            {slides.map((slide, index) => (
              <section
                key={slide.title}
                id={index === 0 ? "home" : undefined}
                className={`showcaseSlide ${
                  slide.type === "intro"
                    ? "introSlide"
                    : "projectShowcaseSlide"
                }`}
              >
                {slide.type === "intro" ? (
                  <>
                    <div className="introContent">
                      <p className="eyebrow">{slide.eyebrow}</p>
                      <h1>{slide.title}</h1>
                      <p>{slide.description}</p>

                      <div className="heroActions">
                        <a href="#showcase" className="primaryBtn">
                          View Work
                        </a>
                        <a href="#contact" className="secondaryBtn">
                          Contact Me
                        </a>
                      </div>
                    </div>

                    <div className="introCard">
                      <p>Available for</p>
                      <h2>
                        Websites, branding, graphics, and content packages.
                      </h2>
                      <span>
                        Based in Tennessee · Working with local businesses
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    {slide.slideshow ? (
                      <HeroSlideshow slide={slide} />
                    ) : slide.image.endsWith(".mp4") ? (
                      <video
                        src={slide.image}
                        className="showcaseImage"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="showcaseImage"
                      />
                    )}

                    <div className="imageOverlay" />

                    <div className="slideTopBar">
                      <span>({String(index).padStart(2, "0")})</span>
                      <span>{slide.category}</span>
                    </div>

                    <div className="slideTitle">
                      {index === slides.length - 1 && (
                        <a href="#about" className="continueCue">
                          Continue ↓
                        </a>
                      )}
                      <p>Selected Work</p>
                      <h2>{slide.title}</h2>
                      <span>{slide.description}</span>
                    </div>
                  </>
                )}
              </section>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="aboutSection">
        <div>
          <p className="eyebrow">About</p>
          <h2>I create complete visual experiences for businesses.</h2>
        </div>

        <p>
          I’m a creative developer focused on building professional digital
          experiences — from websites and branding to graphics, motion, and
          content. My background blends front-end development with design,
          marketing, and visual storytelling, allowing me to create work that is
          both functional and visually engaging.
        </p>
      </section>

      <section id="contact" className="contactSection">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Let’s build something polished.</h2>
          <p>
            Have a website, brand, design, or content project in mind? Reach out
            and let’s talk through it.
          </p>
        </div>

        <form className="contactForm">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Subject" />
          <textarea placeholder="Tell me about your project" rows="6" />
          <button type="submit">Send Message</button>
        </form>
      </section>

      <footer>
        <p>© 2026 Jacob Juarez. All rights reserved.</p>
      </footer>
    </main>
  );
}

export default App;