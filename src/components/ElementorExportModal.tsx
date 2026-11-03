import React, { useState } from 'react';
import { X, Copy, Check, Code, Layers, FileText, CheckCircle2 } from 'lucide-react';

interface ElementorExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantName: string;
}

export const ElementorExportModal: React.FC<ElementorExportModalProps> = ({
  isOpen,
  onClose,
  restaurantName,
}) => {
  const [activeTab, setActiveTab] = useState<'elementor' | 'gutenberg' | 'woocommerce' | 'css'>('elementor');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const elementorTemplateJson = JSON.stringify(
    {
      version: '0.4',
      title: `${restaurantName} - Restaurant Landing Page`,
      type: 'page',
      content: [
        {
          id: 'hero_sec',
          elType: 'section',
          settings: {
            layout: 'full_width',
            background_background: 'classic',
            background_color: '#0d131a',
            padding: { unit: 'px', top: '90', bottom: '100', left: '20', right: '20' },
          },
          elements: [
            {
              id: 'col_hero_content',
              elType: 'column',
              settings: { _column_size: 60 },
              elements: [
                {
                  id: 'widget_kicker',
                  elType: 'widget',
                  widgetType: 'heading',
                  settings: {
                    title: 'Binchotan Wood Hearth · Prime Dry-Aged Cuts',
                    typography_typography: 'custom',
                    typography_font_size: { size: 13, unit: 'px' },
                    title_color: '#f59e0b',
                  },
                },
                {
                  id: 'widget_hero_h1',
                  elType: 'widget',
                  widgetType: 'heading',
                  settings: {
                    title: 'Exquisite Culinary Experience & Instant Online Ordering',
                    typography_typography: 'custom',
                    typography_font_family: 'Playfair Display',
                    typography_font_size: { size: 56, unit: 'px' },
                    title_color: '#ffffff',
                  },
                },
                {
                  id: 'widget_hero_btns',
                  elType: 'widget',
                  widgetType: 'button',
                  settings: {
                    text: 'Reserve Table',
                    button_type: 'primary',
                    background_color: '#f59e0b',
                    text_color: '#0d131a',
                  },
                },
              ],
            },
            {
              id: 'col_hero_image',
              elType: 'column',
              settings: { _column_size: 40 },
              elements: [
                {
                  id: 'widget_hero_dish_img',
                  elType: 'widget',
                  widgetType: 'image',
                  settings: {
                    image: { url: 'https://aurarestaurant.com/wp-content/uploads/wagyu-hero.jpg' },
                    border_border: 'solid',
                    border_color: 'rgba(245,158,11,0.25)',
                    border_radius: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16' },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    null,
    2
  );

  const gutenbergBlocksHtml = `<!-- wp:group {"style":{"color":{"background":"#0d131a","text":"#f8fafc"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-text-color has-background" style="background-color:#0d131a;color:#f8fafc;padding-top:4rem;padding-bottom:5rem">
  <!-- wp:columns {"verticalAlignment":"center"} -->
  <div class="wp-block-columns are-vertically-aligned-center">
    <!-- wp:column {"verticalAlignment":"center","width":"60%"} -->
    <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:60%">
      <!-- wp:paragraph {"style":{"typography":{"fontFamily":"var(--wp--preset--font-family--heading)","textTransform":"uppercase","letterSpacing":"2px"}},"textColor":"luminous-vivid-amber"} -->
      <p class="has-luminous-vivid-amber-color has-text-color" style="letter-spacing:2px;font-size:12px;font-weight:600">BINCHOTAN WOOD HEARTH · PRIME DRY-AGED CUTS</p>
      <!-- /wp:paragraph -->

      <!-- wp:heading {"level":1,"style":{"typography":{"fontFamily":"Playfair Display","lineHeight":"1.15"}}} -->
      <h1 class="wp-block-heading" style="font-family:Playfair Display;font-size:3.5rem;line-height:1.15">Exquisite Culinary Experience &amp; Instant Online Ordering</h1>
      <!-- /wp:heading -->

      <!-- wp:paragraph {"textColor":"slate-300","fontSize":"medium"} -->
      <p class="has-slate-300-color has-text-color has-medium-font-size">Where primal white-oak charcoal embers meet Michelin-calibre gastronomy at ${restaurantName}.</p>
      <!-- /wp:paragraph -->

      <!-- wp:buttons -->
      <div class="wp-block-buttons">
        <!-- wp:button {"backgroundColor":"luminous-vivid-amber","textColor":"black","style":{"border":{"radius":"8px"}}} -->
        <div class="wp-block-button"><a class="wp-block-button__link has-black-color has-luminous-vivid-amber-background-color has-text-color has-background wp-element-button" style="border-radius:8px;font-weight:700">Reserve Table</a></div>
        <!-- /wp:button -->
      </div>
      <!-- /wp:buttons -->
    </div>
    <!-- /wp:column -->

    <!-- wp:column {"verticalAlignment":"center","width":"40%"} -->
    <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:40%">
      <!-- wp:image {"sizeSlug":"large","linkDestination":"none","className":"aura-dish-glow"} -->
      <figure class="wp-block-image size-large aura-dish-glow"><img src="https://aurarestaurant.com/dish.jpg" alt="45-day Wagyu Ribeye"/></figure>
      <!-- /wp:image -->
    </div>
    <!-- /wp:column -->
  </div>
  <!-- /wp:columns -->
</div>
<!-- /wp:group -->`;

  const woocommerceShortcodes = `// ==========================================
// 1. WooCommerce Product Grid Shortcodes
// ==========================================
[products limit="6" columns="3" category="chef-specials" orderby="popularity"]
[products limit="4" columns="4" category="starters" orderby="menu_order"]
[products limit="4" columns="4" category="drinks" orderby="date"]

// ==========================================
// 2. Table Reservation Plugin Hooks (e.g. OpenTable / Bookly)
// ==========================================
[restaurant-reservations venue_id="1" date_format="Y-m-d" default_party_size="2"]

// ==========================================
// 3. Contactless QR Ordering Webhook (functions.php)
// ==========================================
add_action( 'woocommerce_new_order', 'aura_notify_kitchen_kds', 1, 1 );
function aura_notify_kitchen_kds( $order_id ) {
    $order = wc_get_order( $order_id );
    $table_number = $order->get_meta( '_table_number' );
    // Instant Webhook to Kitchen Display System (KDS) printer
    wp_remote_post( 'https://kds.aurarestaurant.internal/api/ticket', array(
        'body' => json_encode( array(
            'order_id' => $order_id,
            'table'    => $table_number,
            'items'    => $order->get_items(),
        )),
        'headers' => array( 'Content-Type' => 'application/json' ),
    ));
}`;

  const cssPalette = `/* ${restaurantName} - WordPress Dark Mode Theme Variables */
:root {
  --aura-bg-primary: #0d131a;     /* Deep Navy Charcoal Canvas */
  --aura-surface-card: #131b24;    /* Elevated Container Surface */
  --aura-surface-hover: #18222e;   /* Interactive Card Hover */
  --aura-text-main: #f8fafc;       /* Crisp White Headings */
  --aura-text-muted: #94a3b8;      /* Legible Slate Metadata */
  --aura-gold-accent: #f59e0b;     /* Amber Gold CTA & Accents */
  --aura-gold-hover: #d97706;      /* Amber Gold Active State */
  --aura-gold-glow: rgba(245, 158, 11, 0.22);
}

.aura-card-glow {
  background: var(--aura-surface-card);
  border: 1px solid rgba(245, 158, 11, 0.15);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 25px -5px var(--aura-gold-glow);
  border-radius: 16px;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.aura-card-glow:hover {
  transform: translateY(-4px);
  border-color: rgba(245, 158, 11, 0.4);
}`;

  const getActiveCode = () => {
    switch (activeTab) {
      case 'elementor':
        return elementorTemplateJson;
      case 'gutenberg':
        return gutenbergBlocksHtml;
      case 'woocommerce':
        return woocommerceShortcodes;
      case 'css':
        return cssPalette;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#131b24] border border-amber-500/30 rounded-2xl shadow-2xl z-10 flex flex-col max-h-[85vh] text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#0e1620]">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-serif font-bold text-base text-white">
                WordPress &amp; Elementor Code Exporter
              </h3>
              <p className="text-xs text-slate-400">
                Ready-to-deploy templates, block markup, and WooCommerce hooks for {restaurantName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close Export Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-slate-800 bg-[#101720]">
          <button
            onClick={() => setActiveTab('elementor')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'elementor'
                ? 'border-amber-400 text-amber-300 bg-[#131b24]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Elementor Template JSON</span>
          </button>

          <button
            onClick={() => setActiveTab('gutenberg')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'gutenberg'
                ? 'border-amber-400 text-amber-300 bg-[#131b24]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Gutenberg Blocks HTML</span>
          </button>

          <button
            onClick={() => setActiveTab('woocommerce')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'woocommerce'
                ? 'border-amber-400 text-amber-300 bg-[#131b24]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>WooCommerce &amp; KDS Hooks</span>
          </button>

          <button
            onClick={() => setActiveTab('css')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'css'
                ? 'border-amber-400 text-amber-300 bg-[#131b24]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>CSS Variables &amp; Glow</span>
          </button>
        </div>

        {/* Code Content */}
        <div className="p-6 flex-1 overflow-y-auto bg-[#0a0f14]">
          <pre className="text-xs font-mono text-amber-200/90 leading-relaxed whitespace-pre overflow-x-auto p-4 rounded-xl bg-slate-950 border border-slate-800">
            {getActiveCode()}
          </pre>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-[#0e1620] flex items-center justify-between text-xs">
          <span className="text-slate-400">
            Compatible with Elementor Pro 3.x, Gutenberg FSE, and WooCommerce 8.x
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all cursor-pointer shadow"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-950" />
                  <span>Copy Code Snippet</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
