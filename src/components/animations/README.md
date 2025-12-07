# Système d'Animations - Portfolio

Ce dossier contient tous les composants d'animation réutilisables pour le portfolio.

## 🎨 Composants Disponibles

### 1. **FadeIn**
Apparition en fondu avec mouvement directionnel.

```jsx
import { FadeIn } from '@/components/animations'

<FadeIn delay={0.2} direction="up" duration={0.6} distance={30}>
  <h1>Mon titre</h1>
</FadeIn>
```

**Props:**
- `delay` (number): Délai avant l'animation (secondes)
- `direction` ('up' | 'down' | 'left' | 'right'): Direction du mouvement
- `duration` (number): Durée de l'animation (secondes)
- `distance` (number): Distance de déplacement (pixels)

---

### 2. **ScaleIn**
Apparition avec effet de zoom (bounce).

```jsx
import { ScaleIn } from '@/components/animations'

<ScaleIn delay={0.3} scale={0.8} duration={0.5}>
  <Card>Mon contenu</Card>
</ScaleIn>
```

**Props:**
- `delay` (number): Délai avant l'animation
- `scale` (number): Échelle initiale (0.8 = 80%)
- `duration` (number): Durée de l'animation

---

### 3. **StaggerContainer & StaggerItem**
Animation en cascade pour les listes.

```jsx
import { StaggerContainer, StaggerItem } from '@/components/animations'

<StaggerContainer staggerDelay={0.1}>
  {items.map(item => (
    <StaggerItem key={item.id}>
      <Card>{item.content}</Card>
    </StaggerItem>
  ))}
</StaggerContainer>
```

**Props StaggerContainer:**
- `staggerDelay` (number): Délai entre chaque enfant (secondes)

**Props StaggerItem:**
- `direction` ('up' | 'down' | 'left' | 'right'): Direction du mouvement
- `distance` (number): Distance de déplacement

---

### 4. **AnimatedCard**
Carte avec animations hover dynamiques.

```jsx
import { AnimatedCard } from '@/components/animations'

<AnimatedCard hoverScale={1.05} hoverRotate={2}>
  <Card>Mon contenu</Card>
</AnimatedCard>
```

**Props:**
- `delay` (number): Délai d'apparition
- `hoverScale` (number): Échelle au survol
- `hoverRotate` (number): Rotation au survol (degrés)

---

### 5. **FloatingElement**
Élément flottant avec mouvement perpétuel.

```jsx
import { FloatingElement } from '@/components/animations'

<FloatingElement duration={3} distance={15}>
  <Icon />
</FloatingElement>
```

**Props:**
- `duration` (number): Durée d'un cycle complet
- `distance` (number): Distance de flottement (pixels)

---

### 6. **RotateIn**
Apparition avec rotation dynamique.

```jsx
import { RotateIn } from '@/components/animations'

<RotateIn delay={0.2} rotate={180} duration={0.7}>
  <Badge>Nouveau</Badge>
</RotateIn>
```

**Props:**
- `delay` (number): Délai avant l'animation
- `rotate` (number): Rotation initiale (degrés)
- `duration` (number): Durée de l'animation

---

### 7. **AnimatedButton**
Bouton avec effets dynamiques au hover.

```jsx
import { AnimatedButton } from '@/components/animations'

<AnimatedButton onClick={handleClick}>
  Cliquez-moi
</AnimatedButton>
```

---

## 🎯 Exemples d'Utilisation

### Hero Section Animée
```jsx
<FadeIn delay={0.2} direction="up">
  <ScaleIn delay={0.4} scale={0.7}>
    <h1>Titre Principal</h1>
  </ScaleIn>
</FadeIn>

<FadeIn delay={0.6} direction="up">
  <p>Description</p>
</FadeIn>

<FadeIn delay={0.8} direction="up">
  <Button>Call to Action</Button>
</FadeIn>
```

### Grille de Cartes Animées
```jsx
<StaggerContainer staggerDelay={0.1} className="grid grid-cols-3 gap-6">
  {projects.map((project, index) => (
    <StaggerItem key={project.id}>
      <AnimatedCard hoverScale={1.05} hoverRotate={2}>
        <ProjectCard {...project} />
      </AnimatedCard>
    </StaggerItem>
  ))}
</StaggerContainer>
```

### Badge Flottant
```jsx
<FloatingElement duration={3} distance={10}>
  <RotateIn rotate={360} duration={1}>
    <Badge>Nouveau</Badge>
  </RotateIn>
</FloatingElement>
```

---

## 📱 Optimisation Mobile

Toutes les animations sont optimisées pour mobile :
- Utilisation de `whileInView` avec `viewport={{ once: true }}`
- Pas de répétition des animations au scroll
- Performance optimale avec GPU acceleration

---

## ⚙️ Configuration Framer Motion

Les animations utilisent Framer Motion avec :
- Easings personnalisés pour des mouvements naturels
- Bounce effects pour un style moderne et dynamique
- Viewport detection pour animations au scroll

---

## 🎨 Style et Cohérence

Toutes les animations suivent le même style moderne et dynamique :
- Transitions fluides (0.3s - 0.8s)
- Effets de bounce subtils
- Scale et rotation pour du dynamisme
- Delays progressifs pour des animations en cascade
