import React, { useEffect, useRef, useState } from "react";
import images from "./assets";
console.log(images);

function App() {
  const navDialogRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const line4Ref = useRef(null);
  const [openFAQs, setOpenFAQs] = useState([]);

  // Function to toggle menu visibility
  const handleMenu = () => {
    if (navDialogRef.current) {
      navDialogRef.current.classList.toggle("hidden");
    }
  };

  const initialTranslateLTR = -48 * 4;
  const initialTranslateRTL = 36 * 4;

  // Function to handle scroll animations
  const scrollHandler = (elementRef, isLTR, speed) => {
    if (!elementRef.current) return;

    const translate =
      (window.innerHeight - elementRef.current.getBoundingClientRect().top) *
      speed;
    let totalTranslate = isLTR
      ? translate + initialTranslateLTR
      : -(translate + initialTranslateRTL);

    elementRef.current.style.transform = `translateX(${totalTranslate}px)`;
  };

  // Function to setup IntersectionObserver
  const setupIntersectionObserver = (elementRef, isLTR, speed) => {
    if (!elementRef.current) return;

    const observerCallback = (entries) => {
      const isIntersecting = entries[0].isIntersecting;

      if (isIntersecting) {
        window.addEventListener("scroll", () =>
          scrollHandler(elementRef, isLTR, speed)
        );
      } else {
        window.removeEventListener("scroll", () =>
          scrollHandler(elementRef, isLTR, speed)
        );
      }
    };

    const observerOptions = {
      root: null, // Observing relative to the viewport
      threshold: 0.1, // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    observer.observe(elementRef.current);

    return observer;
  };

  // Attach observers and cleanup on unmount
  useEffect(() => {
    const observer1 = setupIntersectionObserver(line1Ref, true, 0.15);
    const observer2 = setupIntersectionObserver(line2Ref, false, 0.15);
    const observer3 = setupIntersectionObserver(line3Ref, true, 0.15);
    const observer4 = setupIntersectionObserver(line4Ref, true, 0.8);

    return () => {
      observer1?.disconnect();
      observer2?.disconnect();
      observer3?.disconnect();
      observer4?.disconnect();
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []); // Runs only once when the component mounts

  // Function to toggle FAQ visibility
  const handleToggle = (id) => {
    setOpenFAQs((prev) =>
      prev.includes(id) ? prev.filter((faqId) => faqId !== id) : [...prev, id]
    );
  };

  const faqData = [
    {
      id: "faq-1",
      question: "Is ToDesktop For Me?",
      answer:
        "That depends! If you would like to distribute your web app to your users as a downloadable desktop app then ToDesktop is for you.",
    },
    {
      id: "faq-2",
      question: "Is ToDesktop For Me?",
      answer:
        "That depends! If you would like to distribute your web app to your users as a downloadable desktop app then ToDesktop is for you.",
    },
    {
      id: "faq-3",
      question: "Is ToDesktop For Me?",
      answer:
        "That depends! If you would like to distribute your web app to your users as a downloadable desktop app then ToDesktop is for you.",
    },
    {
      id: "faq-4",
      question: "Is ToDesktop For Me?",
      answer:
        "That depends! If you would like to distribute your web app to your users as a downloadable desktop app then ToDesktop is for you.That depends! If you would like to distribute your web app to your users as a downloadable desktop app then ToDesktop is for you.That depends! If you would like to distribute your web app to your users as a downloadable desktop app then ToDesktop is for you.That depends! If you would like to distribute your web app to your users as a downloadable desktop app then ToDesktop is for you.That depends! If you would like to distribute your web app to your users as a downloadable desktop app then ToDesktop is for you.That depends! If you would like to distribute your web app to your users as a downloadable desktop app then ToDesktop is for you.That depends! If you would like to distribute your web app to your users as a downloadable desktop app then ToDesktop is for you.That depends! If you would like to distribute your web app to your users as a downloadable desktop app then ToDesktop is for you.That depends! If you would like to distribute your web app to your users as a downloadable desktop app then ToDesktop is for you.That depends! If you would like to distribute your web app to your users as a downloadable desktop app then ToDesktop is for you.That depends! If you would like to distribute your web app to your users as a downloadable desktop app then ToDesktop is for you.That depends! If you would like to distribute your web app to your users as a downloadable desktop app then ToDesktop is for you.That depends! If you would like to distribute your web app to your users as a downloadable desktop app then ToDesktop is for you.That depends! If you would like to distribute your web app to your users as a downloadable desktop app then ToDesktop is for you.That depends! If you would like to distribute your web app to your users as a downloadable desktop app then ToDesktop is for you.That depends! If you would like to distribute your web app to your users as a downloadable desktop app then ToDesktop is for you.",
    },
    {
      id: "faq-5",
      question: "Is ToDesktop For Me?",
      answer:
        "That depends! If you would like to distribute your web app to your users as a downloadable desktop app then ToDesktop is for you.",
    },
    {
      id: "faq-6",
      question: "Is ToDesktop For Me?",
      answer:
        "That depends! If you would like to distribute your web app to your users as a downloadable desktop app then ToDesktop is for you.",
    },
  ];

  return (
    <>
      {/*---------------------------------------------------Nav Bar---------------------------------------------------*/}

      {/* Top Nav Bar first designed for mobile then for desktop */}
      <nav className="p-3 flex bg-white justify-between items-center fixed top-0 left-0 right-0 z-20 shadow-md">
        <a href="#" id="brand" className="flex gap-2 items-center flex-1">
          <img
            className="object-cover max-w-12 max-h-12"
            src={images["asset 0.png"]}
            alt="Logo"
          />
          <span className="text-lg font-medium font-display">ToDesktop</span>
        </a>

        <div id="nav-menu" className="hidden lg:flex gap-12">
          <a
            href="#"
            className="font-medium hover:text-primary ease-in-out duration-200"
          >
            Pricing
          </a>
          <a
            href="#"
            className="font-medium hover:text-primary ease-in-out duration-200"
          >
            Docs
          </a>
          <a
            href="#"
            className="font-medium hover:text-primary ease-in-out duration-200"
          >
            Changelog
          </a>
          <a
            href="#"
            className="font-medium hover:text-primary ease-in-out duration-200"
          >
            Blogs
          </a>
          <a
            href="#"
            className="font-medium hover:text-primary ease-in-out duration-200"
          >
            Login
          </a>
        </div>

        <div className=" hidden lg:flex flex-1 justify-end">
          <button className=" flex items-center gap-2 border-1 border-gray-400 border py-2 px-6 rounded-lg hover:border-gray-600">
            <img src={images["asset 1.svg"]} alt="Logo" />
            <span className="font-medium font-display">
              Electron Developers
            </span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>

        <button className="p-2 lg:hidden" onClick={handleMenu}>
          <i class="fa-solid fa-bars text-gray-600 hover:text-primary ease-in-out duration-200"></i>
        </button>

        <div
          ref={navDialogRef}
          className="hidden fixed z-10 md:hidden bg-white inset-0 p-3"
        >
          <div id="nav-bar" className="flex justify-between">
            <a href="#" id="brand" className="flex gap-2 items-center">
              <img
                className="object-cover max-w-12 max-h-12"
                src={images["asset 0.png"]}
                alt="Logo"
              />
              <span className="text-lg font-medium font-display">
                ToDesktop
              </span>
            </a>
            <button className="p-2 md:hidden" onClick={handleMenu}>
              <i class="fa-solid fa-xmark text-gray-600 hover:text-primary ease-in-out duration-200"></i>
            </button>
          </div>
          <div className="mt-6">
            <a
              href="#"
              className="font-medium m-3 p-3 hover:bg-gray-50 block rounded-lg"
            >
              Pricing
            </a>
            <a
              href="#"
              className="font-medium m-3 p-3 hover:bg-gray-50 block rounded-lg"
            >
              Docs
            </a>
            <a
              href="#"
              className="font-medium m-3 p-3 hover:bg-gray-50 block rounded-lg"
            >
              Changelog
            </a>
            <a
              href="#"
              className="font-medium m-3 p-3 hover:bg-gray-50 block rounded-lg"
            >
              Blogs
            </a>
            <a
              href="#"
              className="font-medium m-3 p-3 hover:bg-gray-50 block rounded-lg"
            >
              Login
            </a>
          </div>
          <div className="h-[1px] bg-gray-300"></div>

          <button className="mt-6 w-full flex items-center gap-2 py-4 px-6 rounded-lg hover:bg-gray-50">
            <img src={images["asset 1.svg"]} alt="Logo" />
            <span className="font-medium font-display">
              Electron Developers
            </span>
          </button>
        </div>
      </nav>

      {/*------------------------------------------------- Main Body ------------------------------------------------- */}

      <main className="mt-16">
        {/*------------- Hero Section----------- */}

        <div
          id="hero"
          className="min-h-screen bg-gradient-to-b from-purple-50 via-orange-50 to-transparent "
        >
          <div
            id="hero-container"
            className="max-w-4xl mx-auto px-6 pt-6 pb-32 flex flex-col sm:items-center sm:text-center sm:pt-12"
          >
            {/* Version Text Container */}
            <div
              id="version-text"
              className="flex my-6 gap-2 items-center border border-yellow-300 bg-yellow-50 rounded-lg px-3 py-1 w-fit shadow-md hover:shadow-lg hover:-translate-y-1 transition group"
            >
              <div className="w-2 h-2 bg-yellow-400 rounded-full border border-yellow-600"></div>
              <p className="font-display font-medium text-yellow-600">
                v0.21.1:{" "}
                <span className="text-yellow-800">Find-in-page bug fixes</span>
              </p>
              <i class="fa-solid fa-arrow-right text-yellow-600 group-hover:translate-x-1 transition duration-300"></i>
            </div>

            <div id="hero-features" className="hidden sm:flex gap-10 my-6">
              <div className="flex justify-center gap-2 items-center text-gray-500 text-xsm">
                <i class="fa-regular fa-file-code"></i>
                <p>Code Optional</p>
              </div>
              <div className="flex justify-center gap-2 items-center text-gray-500 text-sm">
                <i class="fa-solid fa-hand-back-fist"></i>
                <p>Drag & drop builder</p>
              </div>
              <div className="flex justify-center gap-2 items-center text-gray-500 text-sm">
                <i class="fa-solid fa-laptop"></i>
                <p>Windows, Mac, Linux</p>
              </div>
            </div>

            <h1 className="text-4xl font-semibold leading-snug mt-4 sm:text-7xl sm:leading-15">
              Web app to desktop app in minutes
            </h1>

            <p className="text-xl mt-4 sm:text-2xl sm:mt-8 text-gray-800">
              Take your web app codebase and transform it into a cross platform
              desktop app with native functionality.
            </p>

            <div
              id="buttons-container"
              className="mt-12 flex flex-col sm:flex-row gap-4"
            >
              <button className="px-8 py-3 font-semibold rounded-lg text-white bg-primary shadow-sm hover:bg-opacity-90 ">
                Download Now
              </button>
              <button className="px-8 py-3 font-semibold rounded-lg bg-white border border-gray-400 hover:border-gray-800">
                Read Docs
              </button>
            </div>
          </div>
          <div id="companie-container" className="flex flex-col gap-8">
            <div id="companies-title" className="flex justify-center gap-2">
              <img
                className="translate-y-2"
                src={images["asset 2.svg"]}
                alt=""
              />
              <span className="font-medium">APPS POWERED BY TODESKTOP</span>
              <img
                className="translate-y-2 -scale-x-100"
                src={images["asset 2.svg"]}
                alt=""
              />
            </div>
            <div id="lines-group" className="flex flex-col gap-4">
              <div
                ref={line1Ref}
                id="line1"
                className="flex gap-4 w-screen -translate-x-48 transition-transform ease-linear"
              >
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 3.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 4.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 5.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 6.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 7.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 8.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 9.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 10.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 11.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 12.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 13.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 14.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
              </div>
              <div
                ref={line2Ref}
                id="line2"
                className="flex gap-4 w-screen -translate-x-36 transition-transform ease-linear"
              >
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 3.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 4.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 5.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 6.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 7.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 8.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 9.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 10.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 11.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 12.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 13.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 14.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
              </div>
              <div
                ref={line3Ref}
                id="line3"
                className="flex md:hidden gap-4 w-screen -translate-x-48 transition-transform ease-linear  "
              >
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 3.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 4.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 5.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 6.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 7.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 8.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 9.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 10.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 11.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 12.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 13.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
                <div className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300 md:min-h-32 md:min-w-32">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={images["asset 14.png"]}
                    alt=""
                  />
                  <span className="text-[12px] md:text-[16px] font-semibold">
                    Unbounce
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*--------------Step By Step------------ */}

        <div id="steps" className="flex flex-col gap-6 container mt-20">
          <h2 className="text-5xl sm:font-semibold mb-14">How it works</h2>
          <div
            id="step-1"
            className="rounded-xl border px-8 py-12 flex flex-col lg:flex-row justify-between"
          >
            <div className="flex flex-col gap-6 lg:w-1/2 ">
              <span className="border border-yellow-300 bg-yellow-50 text-yellow-800 w-fit px-3 py-1 rounded-lg font-medium font-display">
                Step 1
              </span>
              <h3 className="text-4xl">Bootstrap straight from your web app</h3>
              <p className="text-lg font-light">
                Copy and paste your web app url into ToDesktop. Customise your
                app design, app icon and window frame UI with no code.
              </p>
              <ul className="grid grid-cols-2 gap-2">
                <li className="flex gap-4">
                  <i class="fa-solid fa-check text-gray-500"></i>
                  <a
                    href="#"
                    className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80"
                  >
                    Multiple Windows
                  </a>
                </li>
                <li className="flex gap-4">
                  <i class="fa-solid fa-check text-gray-500"></i>
                  <a
                    href="#"
                    className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80"
                  >
                    Multiple Windows
                  </a>
                </li>
                <li className="flex gap-4">
                  <i class="fa-solid fa-check text-gray-500"></i>
                  <a
                    href="#"
                    className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80"
                  >
                    Multiple Windows
                  </a>
                </li>
                <li className="flex gap-4">
                  <i class="fa-solid fa-check text-gray-500"></i>
                  <a
                    href="#"
                    className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80"
                  >
                    Multiple Windows
                  </a>
                </li>
                <li className="flex gap-4">
                  <i class="fa-solid fa-check text-gray-500"></i>
                  <a
                    href="#"
                    className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80"
                  >
                    Multiple Windows
                  </a>
                </li>
                <li className="flex gap-4">
                  <i class="fa-solid fa-check text-gray-500"></i>
                  <a
                    href="#"
                    className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80"
                  >
                    Multiple Windows
                  </a>
                </li>
              </ul>
            </div>
            <div className="pt-12">
              <img src={images["asset 66.svg"]} alt="" />
            </div>
          </div>
          <div
            id="step-2"
            className="rounded-xl border px-8 py-12 flex flex-col lg:flex-row justify-between"
          >
            <div className="flex flex-col gap-6 lg:w-1/2 ">
              <span className="border border-yellow-300 bg-yellow-50 text-yellow-800 w-fit px-3 py-1 rounded-lg font-medium font-display">
                Step 2
              </span>
              <h3 className="text-4xl">Bootstrap straight from your web app</h3>
              <p className="text-lg font-light">
                Copy and paste your web app url into ToDesktop. Customise your
                app design, app icon and window frame UI with no code.
              </p>
              <ul className="grid grid-cols-2 gap-2">
                <li className="flex gap-4">
                  <i class="fa-solid fa-check text-gray-500"></i>
                  <a
                    href="#"
                    className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80"
                  >
                    Multiple Windows
                  </a>
                </li>
                <li className="flex gap-4">
                  <i class="fa-solid fa-check text-gray-500"></i>
                  <a
                    href="#"
                    className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80"
                  >
                    Multiple Windows
                  </a>
                </li>
                <li className="flex gap-4">
                  <i class="fa-solid fa-check text-gray-500"></i>
                  <a
                    href="#"
                    className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80"
                  >
                    Multiple Windows
                  </a>
                </li>
                <li className="flex gap-4">
                  <i class="fa-solid fa-check text-gray-500"></i>
                  <a
                    href="#"
                    className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80"
                  >
                    Multiple Windows
                  </a>
                </li>
                <li className="flex gap-4">
                  <i class="fa-solid fa-check text-gray-500"></i>
                  <a
                    href="#"
                    className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80"
                  >
                    Multiple Windows
                  </a>
                </li>
                <li className="flex gap-4">
                  <i class="fa-solid fa-check text-gray-500"></i>
                  <a
                    href="#"
                    className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80"
                  >
                    Multiple Windows
                  </a>
                </li>
              </ul>
            </div>
            <div className="pt-12">
              <img src={images["asset 66.svg"]} alt="" />
            </div>
          </div>
          <div
            id="step-3"
            className="rounded-xl border px-8 py-12 flex flex-col lg:flex-row justify-between"
          >
            <div className="flex flex-col gap-6 lg:w-1/2 ">
              <span className="border border-yellow-300 bg-yellow-50 text-yellow-800 w-fit px-3 py-1 rounded-lg font-medium font-display">
                Step 3
              </span>
              <h3 className="text-4xl">Bootstrap straight from your web app</h3>
              <p className="text-lg font-light">
                Copy and paste your web app url into ToDesktop. Customise your
                app design, app icon and window frame UI with no code.
              </p>
              <ul className="grid grid-cols-2 gap-2">
                <li className="flex gap-4">
                  <i class="fa-solid fa-check text-gray-500"></i>
                  <a
                    href="#"
                    className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80"
                  >
                    Multiple Windows
                  </a>
                </li>
                <li className="flex gap-4">
                  <i class="fa-solid fa-check text-gray-500"></i>
                  <a
                    href="#"
                    className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80"
                  >
                    Multiple Windows
                  </a>
                </li>
                <li className="flex gap-4">
                  <i class="fa-solid fa-check text-gray-500"></i>
                  <a
                    href="#"
                    className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80"
                  >
                    Multiple Windows
                  </a>
                </li>
                <li className="flex gap-4">
                  <i class="fa-solid fa-check text-gray-500"></i>
                  <a
                    href="#"
                    className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80"
                  >
                    Multiple Windows
                  </a>
                </li>
                <li className="flex gap-4">
                  <i class="fa-solid fa-check text-gray-500"></i>
                  <a
                    href="#"
                    className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80"
                  >
                    Multiple Windows
                  </a>
                </li>
                <li className="flex gap-4">
                  <i class="fa-solid fa-check text-gray-500"></i>
                  <a
                    href="#"
                    className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80"
                  >
                    Multiple Windows
                  </a>
                </li>
              </ul>
            </div>
            <div className="pt-12">
              <img src={images["asset 66.svg"]} alt="" />
            </div>
          </div>
        </div>

        {/*--------------Bento Grid-------------- */}

        <div id="bento-grid" className="container">
          <h2 className="text-5xl sm:font-semibold mb-14 max-w-2xl leading-normal">
            ToDesktop handles the details
          </h2>
          <div
            id="grid-container"
            className="flex flex-col gap-6 lg:grid lg:grid-cols-3"
            style={{ gridAutoRows: "96px" }}
          >
            <div className=" row-start-1 row-end-3 group rounded-2xl p-[1px] bg-slate-200 hover:bg-gradient-to-br hover:from-red-200 hover:to-yellow-200 hover:via-purple-200">
              <div className="bg-gray-50 group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:to-yellow-50 group-hover:via-purple-50 gap-6 w-full h-full rounded-2xl p-6 flex flex-col items-center">
                <h3 className="text-2xl">Native Notifications</h3>
                <img src={images["asset 37.png"]} alt="" />
              </div>
            </div>
            <div className=" row-start-1 row-end-4 group rounded-2xl p-[1px] bg-slate-200 hover:bg-gradient-to-br hover:from-red-200 hover:to-yellow-200 hover:via-purple-200">
              <div className="bg-gray-50 group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:to-yellow-50 group-hover:via-purple-50 gap-6 w-full h-full rounded-2xl p-6 flex flex-col items-center">
                <h3 className="text-2xl">Native Notifications</h3>
                <p className="text-lg text-center font-light">
                  We’ll ensure the underlying browser is up to date and deliver
                  performance improvements, security patches, & additional
                  features.
                </p>
                <img src={images["asset 38.png"]} alt="" />
              </div>
            </div>
            <div className=" row-start-1 row-end-3 group rounded-2xl p-[1px] bg-slate-200 hover:bg-gradient-to-br hover:from-red-200 hover:to-yellow-200 hover:via-purple-200">
              <div className="bg-gray-50 group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:to-yellow-50 group-hover:via-purple-50 gap-6 w-full h-full rounded-2xl p-6 flex flex-col items-center">
                <h3 className="text-2xl">Native Notifications</h3>
                <img src={images["asset 39.png"]} alt="" />
              </div>
            </div>
            <div className=" row-start-3 row-end-6 group rounded-2xl p-[1px] bg-slate-200 hover:bg-gradient-to-br hover:from-red-200 hover:to-yellow-200 hover:via-purple-200">
              <div className="bg-gray-50 group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:to-yellow-50 group-hover:via-purple-50 gap-6 w-full h-full rounded-2xl p-6 flex flex-col items-center">
                <h3 className="text-2xl">Native Notifications</h3>
                <p className="text-lg text-center font-light">
                  We’ll ensure the underlying browser is up to date and deliver
                  performance improvements, security patches, & additional
                  features.
                </p>
                <img src={images["asset 40.png"]} alt="" />
              </div>
            </div>
            <div className=" row-start-4 row-end-6 group rounded-2xl p-[1px] bg-slate-200 hover:bg-gradient-to-br hover:from-red-200 hover:to-yellow-200 hover:via-purple-200">
              <div className="bg-gray-50 group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:to-yellow-50 group-hover:via-purple-50 gap-6 w-full h-full rounded-2xl p-6 flex flex-col items-center">
                <h3 className="text-2xl">Native Notifications</h3>
                <img src={images["asset 37.png"]} alt="" />
              </div>
            </div>
            <div className="row-start-3 row-end-6 group rounded-2xl p-[1px] bg-slate-200 hover:bg-gradient-to-br hover:from-red-200 hover:to-yellow-200 hover:via-purple-200">
              <div className="bg-gray-50 group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:to-yellow-50 group-hover:via-purple-50 gap-6 w-full h-full rounded-2xl p-6 flex flex-col items-center">
                <h3 className="text-2xl">Native Notifications</h3>
                <p className="text-lg text-center font-light">
                  We’ll ensure the underlying browser is up to date and deliver
                  performance improvements, security patches, & additional
                  features.
                </p>
                <img src={images["asset 38.png"]} alt="" />
              </div>
            </div>
          </div>
        </div>

        {/*-------- Companies Feature Line------- */}

        <div id="features-line" className="container mt-4">
          <div className="border rounded-lg overflow-hidden flex justify-center p-4">
            <div ref={line4Ref} id="line-4" className="flex gap-8 p-6">
              <h3 className="whitespace-nowrap my-0 mx-2 text-2xl font-semibold">
                Custom Menus
              </h3>
              <span>•</span>
              <h3 className="whitespace-nowrap my-0 mx-2 text-2xl font-semibold">
                Multi-window support
              </h3>
              <span>•</span>
              <h3 className="whitespace-nowrap my-0 mx-2 text-2xl font-semibold">
                Trays
              </h3>
              <h3 className="whitespace-nowrap my-0 mx-2 text-2xl font-semibold">
                Download Analytics
              </h3>
              <span>•</span>
              <h3 className="whitespace-nowrap my-0 mx-2 text-2xl font-semibold">
                Custom Menus
              </h3>
              <span>•</span>
              <h3 className="whitespace-nowrap my-0 mx-2 text-2xl font-semibold">
                Multi-window support
              </h3>
              <span>•</span>
              <h3 className="whitespace-nowrap my-0 mx-2 text-2xl font-semibold">
                Trays
              </h3>
              <span>•</span>
              <h3 className="whitespace-nowrap my-0 mx-2 text-2xl font-semibold">
                Deep Linking
              </h3>
              <span>•</span>
              <h3 className="whitespace-nowrap my-0 mx-2 text-2xl font-semibold">
                Launch at startup
              </h3>
              <span>•</span>
              <h3 className="whitespace-nowrap my-0 mx-2 text-2xl font-semibold">
                Offline Support
              </h3>
              <span>•</span>
            </div>
          </div>
        </div>

        {/*------------Testimonials-----------*/}

        <div id="testimonials" className="container">
          <h2 className="text-5xl sm:font-semibold mb-14">Customer Stories</h2>
          <div className="rounded-xl border flex flex-col lg:flex-row items-end">
            <div id="left" className="flex flex-col gap-12 p-8">
              <div className="h-4 w-fit">
                <img src={images["asset 44.svg"]} alt="" />
              </div>
              <h3 className="text-xl leading-relaxed">
                ClickUp used ToDesktop to get their desktop app in front of
                customers in days instead of months.
              </h3>
              <div id="tag-container" className="flex gap-3 flex-wrap">
                <div className="flex gap-2 items-center justify-center bg-yellow-50 w-fit border border-yellow-300 px-3 py-1 rounded-md text-yellow-800">
                  <i class="fa-solid fa-check"></i>
                  <span className="font-display font-medium">
                    Chromeless UI
                  </span>
                </div>
                <div className="flex gap-2 items-center justify-center bg-yellow-50 w-fit border border-yellow-300 px-3 py-1 rounded-md text-yellow-800">
                  <i class="fa-solid fa-check"></i>
                  <span className="font-display font-medium">
                    Native spellcheck
                  </span>
                </div>
                <div className="flex gap-2 items-center justify-center bg-yellow-50 w-fit border border-yellow-300 px-3 py-1 rounded-md text-yellow-800">
                  <i class="fa-solid fa-check"></i>
                  <span className="font-display font-medium">
                    Task time in menubar
                  </span>
                </div>
                <div className="flex gap-2 items-center justify-center bg-yellow-50 w-fit border border-yellow-300 px-3 py-1 rounded-md text-yellow-800">
                  <i class="fa-solid fa-check"></i>
                  <span className="font-display font-medium">
                    Notification count in the dock
                  </span>
                </div>
                <div className="flex gap-2 items-center justify-center bg-yellow-50 w-fit border border-yellow-300 px-3 py-1 rounded-md text-yellow-800">
                  <i class="fa-solid fa-check"></i>
                  <span className="font-display font-medium">
                    Global hotkey to create task
                  </span>
                </div>
              </div>
              <p className="text-lg font-light text-gray-500">
                “ToDesktop provided us with a{" "}
                <span className="text-gray-800">polished desktop app</span> in
                no time. Their expert team guided us through a smooth migration
                from our outdated legacy desktop app, enabling us to deliver{" "}
                <span className="text-gray-800">new and improved features</span>{" "}
                to our customers within days.”
              </p>
              <div id="user-card" className="flex gap-4">
                <div className="w-12">
                  <img
                    className="rounded-full"
                    src={images["asset 45.jpeg"]}
                    alt=""
                  />
                </div>
                <div className="flex flex-col">
                  <h3>Zeb Evans</h3>
                  <p className="text-gray-500">
                    Founder & CEO,{" "}
                    <a className="anchor-hover" href="#">
                      Click Up
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div id="right">
              <img src={images["asset 46.png"]} alt="" className="pl-12" />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-4 mt-6">
            <div className="group flex rounded-2xl gradient-hover-outer">
              <div className="flex rounded-2xl gradient-hover-inner flex-col p-6 gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-blue-200 flex items-center justify-center rounded-full">
                    <i className="fa-solid fa-code text-indigo-800"></i>
                  </div>
                  <h3 className="text-2xl font-semibold">Native APIs</h3>
                </div>
                <p className="text-lg font-light">
                  What sets ToDesktop apart is its seamless integration with
                  native APIs using our existing web codebase. By tapping into
                  APIs like Tray and Notifications, we've crafted an
                  exceptionally polished desktop user experience.
                </p>
                <div className="flex gap-4">
                  <div className="flex">
                    <div className="-mr-3 w-12 h-12 flex justify-center items-center rounded-full overflow-hidden border border-white">
                      <img
                        src={images["asset 47.png"]}
                        className="min-w-16 min-h-16"
                        alt=""
                      />
                    </div>
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-white">
                      <img src={images["asset 48.jpeg"]} alt="" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h3>Rick Pastoor</h3>
                    <a href="#" className="anchor-hover w-fit text-gray-500">
                      Rise
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="group flex rounded-2xl gradient-hover-outer">
              <div className="flex rounded-2xl gradient-hover-inner flex-col p-6 gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-blue-200 flex items-center justify-center rounded-full">
                    <i className="fa-solid fa-code text-indigo-800"></i>
                  </div>
                  <h3 className="text-2xl font-semibold">Native APIs</h3>
                </div>
                <p className="text-lg font-light">
                  What sets ToDesktop apart is its seamless integration with
                  native APIs using our existing web codebase. By tapping into
                  APIs like Tray and Notifications, we've crafted an
                  exceptionally polished desktop user experience.
                </p>
                <div className="flex gap-4">
                  <div className="flex">
                    <div className="-mr-3 w-12 h-12 flex justify-center items-center rounded-full overflow-hidden border border-white">
                      <img
                        src={images["asset 47.png"]}
                        className="min-w-16 min-h-16"
                        alt=""
                      />
                    </div>
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-white">
                      <img src={images["asset 48.jpeg"]} alt="" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h3>Rick Pastoor</h3>
                    <a href="#" className="anchor-hover w-fit text-gray-500">
                      Rise
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="group flex rounded-2xl gradient-hover-outer">
              <div className="flex rounded-2xl gradient-hover-inner flex-col p-6 gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-blue-200 flex items-center justify-center rounded-full">
                    <i className="fa-solid fa-code text-indigo-800"></i>
                  </div>
                  <h3 className="text-2xl font-semibold">Native APIs</h3>
                </div>
                <p className="text-lg font-light">
                  What sets ToDesktop apart is its seamless integration with
                  native APIs using our existing web codebase. By tapping into
                  APIs like Tray and Notifications, we've crafted an
                  exceptionally polished desktop user experience.
                </p>
                <div className="flex gap-4">
                  <div className="flex">
                    <div className="-mr-3 w-12 h-12 flex justify-center items-center rounded-full overflow-hidden border border-white">
                      <img
                        src={images["asset 47.png"]}
                        className="min-w-16 min-h-16"
                        alt=""
                      />
                    </div>
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-white">
                      <img src={images["asset 48.jpeg"]} alt="" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h3>Rick Pastoor</h3>
                    <a href="#" className="anchor-hover w-fit text-gray-500">
                      Rise
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl flex flex-col bg-black lg:flex-row items-start mt-6 pt-6 lg:pt-10">
            <div
              id="left"
              className="flex flex-col gap-4 p-8 lg:flex-1 lg:gap-8 "
            >
              <span className="text-gray-400 font-display font-medium pt-5">
                READY TO START BUILDING?
              </span>
              <h2 className="text-4xl text-white leading-tight lg:text-5xl">
                Create your desktop app for free*
              </h2>
              <p className="text-lg font-light text-gray-400 lg:text-xl">
                ToDesktop Builder will take you step-by-step through the process
                of creating your first desktop app in just a few minutes.
              </p>
              <button className="bg-primary text-white py-3 rounded-lg hover:opacity-90 flex gap-4 justify-center items-center">
                <i class="fa-solid fa-download "></i>
                Download ToDesktop Builder
              </button>
              <p className="text-gray-400 text-xs italic leading-tight">
                *You can create a desktop app and run it on your computer for
                free. You will only be charged if you want to create a
                distributable app for your customers.
              </p>
            </div>
            <div id="right" className="lg:w-1/2">
              <img src={images["asset 46.png"]} alt="" className="pl-12" />
            </div>
          </div>
        </div>

        {/*--------------Pricing------------- */}
        <div id="pricing" className="container">
          <h2 className="text-5xl leading-normal sm:font-semibold max-w-2xl">
            Choose a plan that fits your needs
          </h2>
          <div className="flex flex-col lg:flex-row mt-6 gap-6">
            <div className="flex-1 border rounded-xl px-8 pt-12 pb-8 flex flex-col gap-6 lg:border-none lg:bg-slate-50">
              <h3 className="text-4xl">Free</h3>
              <p className="text-lg font-light">
                For personal use or testing your app before deploying to
                customers.
              </p>
              <p className="uppercase">Key Features</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-4">
                  <i class="fa-solid fa-check text-gray-500"></i>
                  <span className="text-lg font-light text-gray-800">
                    Free for Personal use
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <i class="fa-solid fa-check text-gray-500"></i>
                  <span className="text-lg font-light text-gray-800">
                    Free for Personal use
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <i class="fa-solid fa-xmark text-gray-500"></i>
                  <span className="text-lg font-light text-gray-800">
                    Free for Personal use
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <i class="fa-solid fa-xmark text-gray-500"></i>
                  <span className="text-lg font-light text-gray-800">
                    Free for Personal use
                  </span>
                </li>
              </ul>
              <button className="border px-8 py-3 text-primary rounded-lg hover:border-gray-800 font-display font-medium">
                Read Docs
              </button>
            </div>
            <div className="flex-1 border rounded-xl px-8 pt-12 pb-8 flex flex-col gap-6 lg:border-none lg:bg-slate-50">
              <h3 className="text-4xl">Essential</h3>
              <p className="text-lg font-light">For simple desktop apps.</p>
              <p className="text-lg font-light">
                <span className="text-2xl font-semibold">$99</span>/month
              </p>
              <p className="uppercase">Key Features</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-4">
                  <i class="fa-solid fa-check text-gray-500"></i>
                  <span className="text-lg font-light text-gray-800">
                    Free for Personal use
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <i class="fa-solid fa-check text-gray-500"></i>
                  <span className="text-lg font-light text-gray-800">
                    Free for Personal use
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <i class="fa-solid fa-xmark text-gray-500"></i>
                  <span className="text-lg font-light text-gray-800">
                    Free for Personal use
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <i class="fa-solid fa-xmark text-gray-500"></i>
                  <span className="text-lg font-light text-gray-800">
                    Free for Personal use
                  </span>
                </li>
              </ul>
              <button className="border px-8 py-3 text-primary rounded-lg hover:border-gray-800 font-display font-medium">
                Read Docs
              </button>
            </div>
            <div className="flex-1 border relative rounded-xl px-8 pt-12 pb-8 flex flex-col gap-6 lg:border-none lg:bg-slate-50">
              <p className="text-blue-800 text-sm bg-indigo-100 border rounded-full w-fit px-4 py-2 font-display font-semibold absolute top-0 right-8 -translate-y-1/2 ">
                Most Popular
              </p>
              <h3 className="text-4xl">Professional</h3>
              <p className="text-lg font-light">
                For sophisticated desktop apps.
              </p>
              <p className="text-lg font-light">
                <span className="text-2xl font-semibold">$240</span>/month
              </p>
              <p className="uppercase">Key Features</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-4">
                  <i class="fa-solid fa-check text-gray-500"></i>
                  <span className="text-lg font-light text-gray-800">
                    Free for Personal use
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <i class="fa-solid fa-check text-gray-500"></i>
                  <span className="text-lg font-light text-gray-800">
                    Free for Personal use
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <i class="fa-solid fa-xmark text-gray-500"></i>
                  <span className="text-lg font-light text-gray-800">
                    Free for Personal use
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <i class="fa-solid fa-xmark text-gray-500"></i>
                  <span className="text-lg font-light text-gray-800">
                    Free for Personal use
                  </span>
                </li>
              </ul>
              <button className="px-8 py-3 text-white bg-primary rounded-lg hover:bg-opacity-90 font-display font-medium">
                Read Docs
              </button>
            </div>
          </div>
        </div>

        {/*------------FAQs Section----------- */}
        <div id="faq" className="container">
          <h2 className="h2-style">FAQs</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 mt-6 gap-6 items-start">
            {faqData.map((faq) => (
              <div
                key={faq.id}
                className="group rounded-xl border border-gray-200 bg-gray-50 p-6"
              >
                <dt
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => handleToggle(faq.id)}
                >
                  <p className="font-semibold text-lg">{faq.question}</p>
                  <i
                    className={`fa-solid fa-chevron-up transition-transform duration-300 ${
                      openFAQs.includes(faq.id) ? "rotate-0" : "-rotate-180"
                    }`}
                  ></i>
                </dt>
                <dd
                  id={faq.id}
                  className={`text-lg font-light mt-6 transition-all duration-300 ${
                    openFAQs.includes(faq.id) ? "block" : "hidden"
                  }`}
                >
                  <p>{faq.answer}</p>
                </dd>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/*---------------------------------------------------Footer---------------------------------------------------- */}

      <footer className="container">
        <div className="rounded-lg border lg:border-none lg:bg-gray-50 bg-gray-50 flex flex-col lg:flex-row-reverse items-center
        px-8 py-12 gap-8">
          <a href="#" className="font-light font-display">Documentation</a>
          <div className="flex gap-8">
            <a href="#" className="text-gray-600 hover:text-gray-900"><i class="fa-brands fa-twitter"></i></a>
            <a href="#" className="text-gray-600 hover:text-gray-900"><i class="fa-brands fa-github"></i></a>
          </div>
          <a href="#" id="brand" className="flex gap-2 items-center flex-1">
          <img
            className="object-cover max-w-12 max-h-12"
            src={images["asset 0.png"]}
            alt="Logo"
          />
          <span className="text-lg font-medium font-display">ToDesktop</span>
        </a>
        </div>

        <div id="sub-footer" className="flex flex-col items-center my-12 gap-6">
          <div className="flex gap-2 items-center">
            <img className="w-4 h-4" src={images['asset 54.svg']} alt="Y-combinator" />
            <p className="text-sm text=gray-600 ">A Y Combinator company.</p>
          </div>
          <p className="text-gray-400 text-sm ">© 2024 ToDesktop, Inc. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
