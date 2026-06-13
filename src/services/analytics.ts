/**
 * Google Analytics 4 integration via Google Tag Manager (GTM).
 *
 * This module handles:
 * - Google Consent Mode v2 (default-deny, then grant on user consent)
 * - Page view tracking via dataLayer events
 * - Custom event tracking via dataLayer events
 *
 * GA4 tags themselves are configured in the GTM dashboard at
 * https://tagmanager.google.com/ (container: GTM-KXCQK5TX).
 *
 * Respects the `atbh_cookie_consent` localStorage key:
 * - `'accepted'` → grants analytics storage consent
 * - `'essential'` → keeps analytics denied
 * - `null` (not set) → default denied
 */

const STORAGE_KEY = 'atbh_cookie_consent'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

/**
 * Initialize the dataLayer and set default consent state.
 * Must run before GTM loads to establish consent defaults.
 */
function initDataLayer(): void {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []

  function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }
  window.gtag = gtag

  // Set default consent state to denied (GDPR compliance)
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  })

  // Restore previously granted consent from a prior session
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'accepted') {
    gtag('consent', 'update', {
      analytics_storage: 'granted',
    })
  }
}

/**
 * Grant analytics consent — call when the user accepts cookies.
 * GTM's GA4 tags will begin collecting data.
 */
export function grantAnalyticsConsent(): void {
  if (typeof window === 'undefined') return
  if (window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
    })
  }
}

/**
 * Revoke analytics consent — call when the user rejects cookies.
 * GTM's GA4 tags will stop collecting data.
 */
export function revokeAnalyticsConsent(): void {
  if (typeof window === 'undefined') return
  if (window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
    })
  }
}

/**
 * Track a page view via dataLayer event.
 *
 * **GTM setup required:**
 * 1. Create a Custom Event trigger in GTM for event name `page_view`
 * 2. Add a GA4 tag that fires on this trigger to send a page_view event
 */
export function trackPageView(path: string, title?: string): void {
  if (typeof window === 'undefined') return
  if (localStorage.getItem(STORAGE_KEY) !== 'accepted') return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'page_view',
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  })
}

/**
 * Track a custom event via dataLayer event.
 *
 * **GTM setup required:**
 * 1. Create a Custom Event trigger in GTM for event name `custom_event`
 * 2. Add a GA4 tag that fires on this trigger, using `{{event_name}}` as the event parameter
 * 3. Pass additional event parameters through dataLayer variables
 */
export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === 'undefined') return
  if (localStorage.getItem(STORAGE_KEY) !== 'accepted') return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'custom_event',
    event_name: action,
    ...params,
  })
}

// Initialize dataLayer on module import
initDataLayer()
