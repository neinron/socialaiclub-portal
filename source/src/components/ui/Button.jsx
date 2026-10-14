import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Button({
    children,
    variant = 'primary',
    className,
    href,
    ...props
}) {
    const buttonRef = useRef(null);
    const [mouseX, setMouseX] = useState(0.5);
    const [mouseY, setMouseY] = useState(0.5);

    const handlePointerMove = (e) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        setMouseX((e.clientX - rect.left) / rect.width);
        setMouseY((e.clientY - rect.top) / rect.height);
        if (props.onPointerMove) props.onPointerMove(e);
    };

    const baseStyles = "group relative inline-flex shrink-0 items-center justify-center rounded-[1rem] pt-[14px] pb-[13px] px-[22px] transition-all duration-300 font-body text-[16px] leading-[1.2em] font-bold cursor-pointer whitespace-nowrap";

    const variants = {
        primary: "ui-button-primary bg-[var(--bg-accent)] text-[var(--text-inverse)] border border-transparent shadow-sm active:bg-[var(--bg-accent-hover)] active:shadow-md",
        secondary: "ui-button-secondary bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-default)] shadow-sm active:bg-[var(--bg-surface-subtle)] active:shadow-md",
        white: "ui-button-secondary [--bg-surface-subtle:#f1f5f9] bg-white text-[#0a2d57] border border-[#e2e8f0] shadow-sm active:bg-slate-100 active:shadow-md",
        tertiary: "ui-button-tertiary bg-transparent text-[var(--text-primary)] border border-transparent active:border-[var(--border-default)] active:bg-[var(--active-overlay)]",
        glass: "ui-button-glass bg-[var(--bg-surface-glass)] backdrop-blur-md border border-[var(--border-default)] text-[var(--text-primary)] shadow-sm active:bg-[var(--active-overlay)] active:shadow-md"
    };

    const isExternalWebsiteHref = typeof href === 'string' && /^https?:\/\//i.test(href);
    const isExternalHref = typeof href === 'string' && /^(https?:|mailto:|tel:)/i.test(href);
    const isHashOnlyHref = typeof href === 'string' && href.startsWith('#');
    const useRouterLink = Boolean(href) && !isExternalHref && !isHashOnlyHref && !props.target;

    const mergedProps = {
        ref: buttonRef,
        onPointerMove: handlePointerMove,
        className: twMerge(baseStyles, variants[variant], className),
        style: {
            ...props.style,
            "--mx": `${mouseX * 100}%`,
            "--my": `${mouseY * 100}%`
        },
        ...(isExternalWebsiteHref ? {
            target: '_blank',
            rel: 'noopener noreferrer',
        } : {}),
        ...props
    };

    if (useRouterLink) {
        return (
            <Link to={href} {...mergedProps}>
                <span className="relative z-10">{children}</span>
            </Link>
        );
    }

    const Component = href ? 'a' : 'button';

    return (
        <Component href={href} {...mergedProps}>
            <span className="relative z-10">{children}</span>
        </Component>
    );
}
