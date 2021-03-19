import React from "react";
import styled from "styled-components";
import {
    AnimatePresence,
    HTMLMotionProps,
    motion,
    Variants,
} from "framer-motion";
import { MenuItem } from ".";

const LinkList = styled(motion.ul).attrs((props) => ({
    ...props,
}))`
    display: flex;

    li {
        list-style: none;
    }

    a {
        margin: 0px 1rem;
        text-decoration: none;
        font-size: 1.5rem;
        color: ${(props) => props.theme.palette.font};
        font-weight: bold;
        color: ${(props) => props.theme.palette.fontSecondary};
    }
`;

const LinkListVariants: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            when: "beforeChildren",
        },
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.3,
            staggerDirection: -1,
            when: "afterChildren",
        },
    },
};

const ItemVariants: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.5,
        },
    },
};

interface HeaderMenuProps extends HTMLMotionProps<"nav"> {
    items: MenuItem[];
    isScrolled: boolean;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ items, isScrolled }) => {
    return (
        <LinkList
            layout
            variants={LinkListVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <AnimatePresence>
                {!isScrolled &&
                    items.map((item) => (
                        <motion.li
                            layout
                            key={item.name}
                            variants={ItemVariants}
                        >
                            <a href={item.href}>{item.name}</a>
                        </motion.li>
                    ))}
            </AnimatePresence>
        </LinkList>
    );
};

export default HeaderMenu;
