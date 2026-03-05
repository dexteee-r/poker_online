# SKILL: Modern UI/UX Web Design

## Overview

Ce skill permet à l'IA de concevoir et implémenter des interfaces web modernes, esthétiques et fonctionnelles. L'objectif est de créer des expériences utilisateur exceptionnelles en respectant les principes fondamentaux du design contemporain, l'accessibilité (WCAG), et les meilleures pratiques de développement front-end avec React et Tailwind CSS.

---

## Core Principles

1. **Hiérarchie visuelle claire** : guider l'œil de l'utilisateur vers les éléments importants en premier
2. **Cohérence absolue** : maintenir une uniformité visuelle à travers toute l'interface
3. **Accessibilité native** : concevoir pour tous les utilisateurs, incluant ceux avec handicaps
4. **Mobile-first** : concevoir d'abord pour mobile, puis adapter aux écrans plus grands
5. **Minimalisme fonctionnel** : chaque élément doit avoir une raison d'exister
6. **Feedback immédiat** : informer l'utilisateur de chaque interaction
7. **Performance visuelle** : optimiser pour un rendu rapide et fluide
8. **Espacement généreux** : utiliser le whitespace comme élément de design actif

---

## Detailed Guidelines

### Système de Couleurs

#### Palette de base
- **Primaire** : couleur principale de la marque (actions principales, CTAs)
- **Secondaire** : couleur complémentaire (éléments d'accentuation)
- **Neutres** : échelle de gris pour textes et backgrounds
- **Sémantiques** : success (vert), warning (orange), error (rouge), info (bleu)

```javascript
// Tailwind config - Modern color palette
const colors = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    700: '#404040',
    900: '#171717',
  },
  semantic: {
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  }
};
```

#### Contraste et accessibilité
- Ratio minimum **4.5:1** pour le texte normal
- Ratio minimum **3:1** pour le texte large (≥18px bold ou ≥24px)
- Toujours tester avec des outils comme WebAIM Contrast Checker

### Typographie

#### Échelle typographique moderne
```css
/* Modern type scale - 1.250 ratio (Major Third) */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

#### Règles typographiques
- **Titres** : font-weight 600-700, line-height 1.2-1.3
- **Corps de texte** : font-weight 400, line-height 1.5-1.7
- **Longueur de ligne idéale** : 60-75 caractères maximum
- **Familles recommandées** : Inter, Plus Jakarta Sans, Geist, DM Sans

### Système d'Espacement

Utiliser une échelle cohérente basée sur un multiple de 4px :

```jsx
// Spacing scale (Tailwind default)
const spacing = {
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem', // 40px
  12: '3rem',   // 48px
  16: '4rem',   // 64px
};
```

### Composants UI Modernes

#### Boutons
```jsx
// Primary Button - Modern style
function PrimaryButton({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        inline-flex items-center justify-center
        px-5 py-2.5
        text-sm font-medium text-white
        bg-primary-600 hover:bg-primary-700
        rounded-lg
        shadow-sm hover:shadow-md
        transition-all duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-600
        active:scale-[0.98]
      "
    >
      {children}
    </button>
  );
}

// Secondary Button
function SecondaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        inline-flex items-center justify-center
        px-5 py-2.5
        text-sm font-medium text-neutral-700
        bg-white hover:bg-neutral-50
        border border-neutral-300 hover:border-neutral-400
        rounded-lg
        shadow-sm
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
      "
    >
      {children}
    </button>
  );
}
```

#### Cards modernes
```jsx
function Card({ title, description, image, action }) {
  return (
    <article className="
      group
      bg-white
      rounded-2xl
      border border-neutral-200
      shadow-sm hover:shadow-lg
      overflow-hidden
      transition-all duration-300 ease-out
      hover:-translate-y-1
    ">
      {image && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={image} 
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
          {title}
        </h3>
        <p className="text-neutral-600 text-sm leading-relaxed mb-4">
          {description}
        </p>
        {action && (
          <a 
            href={action.href}
            className="
              inline-flex items-center gap-1.5
              text-sm font-medium text-primary-600 hover:text-primary-700
              transition-colors
            "
          >
            {action.label}
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}
```

#### Inputs et formulaires
```jsx
function TextInput({ label, placeholder, error, helperText, required }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-neutral-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className={`
          w-full px-4 py-2.5
          text-sm text-neutral-900 placeholder:text-neutral-400
          bg-white
          border rounded-lg
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-0
          ${error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
            : 'border-neutral-300 hover:border-neutral-400 focus:border-primary-500 focus:ring-primary-200'
          }
        `}
      />
      {(error || helperText) && (
        <p className={`text-xs ${error ? 'text-red-600' : 'text-neutral-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}
```

### Responsive Design

#### Breakpoints standards
```javascript
// Tailwind default breakpoints
const breakpoints = {
  sm: '640px',   // Phones landscape
  md: '768px',   // Tablets
  lg: '1024px',  // Laptops
  xl: '1280px',  // Desktops
  '2xl': '1536px' // Large screens
};
```

#### Pattern de layout responsive
```jsx
function ResponsiveGrid({ children }) {
  return (
    <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      gap-4 sm:gap-6 lg:gap-8
    ">
      {children}
    </div>
  );
}
```

### Animations et Micro-interactions

#### Principes fondamentaux
- Durée idéale : **150-300ms** pour les micro-interactions
- Durée entrée/sortie : **200-500ms** pour les transitions de page
- Easing moderne : `ease-out` pour les entrées, `ease-in` pour les sorties

```jsx
// Smooth fade-in animation
function FadeIn({ children, delay = 0 }) {
  return (
    <div 
      className="animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Add to Tailwind config
const animation = {
  'fade-in': 'fadeIn 0.5s ease-out forwards',
};

const keyframes = {
  fadeIn: {
    '0%': { opacity: '0', transform: 'translateY(10px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
};
```

### États Interactifs

Chaque élément interactif **DOIT** avoir les états suivants :

| État | Description | Indicateur visuel |
|------|-------------|-------------------|
| Default | État initial | Style de base |
| Hover | Survol souris | Changement subtil de couleur/ombre |
| Focus | Focus clavier | Ring visible (outline) |
| Active | Clic en cours | Scale légèrement réduit |
| Disabled | Non disponible | Opacité réduite, cursor not-allowed |
| Loading | Chargement | Spinner ou skeleton |

---

## Technical Requirements

### Stack technologique

| Catégorie | Technologies |
|-----------|--------------|
| Framework | React 18+ avec hooks |
| Styling | Tailwind CSS 3.x |
| Icônes | Lucide React, Heroicons |
| Animations | Framer Motion (optionnel) |
| Fonts | Google Fonts / Fontsource |
| Accessibilité | @radix-ui/react-* |

### Dépendances essentielles
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "tailwindcss": "^3.4.0",
    "lucide-react": "^0.263.1",
    "@radix-ui/react-dialog": "^1.0.0",
    "@radix-ui/react-dropdown-menu": "^2.0.0"
  }
}
```

---

## Examples

### Landing Page Hero Section
```jsx
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50" />
      
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium text-primary-700 bg-primary-100 rounded-full">
          <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
          New Feature Available
        </span>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight mb-6">
          Build something{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
            amazing
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Create beautiful, responsive interfaces with modern design principles. 
          Ship faster with our comprehensive component library.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-3.5 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
            Get Started Free
          </button>
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-medium text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-xl transition-all duration-200">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
}
```

### Dashboard Card avec Stats
```jsx
function StatsCard({ title, value, change, trend, icon: Icon }) {
  const isPositive = trend === 'up';
  
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 bg-primary-50 rounded-xl">
          <Icon className="w-5 h-5 text-primary-600" />
        </div>
        <span className={`
          inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full
          ${isPositive 
            ? 'text-green-700 bg-green-100' 
            : 'text-red-700 bg-red-100'
          }
        `}>
          <svg 
            className={`w-3 h-3 ${!isPositive && 'rotate-180'}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          {change}%
        </span>
      </div>
      
      <p className="text-sm text-neutral-500 mb-1">{title}</p>
      <p className="text-2xl font-bold text-neutral-900">{value}</p>
    </div>
  );
}
```

---

## Common Pitfalls / Anti-patterns

❌ **NE PAS FAIRE :**

- **Surcharge visuelle** : accumuler trop d'éléments, couleurs, ou animations sur une même page
- **Ignorer l'accessibilité** : oublier les attributs `aria-*`, les labels, ou le focus visible
- **Contraste insuffisant** : utiliser du gris clair sur blanc ou des combinaisons illisibles
- **Incohérence des espacements** : mélanger des valeurs arbitraires (13px, 17px, 22px)
- **Oublier les états** : composants sans hover, focus, ou disabled
- **Animations excessives** : tout faire bouger rend l'interface épuisante
- **Texte trop petit** : descendre en dessous de 14px pour le contenu principal
- **Z-index anarchiques** : utiliser 9999, 99999, 999999 sans stratégie
- **Mobile négligé** : concevoir uniquement pour desktop puis "adapter"
- **Icônes incohérentes** : mélanger plusieurs bibliothèques d'icônes avec des styles différents
- **Formulaires sans validation visuelle** : ne pas indiquer clairement les erreurs
- **Touch targets trop petits** : boutons de moins de 44x44px sur mobile

```jsx
// ❌ MAUVAIS EXEMPLE - À NE PAS REPRODUIRE
function BadButton() {
  return (
    <button style={{ 
      background: 'blue', 
      color: '#eee',           // Contraste insuffisant
      padding: '3px 7px',      // Touch target trop petit
      fontSize: '11px',        // Texte trop petit
      // Pas de focus state
      // Pas de hover state
    }}>
      Click
    </button>
  );
}
```

---

## Best Practices

✅ **À FAIRE :**

- **Établir un design system** dès le départ avec tokens définis (couleurs, espacements, typographie)
- **Utiliser des composants Radix UI** pour l'accessibilité intégrée (Dialog, Dropdown, etc.)
- **Tester sur vrais appareils** : émulateurs ≠ expérience réelle
- **Implémenter le skeleton loading** plutôt que des spinners pour les contenus
- **Utiliser `prefers-reduced-motion`** pour respecter les préférences utilisateur
- **Grouper les éléments liés** visuellement avec des conteneurs ou espacement
- **Limiter les fonts** à 2 maximum (une pour titres, une pour corps)
- **Créer une échelle de z-index** documentée et cohérente
- **Tester avec lecteur d'écran** (VoiceOver, NVDA)
- **Optimiser les images** : formats modernes (WebP, AVIF), lazy loading
- **Utiliser CSS logical properties** pour l'internationalisation (RTL)

```jsx
// ✅ BON EXEMPLE - Pattern recommandé
function AccessibleDialog({ open, onClose, title, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />
        <Dialog.Content className="
          fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-full max-w-md p-6
          bg-white rounded-2xl shadow-xl
          animate-scale-in
          focus:outline-none
        ">
          <Dialog.Title className="text-lg font-semibold text-neutral-900 mb-4">
            {title}
          </Dialog.Title>
          {children}
          <Dialog.Close asChild>
            <button 
              className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-neutral-600 rounded-lg hover:bg-neutral-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

---

## Quality Criteria

### Checklist de validation UI/UX

| Critère | Vérification |
|---------|--------------|
| **Accessibilité** | Score Lighthouse ≥ 90 |
| **Contraste** | Ratio WCAG AA respecté (4.5:1 minimum) |
| **Navigation clavier** | Tous les éléments interactifs accessibles au Tab |
| **Focus visible** | Ring de focus visible sur tous les éléments |
| **Responsive** | Testé sur 320px, 768px, 1024px, 1440px |
| **Touch targets** | Minimum 44x44px sur mobile |
| **Cohérence** | Mêmes composants = même apparence partout |
| **Performance** | FCP < 1.8s, LCP < 2.5s, CLS < 0.1 |
| **États complets** | Hover, focus, active, disabled, loading présents |
| **Feedback utilisateur** | Actions confirmées visuellement |
| **Texte lisible** | Minimum 16px pour le corps de texte |
| **Hiérarchie** | Titres ordonnés (h1 → h2 → h3) |

### Tests automatisés recommandés
```bash
# Accessibilité
npx axe-core --exit

# Lighthouse CLI
npx lighthouse --only-categories=accessibility,best-practices

# Validation HTML
npx html-validate "dist/**/*.html"
```

---

## Edge Cases

### Dark Mode
```jsx
// Support du dark mode avec classe
function ThemeAwareCard({ children }) {
  return (
    <div className="
      bg-white dark:bg-neutral-900
      text-neutral-900 dark:text-neutral-100
      border border-neutral-200 dark:border-neutral-800
      rounded-2xl p-6
      transition-colors duration-200
    ">
      {children}
    </div>
  );
}
```

### Contenu dynamique / Long texte
```jsx
// Gestion du texte overflow
function TruncatedText({ text, lines = 2 }) {
  return (
    <p 
      className="text-neutral-600"
      style={{
        display: '-webkit-box',
        WebkitLineClamp: lines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}
    >
      {text}
    </p>
  );
}
```

### Slow Network / Loading States
```jsx
// Skeleton loader pour cards
function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 animate-pulse">
      <div className="w-12 h-12 bg-neutral-200 rounded-xl mb-4" />
      <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-neutral-200 rounded w-1/2" />
    </div>
  );
}
```

### Empty States
```jsx
// État vide avec action
function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 mb-6 bg-neutral-100 rounded-full flex items-center justify-center">
        <Inbox className="w-8 h-8 text-neutral-400" />
      </div>
      <h3 className="text-lg font-medium text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-500 max-w-sm mb-6">{description}</p>
      {action && (
        <button className="px-5 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors">
          {action}
        </button>
      )}
    </div>
  );
}
```

### Error States
```jsx
// Affichage d'erreur avec retry
function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center bg-red-50 rounded-2xl border border-red-100">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <h3 className="text-lg font-medium text-red-900 mb-2">Something went wrong</h3>
      <p className="text-red-700 text-sm max-w-sm mb-6">{message}</p>
      <button 
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-700 bg-white hover:bg-red-50 border border-red-200 rounded-lg transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}
```

### RTL Support (Right-to-Left)
```jsx
// Utilisation des propriétés logiques CSS
function RTLAwareComponent() {
  return (
    <div className="
      ps-6 pe-4       /* padding-inline-start/end */
      ms-auto         /* margin-inline-start */
      text-start      /* text-align: start */
      border-s-4      /* border-inline-start */
      border-primary-500
    ">
      Content compatible LTR et RTL
    </div>
  );
}
```

---

## Summary

Ce skill couvre l'ensemble des compétences nécessaires pour créer des interfaces web modernes, accessibles et performantes. Les points essentiels à retenir :

1. **Toujours commencer par mobile-first**
2. **L'accessibilité n'est pas optionnelle**
3. **La cohérence prime sur l'originalité**
4. **Chaque pixel doit avoir un but**
5. **Tester, tester, tester (vrais appareils, vrais utilisateurs)**