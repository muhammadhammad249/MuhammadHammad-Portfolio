import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Portfolio Uncaught Error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#05060A',
            color: '#FFFFFF',
            padding: '24px',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          <div
            style={{
              maxWidth: '560px',
              padding: '36px',
              borderRadius: '24px',
              background: 'rgba(14, 16, 28, 0.85)',
              border: '1px solid #7C3AED',
              boxShadow: '0 24px 60px rgba(0,0,0,0.7), 0 0 30px rgba(124, 58, 237, 0.3)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#EF4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
                fontSize: '24px',
              }}
            >
              ⚠️
            </div>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 800,
                marginBottom: '12px',
                letterSpacing: '-0.02em',
              }}
            >
              Neural Interface Interruption
            </h2>
            <p
              style={{
                fontSize: '14px',
                color: '#94A3B8',
                lineHeight: 1.6,
                marginBottom: '24px',
              }}
            >
              An unexpected component anomaly occurred. The system has safely isolated the incident.
            </p>
            <button
              onClick={this.handleReload}
              style={{
                padding: '12px 28px',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #7C3AED, #22D3EE)',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Reboot Experience
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

