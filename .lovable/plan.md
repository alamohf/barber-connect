

## Plano: Adicionar Imagens Padrão nos Estilos de Corte e Barba

### Objetivo

Adicionar um campo `defaultImage` em cada estilo de corte e barba que conterá a URL/path da imagem padrão. O usuário poderá customizar a imagem, mas sempre haverá um fallback para a imagem padrão original. No futuro, essas imagens serão carregadas via API.

---

### Arquitetura

```text
┌─────────────────────────────────────────────────────────────┐
│                    Fluxo de Imagens                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Imagem Customizada (customStyles) → Prioridade máxima   │
│  2. Imagem Padrão (defaultImage)      → Fallback            │
│  3. Ícone Lucide (icon)               → Último fallback     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### Alterações Necessárias

| Arquivo | Alteração |
|---------|-----------|
| `src/types/barber.ts` | Adicionar campo `defaultImage?: string` nas interfaces |
| `src/data/barberData.ts` | Adicionar URLs das imagens padrão em cada estilo |
| `src/contexts/CustomStylesContext.tsx` | Preservar `defaultImage` ao mesclar com customizações |
| `src/components/ServiceCard.tsx` | Usar `defaultImage` como fallback antes do ícone |

---

### Detalhes Técnicos

**1. src/types/barber.ts**

Adicionar campo `defaultImage` nas interfaces:

```text
export interface HaircutStyle {
  id: string;
  name: string;
  icon: string;
  description?: string;
  defaultImage?: string;  // ← NOVO: URL/path da imagem padrão
  imageData?: string;     // Imagem customizada pelo usuário
}

export interface BeardStyle {
  id: string;
  name: string;
  icon: string;
  description?: string;
  defaultImage?: string;  // ← NOVO: URL/path da imagem padrão
  imageData?: string;     // Imagem customizada pelo usuário
}
```

**2. src/data/barberData.ts**

Adicionar imagens padrão (placeholder por enquanto, será substituído por URLs reais ou API):

```text
export const haircutStyles: HaircutStyle[] = [
  {
    id: 'fade',
    name: 'Degradê',
    icon: 'TrendingDown',
    description: 'Corte com transição suave',
    defaultImage: '/images/haircuts/fade.jpg',  // ← NOVO
  },
  // ... demais estilos
];

export const beardStyles: BeardStyle[] = [
  {
    id: 'full',
    name: 'Barba Cheia',
    icon: 'Square',
    description: 'Barba completa e volumosa',
    defaultImage: '/images/beards/full.jpg',  // ← NOVO
  },
  // ... demais estilos
];
```

**3. src/contexts/CustomStylesContext.tsx**

Atualizar `getHaircutStyles` e `getBeardStyles` para preservar `defaultImage`:

```text
const getHaircutStyles = useCallback((): HaircutStyle[] => {
  return defaultHaircutStyles.map(style => {
    const custom = customStyles.find(c => c.originalId === style.id && c.type === 'haircut');
    if (custom) {
      return {
        ...style,  // Mantém defaultImage do original
        name: custom.name,
        imageData: custom.imageData,
      };
    }
    return style;
  });
}, [customStyles]);
```

**4. src/components/ServiceCard.tsx**

Atualizar lógica de renderização para usar a hierarquia de imagens:

```text
// Hierarquia: imageData (custom) → defaultImage → icon
const displayImage = imageData || defaultImage;

{displayImage ? (
  <div className="rounded-xl overflow-hidden ...">
    <img src={displayImage} alt={label} ... />
  </div>
) : (
  <DynamicIcon name={icon} ... />
)}
```

**5. Criar pasta para imagens**

Criar estrutura de pastas em `public/`:

```text
public/
├── images/
│   ├── haircuts/
│   │   ├── fade.jpg
│   │   ├── social.jpg
│   │   ├── undercut.jpg
│   │   ├── buzz.jpg
│   │   ├── pompadour.jpg
│   │   └── crew.jpg
│   └── beards/
│       ├── full.jpg
│       ├── designed.jpg
│       ├── goatee.jpg
│       ├── fade-beard.jpg
│       ├── stubble.jpg
│       └── clean.jpg
```

---

### Preparação para API (Futuro)

A estrutura já estará preparada para carregar imagens via API. Bastará:

1. Criar um hook `useStyles` que busca os estilos da API
2. A API retornará os estilos com URLs das imagens
3. Substituir as importações estáticas pelo hook

```text
// Futuro: src/hooks/useStyles.ts
export function useStyles() {
  const { data: haircutStyles } = useQuery({
    queryKey: ['haircut-styles'],
    queryFn: () => fetch('/api/styles/haircuts').then(r => r.json())
  });
  
  return { haircutStyles, beardStyles };
}
```

---

### Comportamento Final

1. **Sem customização**: Exibe `defaultImage` (imagem padrão do sistema)
2. **Com customização**: Exibe `imageData` (imagem do usuário)
3. **Reset**: Volta a exibir `defaultImage`
4. **Sem nenhuma imagem**: Fallback para ícone Lucide

---

### Próximos Passos (Após Aprovação)

1. Você precisará fornecer as imagens para os estilos (pode fazer upload aqui no chat)
2. Ou posso usar imagens placeholder até você ter as imagens finais

