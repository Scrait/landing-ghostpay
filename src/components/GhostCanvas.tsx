import React, { useEffect, useRef } from 'react';

interface GhostCanvasProps {
  activeSection: string;
}

interface GhostState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  velocityX: number;
  velocityY: number;
  size: number;
  opacity: number;
  rotation: number;
  stretch: number;
}

const GhostCanvas: React.FC<GhostCanvasProps> = ({ activeSection }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ghost = useRef<GhostState>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    velocityX: 0,
    velocityY: 0,
    size: 50,
    opacity: 0.8,
    rotation: 0,
    stretch: 1
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Настройка размеров холста
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ghost.current.x = window.innerWidth / 2;
      ghost.current.y = window.innerHeight / 2;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Поиск ближайшего интерактивного элемента
    const findNearestElement = () => {
      const section = document.getElementById(activeSection);
      if (!section) return null;

      const elements = section.querySelectorAll('a, button, [data-interactive]');
      let closestElement: Element | null = null;
      let minDistance = Infinity;

      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const dx = rect.left + rect.width/2 - ghost.current.x;
        const dy = rect.top + rect.height/2 - ghost.current.y;
        const distance = Math.sqrt(dx*dx + dy*dy);

        if (distance < minDistance) {
          minDistance = distance;
          closestElement = element;
        }
      });

      return closestElement;
    };

    // Обновление целевой позиции
    const updateTargetPosition = () => {
      const element = findNearestElement();
      if (!element) {
        const section = document.getElementById(activeSection);
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        ghost.current.targetX = rect.left + rect.width/2;
        ghost.current.targetY = rect.top + rect.height/2;
        return;
      }

      const rect = element.getBoundingClientRect();
      const padding = 30;
      
      // Прилипание к ближайшему краю
      const distances = {
        left: ghost.current.x - (rect.left - padding),
        right: (rect.right + padding) - ghost.current.x,
        top: ghost.current.y - (rect.top - padding),
        bottom: (rect.bottom + padding) - ghost.current.y
      };

      const closestSide = Object.entries(distances).reduce(
        (acc, [key, value]) => value < acc.value ? { key, value } : acc,
        { key: 'left', value: Infinity }
      );

      switch(closestSide.key) {
        case 'left':
          ghost.current.targetX = rect.left - padding;
          ghost.current.targetY = rect.top + rect.height/2;
          break;
        case 'right':
          ghost.current.targetX = rect.right + padding;
          ghost.current.targetY = rect.top + rect.height/2;
          break;
        case 'top':
          ghost.current.targetX = rect.left + rect.width/2;
          ghost.current.targetY = rect.top - padding;
          break;
        case 'bottom':
          ghost.current.targetX = rect.left + rect.width/2;
          ghost.current.targetY = rect.bottom + padding;
          break;
      }
    };

    // Физика движения
    const updatePhysics = () => {
      const dx = ghost.current.targetX - ghost.current.x;
      const dy = ghost.current.targetY - ghost.current.y;
      const distance = Math.sqrt(dx*dx + dy*dy);

      // Плавное ускорение
      const acceleration = {
        x: dx * 0.005,
        y: dy * 0.005
      };

      ghost.current.velocityX = (ghost.current.velocityX + acceleration.x) * 0.95;
      ghost.current.velocityY = (ghost.current.velocityY + acceleration.y) * 0.95;

      ghost.current.x += ghost.current.velocityX;
      ghost.current.y += ghost.current.velocityY;

      // Эффект растяжения
      const speed = Math.sqrt(
        ghost.current.velocityX ** 2 + ghost.current.velocityY ** 2
      );
      ghost.current.stretch = Math.min(1.5, 1 + speed * 0.1);
      ghost.current.rotation = Math.atan2(ghost.current.velocityY, ghost.current.velocityX);
    };

    // Отрисовка призрака
    const drawGhost = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(ghost.current.x, ghost.current.y);
      ctx.rotate(ghost.current.rotation);
      ctx.globalAlpha = ghost.current.opacity;

      // Основное тело
      ctx.fillStyle = '#7AD0E6';
      ctx.beginPath();
      ctx.ellipse(
        0, 0,
        ghost.current.size * ghost.current.stretch,
        ghost.current.size / ghost.current.stretch,
        0, 0, Math.PI * 2
      );
      ctx.fill();

      // Щупальца
      ctx.beginPath();
      const tentacleCount = 5;
      const time = Date.now() * 0.002;
      
      for (let i = 0; i < tentacleCount; i++) {
        const angle = (i / tentacleCount) * Math.PI * 2 + time;
        const wave = Math.sin(angle * 4) * 15;
        
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(
          Math.cos(angle) * 40,
          Math.sin(angle) * 40 + wave,
          Math.cos(angle) * 60,
          Math.sin(angle) * 60 + wave * 0.5
        );
      }
      
      ctx.strokeStyle = '#7AD0E6';
      ctx.lineWidth = 8;
      ctx.stroke();

      // Глаза
      const eyeOffset = ghost.current.size * 0.3;
      ctx.fillStyle = '#1A1A1A';
      ctx.beginPath();
      ctx.arc(-eyeOffset, 0, ghost.current.size * 0.1, 0, Math.PI * 2);
      ctx.arc(eyeOffset, 0, ghost.current.size * 0.1, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Главный цикл анимации
    const animate = () => {
      updateTargetPosition();
      updatePhysics();
      drawGhost();
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [activeSection]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};

export default GhostCanvas;