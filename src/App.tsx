import React, { useState, useEffect } from 'react';
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

export function App() {
  const [activeRoute, setActiveRoute] = useState<ActiveRoute>('home');
  const [storeFilter, setStoreFilter] = useState<{
    pillar?: StorePillar;
    category?: string;
    subcategory?: string;
    sector?: SectorSlug;
  }>({ pillar: 'catalogo-general' });

  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct>(
    CATALOG_PRODUCTS.find((p) => p.id.includes('b2c5150a')) || CATALOG_PRODUCTS[0]
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

  const handleNavigate = (
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
    if (options?.productId) {
      const found = CATALOG_PRODUCTS.find((p) => p.id === options.productId);
      if (found) setSelectedProduct(found);
    }
    setActiveRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: CatalogProduct) => {
    setSelectedProduct(product);
    setActiveRoute('producto');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

