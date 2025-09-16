// ✅ COMPLETELY DISABLED TELEMETRY SERVICE
class TelemetryService {
  constructor() {
    // Disabled - no initialization
  }

  generateSessionId() {
    return 'disabled';
  }

  collectPerformanceMetrics() {
    // Disabled
  }

  setupErrorTracking() {
    // Disabled
  }

  trackEvent(event_type, data = {}) {
    // Disabled - no tracking
  }

  scheduleBatchSend() {
    // Disabled
  }

  sendBatch() {
    // Disabled - no network calls
  }

  trackPageView(page_name) {
    // Disabled
  }

  trackShopView(shop_id, shop_name) {
    // Disabled
  }

  trackFormSubmission(form_name, success = true) {
    // Disabled
  }

  trackAPICall(endpoint, method, response_time, status_code) {
    // Disabled
  }
}

// Create global instance
const telemetry = new TelemetryService();
export default telemetry;
