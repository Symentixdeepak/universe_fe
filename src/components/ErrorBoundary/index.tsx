import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console or error reporting service
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });
  }

  handleRefresh = () => {
    // Reset error state and reload the page
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    window.location.reload();
  };

  handleGoHome = () => {
    // Reset error state and navigate to home
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
            textAlign: 'center',
            backgroundColor: '#f5f5f5',
          }}
        >
          {/* Error Icon */}
          <ErrorOutlineIcon
            sx={{
              fontSize: 80,
              color: '#ff6b6b',
              mb: 3,
            }}
          />

          {/* Error Title */}
          <Typography
            variant="h4Bold"
            sx={{
              color: '#333',
              fontWeight: 600,
              mb: 2,
            }}
          >
            Oops! Something went wrong
          </Typography>

          {/* Error Description */}
          <Typography
            variant="bodyRegular"
            sx={{
              color: '#666',
              mb: 4,
              maxWidth: 500,
              lineHeight: 1.6,
            }}
          >
            We're sorry, but something unexpected happened. Don't worry, this has been
            logged and our team will look into it. Please try refreshing the page or
            go back to the homepage.
          </Typography>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <Box
              sx={{
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: 2,
                padding: 2,
                mb: 3,
                maxWidth: 600,
                textAlign: 'left',
                overflow: 'auto',
              }}
            >
              <Typography variant="subtitleBold" sx={{ color: '#d32f2f', mb: 1 }}>
                Error Details (Development Mode):
              </Typography>
              <Typography
                variant="caption"
                component="pre"
                sx={{
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  color: '#666',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </Typography>
            </Box>
          )}

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              onClick={this.handleRefresh}
              startIcon={<RefreshIcon />}
              sx={{
                backgroundColor: '#4CAF50',
                '&:hover': {
                  backgroundColor: '#45a049',
                },
              }}
            >
              Refresh Page
            </Button>
            
            <Button
              variant="outlined"
              onClick={this.handleGoHome}
              sx={{
                borderColor: '#2196F3',
                color: '#2196F3',
                '&:hover': {
                  borderColor: '#1976D2',
                  backgroundColor: 'rgba(33, 150, 243, 0.04)',
                },
              }}
            >
              Go to Homepage
            </Button>
          </Box>

          {/* Footer Message */}
          <Typography
            variant="caption"
            sx={{
              color: '#999',
              mt: 4,
              fontStyle: 'italic',
            }}
          >
            If this problem persists, please contact our support team.
          </Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;