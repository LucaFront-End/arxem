import React, { useState, useEffect, useCallback } from 'react';
import { Navbar, ActiveRoute } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { StoreView } from './views/StoreView';
import { ProductDetailView } from './views/ProductDetailView';
import { CustomGlassLanding } from './views/CustomGlassLanding';
import { CustomShieldingLanding } from './views/CustomShieldingLanding';
import { LeadGlassCampaignLanding } from './views/LeadGlassCampaignLanding';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { CartDrawer, WixCMSModal, CartItem } from './components/Overlays';
import {
  CATALOG_PRODUCTS,
  CatalogProduct,
  StorePillar,
  SectorSlug
} from './data/catalogData';
import { getSavedCMSQuotes, CMSQuoteRecord } from './data/taxonomyData';

const DEFAULT_PRODUCT =
  CATALOG_PRODUCTS.find((p) => p.id.includes('b2c5150a')) || CATALOG_PRODUCTS[0];

function slugifyProduct(product: CatalogProduct): string {
  const base = (product.slug || product.name)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const shortId = product.id.slice(0, 8);
  return `${base}-${shortId}`;
}

function parsePathname(pathname: string): {
  route: ActiveRoute;
  product: CatalogProduct;
} {
  const clean = pathname.replace(/\/+$/, '') || '/';

  if (clean === '/' || clean === '/home') {
    return { route: 'home', product: DEFAULT_PRODUCT };
  }
  if (clean === '/tienda') {
    return { route: 'tienda', product: DEFAULT_PRODUCT };
  }
  if (clean === '/nosotros') {
    return { route: 'nosotros', product: DEFAULT_PRODUCT };
  }
  if (clean === '/vidrio-personalizado') {
    return { route: 'vidrio-personalizado', product: DEFAULT_PRODUCT };
  }
  if (clean === '/blindaje-personalizado') {
    return { route: 'blindaje-personalizado', product: DEFAULT_PRODUCT };
  }
  if (clean === '/campana-vidrio' || clean === '/vidrio-emplomado') {
    return { route: 'campana-vidrio', product: DEFAULT_PRODUCT };
  }
  if (clean === '/contacto') {
    return { route: 'contacto', product: DEFAULT_PRODUCT };
  }
  if (clean.startsWith('/producto')) {
    const slugPart = clean.replace(/^\/producto\/?/, '');
    if (slugPart) {
      const matched = CATALOG_PRODUCTS.find(
        (p) =>
          slugifyProduct(p) === slugPart ||
          p.id === slugPart ||
          slugPart.endsWith(p.id.slice(0, 8)) ||
          p.slug === slugPart
      );
      if (matched) {
        return { route: 'producto', product: matched };
      }
    }
    return { route: 'producto', product: DEFAULT_PRODUCT };
  }

  return { route: 'home', product: DEFAULT_PRODUCT };
}

function buildUrlForRoute(route: ActiveRoute, product?: CatalogProduct): string {
  switch (route) {
    case 'home':
      return '/';
    case 'tienda':
      return '/tienda';
    case 'nosotros':
      return '/nosotros';
    case 'vidrio-personalizado':
      return '/vidrio-personalizado';
    case 'blindaje-personalizado':
      return '/blindaje-personalizado';
    case 'campana-vidrio':
      return '/campana-vidrio';
    case 'contacto':
      return '/contacto';
    case 'producto':
      return `/producto/${slugifyProduct(product || DEFAULT_PRODUCT)}`;
    default:
      return '/';
  }
}

export function App() {
  const initialLocation = parsePathname(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  const [activeRoute, setActiveRoute] = useState<ActiveRoute>(initialLocation.route);
  const [storeFilter, setStoreFilter] = useState<{
    pillar?: StorePillar;
    category?: string;
    subcategory?: string;
    sector?: SectorSlug;
  }>({ pillar: 'catalogo-general' });

  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct>(
    initialLocation.product
  );

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const [cmsRecords, setCmsRecords] = useState<CMSQuoteRecord[]>([]);
  const [cmsModalOpen, setCmsModalOpen] = useState(false);

  useEffect(() => {
    const refreshCMS = () => setCmsRecords(getSavedCMSQuotes());
    refreshCMS();
    window.addEventListener('arxem-cms-updated', refreshCMS);
    return () => window.removeEventListener('arxem-cms-updated', refreshCMS);
  }, []);

  // Sync browser Back / Forward navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parsePathname(window.location.pathname);
      setActiveRoute(parsed.route);
      if (parsed.route === 'producto') {
        setSelectedProduct(parsed.product);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = useCallback(
    (
      route: ActiveRoute,
      options?: {
        pillar?: StorePillar;
        category?: string;
        subcategory?: string;
        sector?: SectorSlug;
        productId?: string;
      }
    ) => {
      if (options && route === 'tienda') {
        setStoreFilter({
          pillar: options.pillar || 'catalogo-general',
          category: options.category,
          subcategory: options.subcategory,
          sector: options.sector
        });
      }

      let targetProd = selectedProduct;
      if (options?.productId) {
        const found = CATALOG_PRODUCTS.find((p) => p.id === options.productId);
        if (found) {
          targetProd = found;
          setSelectedProduct(found);
        }
      }

      setActiveRoute(route);
      const nextUrl = buildUrlForRoute(route, targetProd);
      if (window.location.pathname !== nextUrl) {
        window.history.pushState({ route }, '', nextUrl);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [selectedProduct]
  );

  const handleSelectProduct = useCallback((product: CatalogProduct) => {
    setSelectedProduct(product);
    setActiveRoute('producto');
    const nextUrl = buildUrlForRoute('producto', product);
    if (window.location.pathname !== nextUrl) {
      window.history.pushState({ route: 'producto', productId: product.id }, '', nextUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAddToCart = (
    product: CatalogProduct,
    variantLabel?: string,
    price?: number
  ) => {
    const label =
      variantLabel ||
      (product.variants.length > 0 ? product.variants[0].label : 'Estándar de Línea');
    const unitPrice =
      price !== undefined
        ? price
        : product.variants.length > 0
        ? product.variants[0].price
        : product.basePrice;

    const itemId = `${product.id}::${label}`;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          variantLabel: label,
          unitPrice,
          quantity: 1
        }
      ];
    });
    setCartOpen(true);
  };

  const handleUpdateCartQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartCount = cartItems.reduce((sum, it) => sum + it.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F4] text-[#0D1117]">
      <Navbar
        activeRoute={activeRoute}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        cmsCount={cmsRecords.length}
        onOpenCMSModal={() => setCmsModalOpen(true)}
      />

      <main className="flex-1">
        {activeRoute === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeRoute === 'tienda' && (
          <StoreView
            initialPillar={storeFilter.pillar}
            initialCategory={storeFilter.category}
            initialSubcategory={storeFilter.subcategory}
            initialSector={storeFilter.sector}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />
        )}

        {activeRoute === 'producto' && (
          <ProductDetailView
            product={selectedProduct}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />
        )}

        {activeRoute === 'vidrio-personalizado' && (
          <CustomGlassLanding
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onOpenCMSModal={() => setCmsModalOpen(true)}
          />
        )}

        {activeRoute === 'blindaje-personalizado' && (
          <CustomShieldingLanding
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onOpenCMSModal={() => setCmsModalOpen(true)}
          />
        )}

        {activeRoute === 'campana-vidrio' && (
          <LeadGlassCampaignLanding
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />
        )}

        {activeRoute === 'nosotros' && <AboutView onNavigate={handleNavigate} />}

        {activeRoute === 'contacto' && (
          <ContactView onOpenCMSModal={() => setCmsModalOpen(true)} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemove={handleRemoveCartItem}
        onClear={() => setCartItems([])}
      />

      <WixCMSModal
        isOpen={cmsModalOpen}
        onClose={() => setCmsModalOpen(false)}
        records={cmsRecords}
      />
    </div>
  );
}
export default App;
