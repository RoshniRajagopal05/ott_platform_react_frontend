import React, { useEffect } from 'react';
import { FaSignOutAlt, FaTimes } from 'react-icons/fa';

const LogoutModal = ({ isOpen, userName, onConfirm, onCancel }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(5px)',
          zIndex: 9998,
          animation: 'fadeIn 0.3s ease-out'
        }}
        onClick={onCancel}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          animation: 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translate(-50%, -40%);
            }
            to {
              opacity: 1;
              transform: translate(-50%, -50%);
            }
          }

          @keyframes pulse-icon {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
          }
        `}</style>

        <div
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '24px',
            padding: '48px 40px',
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            maxWidth: '420px',
            width: '90%',
            textAlign: 'center',
            position: 'relative'
          }}
        >
          {/* Close button */}
          <button
            onClick={onCancel}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'rgba(255, 255, 255, 0.8)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <FaTimes size={18} />
          </button>

          {/* Icon */}
          <div
            style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(220, 38, 38, 0.3))',
              border: '2px solid rgba(239, 68, 68, 0.5)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              animation: 'pulse-icon 2s ease-in-out infinite',
              backdropFilter: 'blur(10px)'
            }}
          >
            <FaSignOutAlt
              style={{
                fontSize: '36px',
                color: '#ff6b6b',
                filter: 'drop-shadow(0 4px 12px rgba(255, 107, 107, 0.3))'
              }}
            />
          </div>

          {/* Title */}
          <h2
            style={{
              color: 'white',
              fontSize: '28px',
              fontWeight: '700',
              margin: '0 0 12px 0',
              background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.9) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Leaving Already?
          </h2>

          {/* Subtitle with user name */}
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '15px',
              margin: '0 0 28px 0',
              lineHeight: '1.6'
            }}
          >
            Hi <span style={{ color: 'rgba(255, 255, 255, 0.95)', fontWeight: '600' }}>{userName}</span>, are you sure you want to logout from MOOVIX?
          </p>

          {/* Divider */}
          <div
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
              margin: '24px 0'
            }}
          />

          {/* Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center'
            }}
          >
            {/* Cancel Button */}
            <button
              onClick={onCancel}
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(37, 99, 235, 0.6))',
                border: '1.5px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                padding: '14px 24px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '700',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(10px)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                boxShadow: '0 8px 24px rgba(59, 130, 246, 0.25)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(37, 99, 235, 0.8))';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 32px rgba(59, 130, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(37, 99, 235, 0.6))';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.25)';
              }}
            >
              Stay
            </button>

            {/* Logout Button */}
            <button
              onClick={onConfirm}
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.7), rgba(220, 38, 38, 0.7))',
                border: '1.5px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                padding: '14px 24px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '700',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(10px)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                boxShadow: '0 8px 24px rgba(239, 68, 68, 0.25)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.9))';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 32px rgba(239, 68, 68, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.7), rgba(220, 38, 38, 0.7))';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 24px rgba(239, 68, 68, 0.25)';
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;
