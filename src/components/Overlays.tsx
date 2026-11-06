import React from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  PhoneCall,
  Database,
  CheckCircle2,
  ArrowUpRight,
  Code2
} from 'lucide-react';
import { CatalogProduct } from '../data/catalogData';
import {
  CMSQuoteRecord,
  saveQuoteToCMS,
  openWhatsAppWithQuote
} from '../data/taxonomyData';

export interface CartItem {
  id: string;
  product: CatalogProduct;
  variantLabel: string;
  unitPrice: number;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemove,
  onClear
}) => {
  if (!isOpen) return null;

  const totalMXN = items.reduce((acc, it) => acc + it.unitPrice * it.quantity, 0);

  const handleCheckoutWhatsAppAndCMS = () => {
    if (items.length === 0) return;
    const summaryText = items
      .map((i) => `${i.quantity}x ${i.product.name} (${i.variantLabel})`)
      .join(', ');

    const saved = saveQuoteToCMS({
      type: 'COTIZACION_PRODUCTO',
      clientName: 'Pedido E-Commerce ARXEM',
      clientCompany: 'Carrito Web',
      clientPhone: 'WhatsApp Checkout',
      clientCity: 'México',
      summary: summaryText,
      specs: {
        itemsCount: items.length,
        totalMXN
      },
      estimatedTotalMXN: totalMXN,
      status: 'ENVIADO_WHATSAPP'
    });

    const lines = items.map(
      (it, idx) =>
        `${idx + 1}. *${it.product.name}* (${it.variantLabel}) — ${it.quantity} pza × $${it.unitPrice.toLocaleString('es-MX')} = *$${(it.unitPrice * it.quantity).toLocaleString('es-MX')} MXN*`
    );

    const msg = [
      `Hola *ARXEM®*, quiero finalizar mi pedido / cotización desde el carrito web (Folio CMS: *${saved.id}*):`,
      ``,
      ...lines,
      ``,
      `💰 *TOTAL ESTIMADO:* $${totalMXN.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`,
      ``,
      `Solicito datos de pago / liga de pago y confirmación de envío.`
    ].join('\n');

    openWhatsAppWithQuote(msg);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#0D1117]/10">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#0052FF]" />
              <h2 className="font-display font-extrabold text-lg text-[#0D1117]">
                Carrito E-Commerce & Cotizador
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#F7F7F4] text-[#0D1117]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <ShoppingBag className="w-10 h-10 text-[#0D1117]/25 mx-auto" />
              <div className="font-display font-bold text-base text-[#0D1117]">
                Tu carrito está vacío
              </div>
              <p className="text-xs text-[#0D1117]/60 max-w-xs mx-auto">
                Agrega productos del catálogo, vidrios emplomados o láminas de plomo para comprar en línea o solicitar cotización formal.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#0D1117]/10 my-4">
              {items.map((item) => (
                <div key={item.id} className="py-4 flex gap-3 items-start">
                  <img
                    src={item.product.media[0]}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-contain bg-[#F7F7F4] p-1.5 border border-[#0D1117]/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-xs text-[#0D1117] line-clamp-2">
                      {item.product.name}
                    </div>
                    <div className="font-mono text-[11px] text-[#0052FF] mt-0.5">
                      {item.variantLabel}
                    </div>
                    <div className="font-mono font-bold text-xs text-[#0D1117] mt-1">
                      ${(item.unitPrice * item.quantity).toLocaleString('es-MX', {
                        minimumFractionDigits: 2
                      })}{' '}
                      MXN
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="w-6 h-6 rounded bg-[#F7F7F4] font-mono text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="font-mono text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="w-6 h-6 rounded bg-[#F7F7F4] font-mono text-xs font-bold"
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="ml-auto text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="pt-4 border-t border-[#0D1117]/10 space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-xs uppercase text-[#0D1117]/60">Total Neto:</span>
              <span className="font-mono text-2xl font-extrabold text-[#0D1117]">
                ${totalMXN.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
              </span>
            </div>

            <button
              onClick={handleCheckoutWhatsAppAndCMS}
              className="w-full py-4 px-5 rounded-2xl bg-[#0D1117] hover:bg-[#0052FF] text-white font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Procesar Pedido / Cotizar en WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClear}
              className="w-full py-2 text-xs font-mono text-[#0D1117]/50 hover:text-red-600"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface CMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: CMSQuoteRecord[];
}

export const WixCMSModal: React.FC<CMSModalProps> = ({ isOpen, onClose, records }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl bg-white rounded-[32px] border border-[#0D1117]/15 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        <div className="p-6 bg-[#0D1117] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-[#60A5FA]" />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#60A5FA]">
                WIX HEADLESS CMS COLLECTION // ARXEM_CUSTOM_QUOTES
              </div>
              <h3 className="font-display font-bold text-lg">
                Registros de Medidas Personalizadas y Cotizaciones ({records.length})
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-[#F7F7F4]">
          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/25 text-xs text-[#0D1117]/80 flex items-start gap-3">
            <Code2 className="w-5 h-5 text-[#0052FF] shrink-0 mt-0.5" />
            <div>
              <strong>Preparado para Fase 2 (Wix Headless SDK):</strong> Cada cálculo de{' '}
              <em>Vidrio Emplomado Personalizado</em> o <em>Blindaje Personalizado</em> se almacena con esta estructura JSON exacta lista para sincronizar con{' '}
              <code>@wix/data</code> (`items.insert('CustomQuotes', payload)`) antes de disparar la ventana de WhatsApp.
            </div>
          </div>

          {records.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#0D1117]/50 font-mono">
              Aún no has guardado cálculos personalizados en esta sesión. Usa las calculadoras de Vidrio Emplomado o Blindaje Personalizado para probar el guardado en CMS.
            </div>
          ) : (
            records.map((rec) => (
              <div
                key={rec.id}
                className="rounded-2xl bg-white border border-[#0D1117]/10 p-5 space-y-2 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0D1117] text-amber-300 font-mono text-[11px] font-bold">
                    {rec.id} · {rec.type}
                  </span>
                  <span className="font-mono text-xs text-emerald-700 font-bold">
                    ✓ {rec.status} ({rec.createdAt})
                  </span>
                </div>
                <div className="font-display font-bold text-sm text-[#0D1117]">
                  {rec.summary}
                </div>
                <div className="text-xs text-[#0D1117]/65">
                  Cliente: <strong>{rec.clientName}</strong> ({rec.clientCompany} · {rec.clientCity}) — Total Estimado:{' '}
                  <strong className="text-[#0052FF]">
                    ${rec.estimatedTotalMXN.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                  </strong>
                </div>
                <pre className="p-3 rounded-xl bg-[#0D1117] text-emerald-300 font-mono text-[10px] overflow-x-auto">
                  {JSON.stringify(rec.specs, null, 2)}
                </pre>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

