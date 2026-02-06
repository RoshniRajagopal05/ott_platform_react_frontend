import React, { useState, useEffect } from 'react';
import '../styles/glass-landing.css';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'info':
        return 'ℹ';
      default:
        return '◆';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'success':
        return '#10b981';
      case 'error':
        return '#ff6b6b';
      case 'info':
        return '#4ecdc4';
      default:
        return '#667eea';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        zIndex: 10000,
        animation: 'slideInRight 0.3s ease-out forwards',
      }}
    >
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${getColor()}99`,
          borderRadius: '12px',
          padding: '16px 20px',
          color: 'white',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px ${getColor()}33`,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          minWidth: '300px',
          animation: 'pulse 0.5s ease-out',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: getColor(),
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            flexShrink: 0,
          }}
        >
          {getIcon()}
        </div>
        <div style={{ flex: 1 }}>{message}</div>
        <div
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: getColor(),
            animation: 'pulse 1.5s ease-in-out infinite',
            flexShrink: 0,
          }}
        />
      </div>
    </div>
  );
};

export default Toast;
