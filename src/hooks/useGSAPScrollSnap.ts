'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar el plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
  screenWidth: number;
  screenHeight: number;
  orientation: 'portrait' | 'landscape';
}

interface UseGSAPScrollSnapOptions {
  snap?: boolean;
  duration?: number;
  ease?: string;
  directional?: boolean;
  onSnapComplete?: (snap: ScrollTrigger) => void;
  // Nuevas opciones responsive
  mobileConfig?: {
    snap?: boolean;
    duration?: number;
    ease?: string;
    reducedMotion?: boolean;
  };
  tabletConfig?: {
    snap?: boolean;
    duration?: number;
    ease?: string;
  };
  performanceMode?: 'auto' | 'high' | 'balanced' | 'battery';
}

// Utilidades para detección de dispositivos
const getDeviceInfo = (): DeviceInfo => {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isTouchDevice: false,
      screenWidth: 1920,
      screenHeight: 1080,
      orientation: 'landscape'
    };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const userAgent = navigator.userAgent.toLowerCase();
  
  const isMobile = width <= 768 || /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isTablet = width > 768 && width <= 1024 && isTouchDevice;
  const isDesktop = width > 1024 && !isTouchDevice;
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    isTouchDevice,
    screenWidth: width,
    screenHeight: height,
    orientation: width > height ? 'landscape' : 'portrait'
  };
};

// Hook para detectar cambios de orientación
const useOrientation = () => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  
  useEffect(() => {
    const updateOrientation = () => {
      setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
    };
    
    updateOrientation();
    window.addEventListener('resize', updateOrientation);
    window.addEventListener('orientationchange', updateOrientation);
    
    return () => {
      window.removeEventListener('resize', updateOrientation);
      window.removeEventListener('orientationchange', updateOrientation);
    };
  }, []);
  
  return orientation;
};

export const useGSAPScrollSnap = (options: UseGSAPScrollSnapOptions = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(getDeviceInfo());
  const orientation = useOrientation();
  
  const {
    snap = true,
    duration = 1,
    ease = 'power2.inOut',
    directional = false,
    onSnapComplete,
    mobileConfig = {},
    tabletConfig = {},
    performanceMode = 'auto'
  } = options;
  
  // Configuración adaptativa basada en dispositivo
  const getAdaptiveConfig = useCallback(() => {
    const baseConfig = { snap, duration, ease, directional };
    
    if (deviceInfo.isMobile) {
      return {
        snap: mobileConfig.snap ?? true,
        duration: mobileConfig.duration ?? (deviceInfo.isTouchDevice ? 0.8 : 1),
        ease: mobileConfig.ease ?? 'power1.inOut',
        directional: false, // Mejor para móviles
        reducedMotion: mobileConfig.reducedMotion ?? false
      };
    }
    
    if (deviceInfo.isTablet) {
      return {
        snap: tabletConfig.snap ?? true,
        duration: tabletConfig.duration ?? 0.9,
        ease: tabletConfig.ease ?? 'power1.inOut',
        directional: false
      };
    }
    
    return baseConfig;
  }, [deviceInfo, snap, duration, ease, directional, mobileConfig, tabletConfig]);
  
  // Actualizar información del dispositivo en resize
  useEffect(() => {
    const updateDeviceInfo = () => {
      setDeviceInfo(getDeviceInfo());
    };
    
    window.addEventListener('resize', updateDeviceInfo);
    return () => window.removeEventListener('resize', updateDeviceInfo);
  }, [performanceMode]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const panels = container.querySelectorAll('.panel');

    if (panels.length === 0) return;
    
    const config = getAdaptiveConfig();
    
    // Optimización de performance para dispositivos móviles
    const shouldReduceAnimations = deviceInfo.isMobile && (
      performanceMode === 'battery' || 
      (performanceMode === 'auto' && deviceInfo.screenWidth < 400)
    );
    
    // Configurar altura adaptativa de paneles
    panels.forEach((panel) => {
      const panelElement = panel as HTMLElement;
      if (deviceInfo.isMobile) {
        // En móviles, usar viewport height real considerando barras del navegador
        panelElement.style.minHeight = orientation === 'portrait' ? '100vh' : '100svh';
        panelElement.style.paddingTop = '1rem';
        panelElement.style.paddingBottom = '1rem';
      } else {
        panelElement.style.minHeight = '100vh';
        panelElement.style.paddingTop = '2rem';
        panelElement.style.paddingBottom = '2rem';
      }
    });

    // Configurar ScrollTrigger para cada panel con optimizaciones móviles
    panels.forEach((panel) => {
      const animationConfig = shouldReduceAnimations ? 
        { duration: 0.3, stagger: 0.05 } : 
        { duration: 0.8, stagger: 0.1 };
      
      ScrollTrigger.create({
        trigger: panel,
        start: deviceInfo.isMobile ? 'top 80%' : 'top bottom',
        end: deviceInfo.isMobile ? 'bottom 20%' : 'bottom top',
        onEnter: () => {
          if (!shouldReduceAnimations) {
            // Animación de entrada optimizada para dispositivo
            const yOffset = deviceInfo.isMobile ? 30 : 50;
            gsap.fromTo(panel.children, 
              { opacity: 0, y: yOffset },
              { 
                opacity: 1, 
                y: 0, 
                duration: animationConfig.duration, 
                stagger: animationConfig.stagger, 
                ease: config.ease,
                force3D: true // Optimización GPU
              }
            );
          }
        },
        onLeave: () => {
          // Limpiar animaciones en dispositivos de baja potencia
          if (shouldReduceAnimations) {
            gsap.set(panel.children, { clearProps: 'all' });
          }
        },
        onEnterBack: () => {
          if (!shouldReduceAnimations) {
            gsap.to(panel.children, {
              opacity: 1,
              y: 0,
              duration: animationConfig.duration * 0.7,
              ease: config.ease
            });
          }
        }
      });
    });

    // Configurar scroll snap adaptativo
     if (config.snap) {
       const adaptiveConfig = getAdaptiveConfig();
       
       // Usar función de snap más simple y confiable
       const snapFunction = (value: number) => {
         const panelHeight = window.innerHeight;
         return Math.round(value / panelHeight) * panelHeight;
       };
       
       ScrollTrigger.create({
         trigger: container,
         start: 'top top',
         end: 'bottom bottom',
         snap: {
           snapTo: snapFunction,
           duration: deviceInfo.isMobile ? 
             { min: 0.1, max: adaptiveConfig.duration * 0.8 } : 
             { min: 0.2, max: adaptiveConfig.duration },
           delay: deviceInfo.isMobile ? 0.05 : 0.1,
           ease: adaptiveConfig.ease,
           directional: adaptiveConfig.directional,
           onComplete: onSnapComplete
         }
       });

      // Crear labels para cada panel con configuración adaptativa
      panels.forEach((panel, index) => {
        const startPos = deviceInfo.isMobile ? 'top 60%' : 'top center';
        const endPos = deviceInfo.isMobile ? 'bottom 40%' : 'bottom center';
        
        ScrollTrigger.create({
          trigger: panel,
          start: startPos,
          end: endPos,
          id: `panel-${index}`,
          onToggle: (self) => {
            if (self.isActive) {
              panel.classList.add('active-panel');
              // Optimización para móviles: pausar animaciones en otros paneles
              if (deviceInfo.isMobile && shouldReduceAnimations) {
                panels.forEach((otherPanel, otherIndex) => {
                  if (otherIndex !== index) {
                    gsap.set(otherPanel.children, { willChange: 'auto' });
                  }
                });
                gsap.set(panel.children, { willChange: 'transform' });
              }
            } else {
              panel.classList.remove('active-panel');
            }
          }
        });
      });
    }

    // Función para navegar a una sección específica (optimizada para móviles)
    const scrollToPanel = (index: number) => {
      if (index >= 0 && index < panels.length) {
        const scrollConfig = {
          duration: config.duration,
          scrollTo: { 
            y: panels[index] as HTMLElement, 
            offsetY: deviceInfo.isMobile ? -10 : 0 // Pequeño offset para móviles
          },
          ease: config.ease
        };
        
        // En dispositivos táctiles, usar scroll nativo si está disponible
        if (deviceInfo.isTouchDevice && 'scrollIntoView' in panels[index]) {
          (panels[index] as Element).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        } else {
          gsap.to(window, scrollConfig);
        }
      }
    };

    // Función para navegar a la siguiente sección
    const scrollToNext = () => {
      const currentPanel = getCurrentPanelIndex();
      if (currentPanel < panels.length - 1) {
        scrollToPanel(currentPanel + 1);
      }
    };

    // Función para navegar a la sección anterior
    const scrollToPrev = () => {
      const currentPanel = getCurrentPanelIndex();
      if (currentPanel > 0) {
        scrollToPanel(currentPanel - 1);
      }
    };

    // Función para obtener el índice del panel actual
    const getCurrentPanelIndex = (): number => {
      const scrollY = window.scrollY;
      let currentIndex = 0;
      
      panels.forEach((panel, index) => {
        const rect = (panel as HTMLElement).getBoundingClientRect();
        const panelTop = scrollY + rect.top;
        if (scrollY >= panelTop - window.innerHeight / 2) {
          currentIndex = index;
        }
      });
      
      return currentIndex;
    };

    // Exponer funciones de navegación en el contenedor
    if (container) {
      Object.assign(container, {
        scrollToPanel,
        scrollToNext,
        scrollToPrev,
        getCurrentPanelIndex
      });
    }

    // Manejo de gestos táctiles para móviles
    if (deviceInfo.isTouchDevice) {
      let startY = 0;
      let startTime = 0;
      
      const handleTouchStart = (e: TouchEvent) => {
        startY = e.touches[0].clientY;
        startTime = Date.now();
      };
      
      const handleTouchEnd = (e: TouchEvent) => {
        const endY = e.changedTouches[0].clientY;
        const endTime = Date.now();
        const deltaY = startY - endY;
        const deltaTime = endTime - startTime;
        
        // Detectar swipe rápido (velocidad > 0.5px/ms)
        if (Math.abs(deltaY) > 50 && deltaTime < 300) {
          const currentIndex = getCurrentPanelIndex();
          if (deltaY > 0 && currentIndex < panels.length - 1) {
            scrollToNext();
          } else if (deltaY < 0 && currentIndex > 0) {
            scrollToPrev();
          }
        }
      };
      
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
      
      // Cleanup para eventos táctiles
      const cleanupTouch = () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      };
      
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        cleanupTouch();
      };
    }
    
    // Cleanup estándar
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [snap, duration, ease, directional, onSnapComplete, deviceInfo, orientation, getAdaptiveConfig]);

  // Función para refrescar ScrollTrigger (útil para cambios dinámicos)
  const refresh = () => {
    ScrollTrigger.refresh();
  };

  return {
    containerRef,
    refresh,
    deviceInfo,
    orientation,
    // Funciones de navegación expuestas
    scrollToPanel: (index: number) => {
      const container = containerRef.current;
      if (container && typeof (container as unknown as Record<string, unknown>).scrollToPanel === 'function') {
        ((container as unknown as Record<string, unknown>).scrollToPanel as (index: number) => void)(index);
      }
    },
    scrollToNext: () => {
      const container = containerRef.current;
      if (container && typeof (container as unknown as Record<string, unknown>).scrollToNext === 'function') {
        ((container as unknown as Record<string, unknown>).scrollToNext as () => void)();
      }
    },
    scrollToPrev: () => {
      const container = containerRef.current;
      if (container && typeof (container as unknown as Record<string, unknown>).scrollToPrev === 'function') {
        ((container as unknown as Record<string, unknown>).scrollToPrev as () => void)();
      }
    },
    getCurrentPanel: () => {
      const container = containerRef.current;
      if (container && typeof (container as unknown as Record<string, unknown>).getCurrentPanelIndex === 'function') {
        return ((container as unknown as Record<string, unknown>).getCurrentPanelIndex as () => number)();
      }
      return 0;
    }
  };
};

export default useGSAPScrollSnap;