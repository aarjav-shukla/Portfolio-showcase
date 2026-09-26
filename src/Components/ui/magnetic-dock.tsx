import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useReducedMotion, type MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagneticDockProps {
    items: DockItemData[]
    iconSize?: number
    maxScale?: number
    magneticDistance?: number
    showLabels?: boolean
    position?: "bottom" | "top" | "left" | "right"
    variant?: "glass" | "solid" | "transparent"
    className?: string
}

interface DockItemData {
    id: string
    label: string
    icon: React.ReactNode
    onClick?: () => void
    isActive?: boolean
    badge?: number
}

interface DockItemProps {
    item: DockItemData
    mouseX: MotionValue<number>
    iconSize: number
    maxScale: number
    magneticDistance: number
    showLabels: boolean
    isVertical: boolean
    reducedMotion: boolean
}

function DockItem({
    item,
    mouseX,
    iconSize,
    maxScale,
    magneticDistance,
    showLabels,
    isVertical,
    reducedMotion,
}: DockItemProps) {
    const ref = React.useRef<HTMLButtonElement>(null)
    const [isHovered, setIsHovered] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)
    const showLabel = showLabels && (isHovered || isFocused)

    const distance = useTransform(mouseX, (val: number) => {
        if (!ref.current) return magneticDistance + 1
        const rect = ref.current.getBoundingClientRect()
        const center = isVertical
            ? rect.top + rect.height / 2
            : rect.left + rect.width / 2
        return val - center
    })

    const scale = useTransform(distance, [-magneticDistance, 0, magneticDistance], [1, maxScale, 1])

    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 }
    const smoothScale = useSpring(scale, springConfig)

    const size = useTransform(smoothScale, (s) => s * iconSize)

    const y = useTransform(smoothScale, (s) => (s - 1) * -10)
    const smoothY = useSpring(y, springConfig)

    return (
        <motion.button
            ref={ref}
            type="button"
            tabIndex={0}
            aria-label={item.label}
            aria-current={item.isActive ? "page" : undefined}
            onClick={item.onClick}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
                "relative flex items-center justify-center appearance-none bg-transparent border-0 outline-none p-0 cursor-pointer rounded-2xl transition-colors duration-200"
            )}
            style={{
                width: reducedMotion ? iconSize : size,
                height: reducedMotion ? iconSize : size,
                y: reducedMotion || isVertical ? 0 : smoothY,
                x: reducedMotion || !isVertical ? 0 : smoothY,
                backgroundColor: 'transparent',
            }}
            whileTap={reducedMotion ? undefined : { scale: 0.9 }}
        >
            <motion.div
                className="relative w-full h-full rounded-2xl overflow-hidden group flex items-center justify-center transition-all duration-200 backdrop-blur-md"
                style={{
                    backgroundColor: isHovered ? '#18181b' : '#09090b',
                    borderColor: isHovered ? '#3f3f46' : '#27272a',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    boxShadow: isHovered
                        ? "0 8px 32px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.15)"
                        : "0 4px 12px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
            >
                <div aria-hidden="true" className="w-[60%] h-[60%] flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors duration-200">
                    {item.icon}
                </div>

                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, transparent 100%)",
                        opacity: isHovered ? 0.9 : 0.2,
                    }}
                />
            </motion.div>

            <AnimatePresence initial={false}>
                {item.badge !== undefined && item.badge > 0 && (
                    <motion.div
                        initial={reducedMotion ? false : { scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={reducedMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                        className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full text-xs font-bold font-mono flex items-center justify-center shadow-lg"
                        style={{
                            backgroundColor: '#27272a',
                            color: '#ffffff',
                            borderColor: '#3f3f46',
                            borderWidth: '1px',
                            borderStyle: 'solid'
                        }}
                    >
                        {item.badge > 99 ? "99+" : item.badge}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence initial={false}>
                {item.isActive && (
                    <motion.div
                        initial={reducedMotion ? false : { scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={reducedMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                        className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                    />
                )}
            </AnimatePresence>

            <AnimatePresence initial={false}>
                {showLabel && (
                    <motion.div
                        aria-hidden="true"
                        initial={reducedMotion ? false : { opacity: 0, y: 8, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.9 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-white text-xs font-bold font-sora tracking-tight whitespace-nowrap shadow-2xl pointer-events-none z-50 backdrop-blur-md"
                        style={{
                            backgroundColor: '#18181b',
                            color: '#ffffff',
                            borderColor: '#3f3f46',
                            borderWidth: '1px',
                            borderStyle: 'solid'
                        }}
                    >
                        {item.label}
                        <div
                            className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45"
                            style={{
                                backgroundColor: '#18181b',
                                borderRight: '1px solid #3f3f46',
                                borderBottom: '1px solid #3f3f46'
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                animate={{
                    boxShadow: isHovered
                        ? "0 0 25px rgba(255,255,255,0.12)"
                        : "0 0 0px rgba(255,255,255,0)",
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.button>
    )
}

function MagneticDock({
    items,
    iconSize = 56,
    maxScale = 1.5,
    magneticDistance = 150,
    showLabels = true,
    position = "bottom",
    className,
}: MagneticDockProps) {
    const mousePosition = useMotionValue(Infinity)
    const reducedMotion = useReducedMotion() ?? false
    const isVertical = position === "left" || position === "right"

    const handleMouseMove = React.useCallback(
        (e: React.MouseEvent) => {
            if (isVertical) {
                mousePosition.set(e.clientY)
            } else {
                mousePosition.set(e.clientX)
            }
        },
        [mousePosition, isVertical]
    )

    const handleMouseLeave = () => {
        mousePosition.set(Infinity)
    }

    const positionStyles = {
        bottom: "flex-row",
        top: "flex-row",
        left: "flex-col",
        right: "flex-col",
    }

    return (
        <motion.div
            onMouseMove={reducedMotion ? undefined : handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "inline-flex items-end gap-2 p-3 rounded-3xl backdrop-blur-xl shadow-2xl shadow-black bg-black border border-zinc-800",
                positionStyles[position],
                className
            )}
            style={{
                backgroundColor: '#000000',
                borderColor: '#27272a',
                borderWidth: '1px',
                borderStyle: 'solid'
            }}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {items.map((item) => (
                <DockItem
                    key={item.id}
                    item={item}
                    mouseX={mousePosition}
                    iconSize={iconSize}
                    maxScale={maxScale}
                    magneticDistance={magneticDistance}
                    showLabels={showLabels}
                    isVertical={isVertical}
                    reducedMotion={reducedMotion}
                />
            ))}
        </motion.div>
    )
}

function DockIconHome({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("w-full h-full", className)}
        >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    )
}

function DockIconSearch({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("w-full h-full", className)}
        >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    )
}

function DockIconFolder({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("w-full h-full", className)}
        >
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
    )
}

function DockIconMail({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("w-full h-full", className)}
        >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    )
}

function DockIconMusic({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("w-full h-full", className)}
        >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
        </svg>
    )
}

function DockIconSettings({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("w-full h-full", className)}
        >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    )
}

function DockIconTrash({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("w-full h-full", className)}
        >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
    )
}

export {
    MagneticDock,
    DockIconHome,
    DockIconSearch,
    DockIconFolder,
    DockIconMail,
    DockIconMusic,
    DockIconSettings,
    DockIconTrash,
    type MagneticDockProps,
    type DockItemData,
}
