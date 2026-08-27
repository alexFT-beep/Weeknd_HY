---
name: framer-motion-animator
description: Creates smooth animations and micro-interactions using Framer Motion including page transitions, gestures, scroll-based animations, and orchestrated sequences. Use when users request "add animation", "framer motion", "page transition", "animate component", or "micro-interactions".
---

# Framer Motion Animator

Build delightful animations and interactions with Framer Motion's declarative API.

## Core Workflow
1. **Identify animation needs**: Entrance, exit, hover, gestures
2. **Choose animation type**: Simple, variants, gestures, layout
3. **Define motion values**: Opacity, scale, position, rotation
4. **Add transitions**: Duration, easing, spring physics
5. **Orchestrate sequences**: Stagger, delay, parent-child
6. **Optimize performance**: GPU-accelerated properties

## Installation
```bash
npm install framer-motion
```

## Basic Animations
### Simple Animation
```tsx
import { motion } from 'framer-motion';

// Animate on mount
export function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

// Animate on hover
export function ScaleOnHover({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
}
```
