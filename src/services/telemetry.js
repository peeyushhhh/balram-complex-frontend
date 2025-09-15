class TelemetryService {
  constructor() {
    this.apiUrl = 'https://balram-backend-clean-production.up.railway.app/api/telemetry';
    this.batchSize = 10;
    this.eventQueue = [];
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    
    // Auto-collect performance data
    this.collectPerformanceMetrics();
    this.setupErrorTracking();
  }

  // Generate unique session ID
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Collect browser performance metrics
  collectPerformanceMetrics() {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');
      
      this.trackEvent('performance', {
        page_load_time: navigation?.loadEventEnd - navigation?.navigationStart,
        dom_content_loaded: navigation?.domContentLoadedEventEnd - navigation?.navigationStart,
        first_paint: paint.find(p => p.name === 'first-paint')?.startTime,
        first_contentful_paint: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
        page_url: window.location.pathname,
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`
      });
    }
  }

  // Setup error tracking
  setupErrorTracking() {
    window.addEventListener('error', (event) => {
      this.trackEvent('error', {
        message: event.message,
        filename: event.filename,
        line: event.lineno,
        column: event.colno,
        stack: event.error?.stack,
        page_url: window.location.pathname
      });
    });

    // Track unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.trackEvent('error', {
        type: 'unhandled_promise_rejection',
        reason: event.reason,
        page_url: window.location.pathname
      });
    });
  }

  // Track custom events
  trackEvent(event_type, data = {}) {
    const event = {
      event_type,
      timestamp: Date.now(),
      session_id: this.sessionId,
      page_url: window.location.pathname,
      ...data
    };

    this.eventQueue.push(event);

    // Send batch when queue is full or after delay
    if (this.eventQueue.length >= this.batchSize) {
      this.sendBatch();
    } else {
      this.scheduleBatchSend();
    }
  }

  // Schedule batch sending
  scheduleBatchSend() {
    if (this.batchTimeout) return;
    
    this.batchTimeout = setTimeout(() => {
      if (this.eventQueue.length > 0) {
        this.sendBatch();
      }
    }, 5000); // Send every 5 seconds
  }

  // Send batch to backend
  async sendBatch() {
    if (this.eventQueue.length === 0) return;

    const events = [...this.eventQueue];
    this.eventQueue = [];
    
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
      this.batchTimeout = null;
    }

    try {
      await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ events })
      });
    } catch (error) {
      console.error('Failed to send telemetry:', error);
      // Re-queue events for retry
      this.eventQueue.unshift(...events);
    }
  }

  // Track page views
  trackPageView(page_name) {
    this.trackEvent('page_view', {
      page_name,
      referrer: document.referrer,
      load_time: Date.now() - this.startTime
    });
  }

  // Track shop interactions
  trackShopView(shop_id, shop_name) {
    this.trackEvent('shop_view', {
      shop_id,
      shop_name,
      view_duration: Date.now() - this.startTime
    });
  }

  // Track form submissions
  trackFormSubmission(form_name, success = true) {
    this.trackEvent('form_submission', {
      form_name,
      success,
      completion_time: Date.now() - this.startTime
    });
  }

  // Track API calls
  trackAPICall(endpoint, method, response_time, status_code) {
    this.trackEvent('api_call', {
      endpoint,
      method,
      response_time,
      status_code,
      success: status_code >= 200 && status_code < 400
    });
  }
}

// Create global instance
const telemetry = new TelemetryService();
export default telemetry;
