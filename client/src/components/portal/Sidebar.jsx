import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';




const menuData = [
    // {
    //     key: "menu1",
    //     label: "Category",
    //     subMenu: [
    //         { key: "category", label: "Category" },
    //         {
    //             key: "submenu2",
    //             label: "Submenu 2",
    //             subMenu: [
    //                 { key: "innerSubmenu1", label: "Inner Submenu 1" },
    //                 { key: "innerSubmenu2", label: "Inner Submenu 2" },
    //             ],
    //         },
    //     ],
    // },
    {
        key: "category",
        label: "Category",
        link:"category"
    },
    {
        key: "sub-category",
        label: "Sub-Category",
        link:"sub-category"
    },
    {
        key: "product",
        label: "Product",
        link:"product"
    }
];

const Sidebar = () => {
    const [openMenus, setOpenMenus] = useState({});
    const toggleMenu = (menuKey) => {
        setOpenMenus((prev) => ({
            ...prev,
            [menuKey]: !prev[menuKey],
        }));
    };
    useEffect(() => {
        const html = document.querySelector("html");
        const sidebar = document.querySelector("#sidebar");
        const mainContentDiv = document.querySelector("#main-content");
        const menuNav = document.querySelector(".main-menu");
        const mainContainer1 = document.querySelector(".main-sidebar");
        const slideLeft = document.querySelector(".slide-left");
        const slideRight = document.querySelector(".slide-right");



        // const toggleMenu = (menuKey) => {
        //     setOpenMenus((prev) => ({
        //         ...prev,
        //         [menuKey]: !prev[menuKey],
        //     }));
        // };
        const handleResize = () => {
            console.log(window.innerWidth);

            setTimeout(() => {
                if (window.innerWidth <= 992) {
                    menuClose()
                    mainContentDiv?.addEventListener("click", menuClose);
                } else {
                    mainContentDiv?.removeEventListener("click", menuClose);
                }
            }, 100);
        };
        const menuClose = () => {
            html.setAttribute("data-toggled", "close");
            document.querySelector("#responsive-overlay")?.classList.remove("active");
        };
        window.addEventListener("resize", handleResize);
        const mouseEntered = () => html.setAttribute("data-icon-overlay", "open");
        const mouseLeave = () => html.removeAttribute("data-icon-overlay");
        const icontextOpen = () => html.setAttribute("data-icon-text", "open");
        const icontextClose = () => html.removeAttribute("data-icon-text");

        const slideClick = () => {
            document.querySelectorAll(".slide").forEach((element) => element.classList.remove("is-expanded"));
            document.querySelectorAll(".slide-menu").forEach((element) => {
                element.classList.remove("open");
                element.style.display = "none";
            });
        };

        const checkHoriMenu = () => {
            let check = menuNav.scrollWidth - mainContainer1.offsetWidth;
            if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
                slideRight.classList.remove("hidden");
                slideLeft.classList.add("hidden");
            } else {
                slideRight.classList.add("hidden");
                slideLeft.classList.add("hidden");
                menuNav.style.marginLeft = "0px";
                menuNav.style.marginRight = "0px";
            }
        };

        const handleSlide = (direction) => {
            let marginLeftValue = Math.ceil(Number(window.getComputedStyle(menuNav).marginLeft.split("px")[0]));
            let marginRightValue = Math.ceil(Number(window.getComputedStyle(menuNav).marginRight.split("px")[0]));
            let mainContainer1Width = mainContainer1.offsetWidth;
            let check = menuNav.scrollWidth - mainContainer1.offsetWidth;

            if (direction === "left") {
                if (marginLeftValue < 0 && !(Math.abs(marginLeftValue) < mainContainer1Width)) {
                    menuNav.style.marginLeft = `${Number(menuNav.style.marginLeft.split("px")[0]) + Math.abs(mainContainer1Width)}px`;
                    slideRight.classList.remove("hidden");
                } else {
                    menuNav.style.marginLeft = "0px";
                    slideLeft.classList.add("hidden");
                    slideRight.classList.remove("hidden");
                }
            } else {
                if (Math.abs(check) > Math.abs(marginLeftValue)) {
                    if (!(Math.abs(check) > Math.abs(marginLeftValue) + mainContainer1Width)) {
                        mainContainer1Width = Math.abs(check) - Math.abs(marginLeftValue);
                        slideRight.classList.add("hidden");
                    }
                    menuNav.style.marginLeft = `${Number(menuNav.style.marginLeft.split("px")[0]) - Math.abs(mainContainer1Width)}px`;
                    slideLeft.classList.remove("hidden");
                }
            }
            slideClick();
        };

        slideLeft?.addEventListener("click", () => handleSlide("left"));
        slideRight?.addEventListener("click", () => handleSlide("right"));
        checkHoriMenu();

        return () => {
            sidebar?.removeEventListener("mouseenter", mouseEntered);
            sidebar?.removeEventListener("mouseleave", mouseLeave);
            sidebar?.removeEventListener("click", icontextOpen);
            mainContentDiv?.removeEventListener("click", icontextClose);
            slideLeft?.removeEventListener("click", () => handleSlide("left"));
            slideRight?.removeEventListener("click", () => handleSlide("right"));
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <aside className="app-sidebar" id="sidebar">

            {/* <!-- Start::main-sidebar-header --> */}
            <div className="main-sidebar-header">
                <a href="index.html" className="header-logo">
                    <img src="../../src/assets/images/home/logo-shoppz.png" alt="logo" className="desktop-logo" />
                    <img src="../assets/images/brand-logos/toggle-dark.png" alt="logo" className="toggle-dark" />
                    <img src="../assets/images/brand-logos/desktop-dark.png" alt="logo" className="desktop-dark" />
                    <img src="../assets/images/brand-logos/toggle-logo.png" alt="logo" className="toggle-logo" />
                    <img src="../assets/images/brand-logos/toggle-white.png" alt="logo" className="toggle-white" />
                    <img src="../assets/images/brand-logos/desktop-white.png" alt="logo" className="desktop-white" />
                </a>
            </div>
            {/* <!-- End::main-sidebar-header --> */}

            {/* <!-- Start::main-sidebar --> */}
            <div className="main-sidebar" id="sidebar-scroll">

                {/* <!-- Start::nav --> */}
                <nav className="main-menu-container nav nav-pills flex-col sub-open">
                    <div className="slide-left" id="slide-left">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24"> <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path> </svg>
                    </div>
                    <ul className="main-menu">

                        <li className="slide__category"><span className="category-name">Web Apps</span></li>
                        {/* <!-- End::slide__category --> */}
                        {menuData.map((item) => (
                            <li key={item.key} className="slide has-sub ">
                                <Link to={item.link} className="side-menu__item" onClick={() => toggleMenu(item.key)}>

                                    <span className="side-menu__label">{item.label}</span>
                                    {item.subMenu && openMenus[item.key] && (
                                        <i className="ri-arrow-down-s-line side-menu__angle"></i>
                                    )}
                                </Link>
                                {item.subMenu && openMenus[item.key] && (
                                    <ul className="slide-menu child1 block">
                                        <li className="slide side-menu__label1">
                                            <a href="#">Apps</a>
                                        </li>
                                        <li className="slide has-sub">
                                            <a href="#" className="side-menu__item">Ecommerce
                                                <i className="ri-arrow-down-s-line side-menu__angle"></i></a>
                                            <ul className="slide-menu child2">
                                                <li className="slide">
                                                    <a href="add-products.html" className="side-menu__item">Add Products</a>
                                                </li>
                                                <li className="slide">
                                                    <a href="cart.html" className="side-menu__item">Cart</a>
                                                </li>

                                            </ul>
                                        </li>
                                        <li className="slide">
                                            <a href="full-calendar.html" className="side-menu__item">Full Calendar</a>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        ))}
                        {/* <!-- End::slide --> */}
                    </ul>
                    <div className="slide-right" id="slide-right"><svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24"> <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path> </svg></div>
                </nav>
                {/* <!-- End::nav --> */}

            </div>
            {/* <!-- End::main-sidebar --> */}

        </aside>
    )
}

export default Sidebar