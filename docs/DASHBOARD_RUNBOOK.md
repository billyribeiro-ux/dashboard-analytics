# Dashboard Runbook

## Quick Start

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm check` | Run Svelte type checking |
| `pnpm typecheck` | Run TypeScript checking |
| `pnpm lint` | Run ESLint and Prettier |
| `pnpm test` | Run unit tests |
| `pnpm test:e2e` | Run Playwright E2E tests |

## Architecture Overview

The Intelligence Command Center is organized into these key areas:

- **Shell Components**: Intelligence bar, navigation, warboard, insight rail
- **Widget System**: 15 specialized visualization components
- **Motion System**: GSAP-powered cinematic animations
- **State Management**: Svelte 5 runes for reactive state

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` | Open command palette |
| `⌘F` | Toggle focus mode |
| `⌘C` | Toggle compare period |
| `⌘E` | Export data |
| `⌘R` | Refresh data |
| `ESC` | Close overlays |

## Widget Development

To add a new widget:

1. Create component in `src/lib/components/widgets/`
2. Add to widget registry
3. Update type definitions
4. Add mock data support

## Troubleshooting

### Common Issues

**Build fails with type errors**
- Run `pnpm check` to identify Svelte-specific issues
- Run `pnpm typecheck` for TypeScript errors

**Motion animations not working**
- Check GSAP is installed: `pnpm list gsap`
- Verify no `prefers-reduced-motion` is active

**Styles not applying**
- Ensure Tailwind CSS v4 is properly configured
- Check CSS custom properties are defined
