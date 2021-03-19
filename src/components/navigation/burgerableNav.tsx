import React, { useContext, useState } from "react";
import FocusLock from "react-focus-lock";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import {
    MenuItem,
    SideMenuWrapper,
    BurgerButton,
    SideMenu,
    NavBar,
    HeaderMenu,
} from ".";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { useMediaQueryEffect } from "../../hooks";
import { ThemeContext } from "styled-components";

const MenuItems: MenuItem[] = [
    {
        name: "About me",
        href: "#introduction",
    },
    {
        name: "Projects",
        href: "#projects",
    },
    {
        name: "Skills",
        href: "#skills",
    },
    {
        name: "Contact",
        href: "#contact",
    },
];
const menuId = "burger-nav";

const BurgerableNavBar: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [isScrolled, setScrolled] = useState(false);
    const theme = useContext(ThemeContext);
    const isLargeScreen = useMediaQueryEffect(
        `(min-width: ${theme.breakpoints.lg})`
    );

    useScrollPosition(
        ({ prevPos, currPos }) => {
            const ScrollActivationThreshhold = -50;

            if (
                currPos.y < ScrollActivationThreshhold &&
                prevPos.y >= ScrollActivationThreshhold
            ) {
                setScrolled(true);
            } else if (
                currPos.y >= ScrollActivationThreshhold &&
                prevPos.y < ScrollActivationThreshhold
            ) {
                setScrolled(false);
            }
        },
        [isScrolled],
        null,
        false,
        300
    );

    return (
        <div>
            <FocusLock disabled={!open}>
                <AnimateSharedLayout>
                    <NavBar layout>
                        {isLargeScreen && (
                            <HeaderMenu
                                items={MenuItems}
                                isScrolled={isScrolled}
                            />
                        )}
                        <AnimatePresence>
                            {(isScrolled || !isLargeScreen) && (
                                <BurgerButton
                                    open={open}
                                    setOpen={setOpen}
                                    aria-controls={menuId}
                                />
                            )}
                        </AnimatePresence>
                    </NavBar>
                </AnimateSharedLayout>
                <AnimatePresence>
                    {open && (
                        <SideMenuWrapper setOpen={setOpen}>
                            <SideMenu
                                id={menuId}
                                items={MenuItems}
                                setOpen={setOpen}
                            />
                        </SideMenuWrapper>
                    )}
                </AnimatePresence>
            </FocusLock>
        </div>
    );
};

export default BurgerableNavBar;
