import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  RoundedBox,
  Html,
  Float,
} from "@react-three/drei";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════
   Colors (brand-aligned)
   ═══════════════════════════════════════════════════ */

const C = {
  teal: "#2A9D8F",
  tealDark: "#1B7F72",
  coral: "#F4845F",
  ink: "#1F2937",
  ivory: "#F9FAFB",
  white: "#FFFFFF",
  wood: "#C4A882",
  woodDark: "#A68B6B",
  gray: "#9CA3AF",
  grayLight: "#E5E7EB",
  sage: "#7A9E7E",
  blue: "#3B82F6",
  yellow: "#F59E0B",
  red: "#EF4444",
  pink: "#EC4899",
  purple: "#8B5CF6",
  warmWhite: "#FDF8F0",
  screen: "#1E293B",
};

/* ═══════════════════════════════════════════════════
   Animation phase controller
   ═══════════════════════════════════════════════════ */

type Phase = "chaos" | "cleanup" | "mila";

/* ═══════════════════════════════════════════════════
   Desk
   ═══════════════════════════════════════════════════ */

function Desk() {
  return (
    <group>
      {/* Tabletop */}
      <RoundedBox args={[5, 0.12, 3]} radius={0.03} position={[0, 0, 0]}>
        <meshStandardMaterial color={C.wood} roughness={0.7} />
      </RoundedBox>
      {/* Legs */}
      {[
        [-2.2, -0.55, -1.2],
        [2.2, -0.55, -1.2],
        [-2.2, -0.55, 1.2],
        [2.2, -0.55, 1.2],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.06, 0.06, 1, 8]} />
          <meshStandardMaterial color={C.woodDark} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   Laptop
   ═══════════════════════════════════════════════════ */

function Laptop({
  screenContent,
}: {
  screenContent: React.ReactNode;
}) {
  const screenRef = useRef<THREE.Group>(null);

  return (
    <group position={[0, 0.06, -0.2]}>
      {/* Base */}
      <RoundedBox args={[1.6, 0.06, 1.1]} radius={0.02} position={[0, 0.03, 0]}>
        <meshStandardMaterial color="#B0B0B0" roughness={0.3} metalness={0.6} />
      </RoundedBox>
      {/* Keyboard recess */}
      <mesh position={[0, 0.062, -0.05]}>
        <boxGeometry args={[1.3, 0.003, 0.55]} />
        <meshStandardMaterial color="#7A7A7A" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Key rows */}
      {[0, 1, 2, 3, 4].map((row) => (
        <group key={row} position={[0, 0.064, -0.28 + row * 0.1]}>
          {Array.from({ length: 12 }).map((_, col) => (
            <mesh key={col} position={[-0.55 + col * 0.1, 0, 0]}>
              <boxGeometry args={[0.08, 0.004, 0.07]} />
              <meshStandardMaterial color="#6B6B6B" roughness={0.5} metalness={0.3} />
            </mesh>
          ))}
        </group>
      ))}
      {/* Trackpad */}
      <mesh position={[0, 0.063, 0.35]}>
        <boxGeometry args={[0.4, 0.002, 0.22]} />
        <meshStandardMaterial color="#A0A0A0" roughness={0.3} metalness={0.4} />
      </mesh>
      {/* Screen (hinged) */}
      <group ref={screenRef} position={[0, 0.06, -0.55]} rotation={[-0.25, 0, 0]}>
        <RoundedBox args={[1.6, 1.05, 0.04]} radius={0.02} position={[0, 0.525, 0]}>
          <meshStandardMaterial color="#B0B0B0" roughness={0.3} metalness={0.6} />
        </RoundedBox>
        {/* Screen face */}
        <mesh position={[0, 0.525, 0.022]}>
          <planeGeometry args={[1.44, 0.9]} />
          <meshBasicMaterial color={C.screen} />
        </mesh>
        {/* HTML overlay on screen */}
        <Html
          position={[0, 0.525, 0.025]}
          transform
          occlude={false}
          scale={0.085}
          style={{
            width: "340px",
            height: "210px",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {screenContent}
        </Html>
      </group>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   Screen UIs
   ═══════════════════════════════════════════════════ */

function ChaosScreen() {
  return (
    <div
      style={{
        width: 340,
        height: 210,
        background: "#fff",
        fontFamily: "Onest, sans-serif",
        fontSize: 9,
        overflow: "hidden",
        position: "relative",
        borderRadius: 4,
      }}
    >
      {/* Google Calendar mockup */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          padding: "4px 8px",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 2,
            background: "#4285f4",
          }}
        />
        <span style={{ fontWeight: 600, color: "#374151" }}>
          Google Calendar
        </span>
        <span style={{ color: "#9ca3af", marginLeft: "auto" }}>Февраль 2026</span>
      </div>
      <div style={{ padding: "4px 8px", display: "flex", gap: 3 }}>
        {["Пн", "Вт", "Ср", "Чт", "Пт"].map((d) => (
          <div
            key={d}
            style={{
              flex: 1,
              background: "#f3f4f6",
              borderRadius: 2,
              padding: "2px 0",
              textAlign: "center",
              fontSize: 7,
              color: "#6b7280",
            }}
          >
            {d}
          </div>
        ))}
      </div>
      {/* Filled slots */}
      <div style={{ padding: "2px 8px" }}>
        {[
          { t: "10:00 Анна М.", c: "#3b82f6" },
          { t: "11:30 Дмитрий К.", c: "#8b5cf6" },
          { t: "14:00 Елена В.", c: "#3b82f6" },
          { t: "15:30 ???", c: "#ef4444" },
          { t: "17:00 Ольга Р.", c: "#3b82f6" },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              background: s.c + "18",
              borderLeft: `2px solid ${s.c}`,
              padding: "2px 4px",
              marginBottom: 2,
              borderRadius: 2,
              fontSize: 7,
              color: "#374151",
            }}
          >
            {s.t}
          </div>
        ))}
      </div>
      {/* Zoom window overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 8,
          right: 8,
          background: "#1a1a2e",
          borderRadius: 4,
          padding: "6px 10px",
          color: "#fff",
          fontSize: 7,
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 2 }}>Zoom Meeting</div>
        <div style={{ color: "#9ca3af" }}>Подключение...</div>
      </div>
      {/* Tabs */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#f3f4f6",
          display: "flex",
          gap: 1,
          padding: "2px 4px",
          fontSize: 6,
        }}
      >
        {["Calendar", "Telegram Web", "Мой налог", "Zoom", "Notion"].map(
          (t, i) => (
            <div
              key={i}
              style={{
                background: i === 0 ? "#fff" : "#e5e7eb",
                padding: "2px 5px",
                borderRadius: "2px 2px 0 0",
                color: "#6b7280",
                whiteSpace: "nowrap",
              }}
            >
              {t}
            </div>
          )
        )}
      </div>
    </div>
  );
}

function MilaScreen() {
  return (
    <div
      style={{
        width: 340,
        height: 210,
        background: "#fff",
        fontFamily: "Onest, sans-serif",
        fontSize: 9,
        overflow: "hidden",
        borderRadius: 4,
      }}
    >
      {/* Sidebar */}
      <div style={{ display: "flex", height: "100%" }}>
        <div
          style={{
            width: 44,
            background: C.tealDark,
            padding: "8px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 6,
              background: C.coral,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 8,
            }}
          >
            М
          </div>
          {["📅", "👤", "📝", "💳", "📊"].map((icon, i) => (
            <div
              key={i}
              style={{
                fontSize: 11,
                opacity: i === 0 ? 1 : 0.5,
                filter: i === 0 ? "none" : "grayscale(0.5)",
              }}
            >
              {icon}
            </div>
          ))}
        </div>
        {/* Main content */}
        <div style={{ flex: 1, padding: 8 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            <span style={{ fontWeight: 700, color: C.ink, fontSize: 11 }}>
              Сегодня
            </span>
            <span style={{ color: "#9ca3af", fontSize: 7 }}>26 фев, среда</span>
          </div>
          {[
            { t: "10:00", n: "Анна М.", s: "Сессия", done: true },
            { t: "11:30", n: "Дмитрий К.", s: "Первичная", done: true },
            { t: "14:00", n: "Елена В.", s: "Сессия", done: false },
            { t: "16:00", n: "Михаил С.", s: "Консультация", done: false },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "3px 5px",
                marginBottom: 2,
                borderRadius: 3,
                background:
                  i === 2 ? C.teal + "15" : s.done ? "#f9fafb" : "transparent",
                opacity: s.done ? 0.6 : 1,
              }}
            >
              <span style={{ color: "#9ca3af", fontSize: 7, width: 22 }}>
                {s.t}
              </span>
              <span
                style={{
                  color: C.ink,
                  fontWeight: 500,
                  flex: 1,
                  fontSize: 8,
                }}
              >
                {s.n}
              </span>
              <span
                style={{
                  fontSize: 6,
                  padding: "1px 4px",
                  borderRadius: 2,
                  background: i === 2 ? C.teal + "20" : "#f3f4f6",
                  color: i === 2 ? C.teal : "#9ca3af",
                }}
              >
                {s.s}
              </span>
              {i === 2 && (
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: C.teal,
                  }}
                />
              )}
            </div>
          ))}
          {/* Bottom stats */}
          <div
            style={{
              marginTop: 8,
              padding: "4px 6px",
              background: "#f9fafb",
              borderRadius: 3,
              display: "flex",
              justifyContent: "space-between",
              fontSize: 7,
            }}
          >
            <span style={{ color: "#6b7280" }}>4 сессии · загрузка 80%</span>
            <span style={{ color: C.teal, fontWeight: 600 }}>+₽14 000</span>
          </div>
          {/* Notification */}
          <div
            style={{
              marginTop: 6,
              padding: "4px 6px",
              background: C.teal + "10",
              border: `1px solid ${C.teal}30`,
              borderRadius: 3,
              fontSize: 7,
              color: C.tealDark,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span>✓</span>
            <span>Заметка по сессии с Анной М. сохранена</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Animated item (flies away in phase 2)
   ═══════════════════════════════════════════════════ */

function ChaosItem({
  children,
  phase,
  delay,
  flyDirection,
  tooltip,
  position,
}: {
  children: React.ReactNode;
  phase: Phase;
  delay: number;
  flyDirection: [number, number, number];
  tooltip: string;
  position: [number, number, number];
}) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const startTime = useRef<number | null>(null);
  const initialPos = useRef(new THREE.Vector3(...position));

  useFrame((state) => {
    if (!ref.current) return;

    if (phase === "chaos") {
      startTime.current = null;
      ref.current.position.copy(initialPos.current);
      ref.current.scale.setScalar(1);
      ref.current.rotation.z = 0;
      // Gentle floating
      ref.current.position.y =
        initialPos.current.y + Math.sin(state.clock.elapsedTime * 1.2 + delay * 3) * 0.01;
    } else if (phase === "cleanup") {
      if (startTime.current === null) startTime.current = state.clock.elapsedTime;
      const elapsed = state.clock.elapsedTime - startTime.current;
      const t = Math.max(0, Math.min(1, (elapsed - delay) / 0.8));
      const ease = t * t * (3 - 2 * t); // smoothstep

      ref.current.position.x = initialPos.current.x + flyDirection[0] * ease * 3;
      ref.current.position.y = initialPos.current.y + flyDirection[1] * ease * 3 + ease * 0.5;
      ref.current.position.z = initialPos.current.z + flyDirection[2] * ease * 3;
      ref.current.scale.setScalar(1 - ease);
      ref.current.rotation.z = ease * (flyDirection[0] > 0 ? 0.8 : -0.8);
    } else {
      ref.current.scale.setScalar(0);
    }
  });

  return (
    <group
      ref={ref}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {children}
      {hovered && phase === "chaos" && (
        <Html
          position={[0, 0.4, 0]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
              background: C.ink,
              color: "#fff",
              padding: "6px 12px",
              borderRadius: 6,
              fontSize: 12,
              fontFamily: "Onest, sans-serif",
              whiteSpace: "nowrap",
              maxWidth: 220,
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            {tooltip}
          </div>
        </Html>
      )}
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   Specific items
   ═══════════════════════════════════════════════════ */

function Notebook() {
  return (
    <group>
      {/* Cover */}
      <RoundedBox args={[0.5, 0.04, 0.65]} radius={0.01}>
        <meshStandardMaterial color="#5B4A3F" roughness={0.8} />
      </RoundedBox>
      {/* Pages */}
      <mesh position={[0, 0.025, 0]}>
        <boxGeometry args={[0.47, 0.02, 0.62]} />
        <meshStandardMaterial color={C.warmWhite} roughness={0.9} />
      </mesh>
      {/* Pencil */}
      <group position={[0.3, 0.04, 0.1]} rotation={[0, 0.3, 0]}>
        {/* Body — hexagonal */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.012, 0.012, 0.35, 6]} />
          <meshStandardMaterial color="#E8C840" roughness={0.5} />
        </mesh>
        {/* Graphite tip — cone */}
        <mesh position={[0.2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.012, 0.05, 6]} />
          <meshStandardMaterial color="#C4A852" roughness={0.6} />
        </mesh>
        {/* Graphite point */}
        <mesh position={[0.24, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.004, 0.02, 8]} />
          <meshStandardMaterial color="#333" roughness={0.3} />
        </mesh>
        {/* Metal ferrule */}
        <mesh position={[-0.185, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.013, 0.013, 0.03, 8]} />
          <meshStandardMaterial color="#B8B8B8" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Eraser */}
        <mesh position={[-0.21, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.011, 0.011, 0.03, 8]} />
          <meshStandardMaterial color="#E88B8B" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

function StickyNote({ color, rotation = 0 }: { color: string; rotation?: number }) {
  return (
    <group rotation={[0, rotation, (Math.random() - 0.5) * 0.15]}>
      <mesh>
        <boxGeometry args={[0.22, 0.22, 0.003]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
    </group>
  );
}

function Phone() {
  return (
    <group>
      <RoundedBox args={[0.3, 0.02, 0.6]} radius={0.03}>
        <meshStandardMaterial color="#2D2D2D" roughness={0.3} metalness={0.7} />
      </RoundedBox>
      {/* Screen */}
      <mesh position={[0, 0.012, 0]}>
        <planeGeometry args={[0.26, 0.52]} />
        <meshBasicMaterial color="#1a1a2e" />
      </mesh>
      {/* Telegram chat mockup */}
      <Html
        position={[0, 0.015, 0]}
        transform
        scale={0.018}
        style={{
          width: "140px",
          height: "280px",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div
          style={{
            width: 140,
            height: 280,
            background: "#0e1621",
            fontFamily: "Onest, sans-serif",
            fontSize: 7,
            color: "#fff",
            overflow: "hidden",
            borderRadius: 6,
          }}
        >
          <div
            style={{
              background: "#17212b",
              padding: "6px 8px",
              borderBottom: "1px solid #242f3d",
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 8 }}>Елена В.</div>
            <div style={{ color: "#6b7280", fontSize: 6 }}>была 2ч назад</div>
          </div>
          <div style={{ padding: 6 }}>
            <div
              style={{
                background: "#182533",
                padding: "4px 6px",
                borderRadius: "6px 6px 6px 2px",
                marginBottom: 4,
                fontSize: 7,
              }}
            >
              Перенесём на четверг? 🙏
            </div>
            <div
              style={{
                background: "#2b5278",
                padding: "4px 6px",
                borderRadius: "6px 6px 2px 6px",
                marginLeft: "auto",
                width: "fit-content",
                fontSize: 7,
              }}
            >
              Да, в 14:00 подойдёт?
            </div>
            <div
              style={{
                background: "#182533",
                padding: "4px 6px",
                borderRadius: "6px 6px 6px 2px",
                marginTop: 4,
                fontSize: 7,
              }}
            >
              А можно в 15? У меня...
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}

function Mug() {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.1, 0.08, 0.25, 16]} />
        <meshStandardMaterial color={C.warmWhite} roughness={0.6} />
      </mesh>
      {/* Handle — vertical C-shape on the side */}
      <mesh position={[0.12, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.055, 0.015, 8, 16, Math.PI]} />
        <meshStandardMaterial color={C.warmWhite} roughness={0.6} />
      </mesh>
      {/* Coffee surface */}
      <mesh position={[0, 0.26, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.09, 16]} />
        <meshStandardMaterial color="#5C3D2E" roughness={0.3} />
      </mesh>
    </group>
  );
}

function Headphones() {
  return (
    <group rotation={[-Math.PI / 2, 0, 0.2]}>
      {/* Band */}
      <mesh>
        <torusGeometry args={[0.15, 0.015, 8, 32, Math.PI]} />
        <meshStandardMaterial color="#333" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Ear cups */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.15, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
          <meshStandardMaterial color="#222" roughness={0.4} metalness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function Calculator() {
  return (
    <group>
      <RoundedBox args={[0.3, 0.02, 0.45]} radius={0.01}>
        <meshStandardMaterial color="#2D2D2D" roughness={0.5} />
      </RoundedBox>
      {/* Screen */}
      <mesh position={[0, 0.012, -0.12]}>
        <boxGeometry args={[0.24, 0.003, 0.1]} />
        <meshStandardMaterial color="#a8d5a0" emissive="#a8d5a0" emissiveIntensity={0.3} />
      </mesh>
      {/* Buttons grid */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            -0.08 + (i % 3) * 0.08,
            0.012,
            0.02 + Math.floor(i / 3) * 0.07,
          ]}
        >
          <boxGeometry args={[0.05, 0.005, 0.045]} />
          <meshStandardMaterial color="#444" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function Envelope() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.5, 0.003, 0.3]} />
        <meshStandardMaterial color={C.warmWhite} roughness={0.9} />
      </mesh>
      {/* Red stripe */}
      <mesh position={[0, 0.003, -0.12]}>
        <boxGeometry args={[0.5, 0.002, 0.04]} />
        <meshStandardMaterial color={C.red} roughness={0.8} />
      </mesh>
      {/* FNS label */}
      <mesh position={[0, 0.004, 0.05]}>
        <boxGeometry args={[0.2, 0.002, 0.04]} />
        <meshStandardMaterial color={C.blue} roughness={0.8} />
      </mesh>
    </group>
  );
}

function ClientFolder() {
  return (
    <group>
      {/* Folder */}
      <RoundedBox args={[0.5, 0.06, 0.65]} radius={0.01}>
        <meshStandardMaterial color="#D4A86A" roughness={0.8} />
      </RoundedBox>
      {/* Tab */}
      <mesh position={[-0.1, 0.035, -0.32]}>
        <boxGeometry args={[0.15, 0.02, 0.04]} />
        <meshStandardMaterial color="#D4A86A" roughness={0.8} />
      </mesh>
      {/* Label strip */}
      <mesh position={[0, 0.033, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.25, 0.05, 0.002]} />
        <meshStandardMaterial color={C.ink} roughness={0.8} opacity={0.3} transparent />
      </mesh>
    </group>
  );
}

function Plant() {
  return (
    <group>
      {/* Pot */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.12, 0.09, 0.22, 12]} />
        <meshStandardMaterial color="#C17A5A" roughness={0.8} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.11, 12]} />
        <meshStandardMaterial color="#5C3D2E" roughness={0.9} />
      </mesh>
      {/* Leaves */}
      {[0, 0.8, 1.6, 2.4, 3.2, 4].map((angle, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(angle) * 0.08,
            0.35 + i * 0.04,
            Math.cos(angle) * 0.08,
          ]}
          rotation={[
            0.3 + Math.random() * 0.3,
            angle,
            0.2 + Math.random() * 0.3,
          ]}
        >
          <sphereGeometry args={[0.08, 8, 6]} />
          <meshStandardMaterial color={C.sage} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Cat() {
  return (
    <group>
      {/* Body (sleeping, curled) */}
      <mesh position={[0, 0.07, 0]} scale={[1.2, 0.6, 1]}>
        <sphereGeometry args={[0.12, 12, 8]} />
        <meshStandardMaterial color="#F5C49C" roughness={0.9} />
      </mesh>
      {/* Head */}
      <mesh position={[0.12, 0.1, 0]}>
        <sphereGeometry args={[0.07, 10, 8]} />
        <meshStandardMaterial color="#F5C49C" roughness={0.9} />
      </mesh>
      {/* Ears */}
      {[0.04, -0.04].map((z, i) => (
        <mesh key={i} position={[0.17, 0.16, z]} rotation={[0, 0, 0.3]}>
          <coneGeometry args={[0.025, 0.04, 4]} />
          <meshStandardMaterial color="#E8A87C" roughness={0.9} />
        </mesh>
      ))}
      {/* Tail */}
      <mesh position={[-0.15, 0.06, 0.08]} rotation={[0.5, 0.3, 0]}>
        <cylinderGeometry args={[0.015, 0.01, 0.15, 6]} />
        <meshStandardMaterial color="#F5C49C" roughness={0.9} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   Camera animation
   ═══════════════════════════════════════════════════ */

function CameraRig({ phase }: { phase: Phase }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0.5, 0));

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (phase === "chaos") {
      // Gentle orbit
      const angle = t * 0.08;
      camera.position.x = Math.sin(angle) * 0.3 + 3;
      camera.position.z = Math.cos(angle) * 0.3 + 3.5;
      camera.position.y = 2.5 + Math.sin(t * 0.3) * 0.1;
    } else if (phase === "cleanup") {
      // Pull back slightly
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, 2.5, 0.02);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 3, 0.02);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 2.8, 0.02);
    } else {
      // Focus on laptop screen
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0.3, 0.025);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 1.8, 0.025);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1.5, 0.025);
      target.current.lerp(new THREE.Vector3(0, 0.6, -0.3), 0.025);
    }

    camera.lookAt(target.current);
  });

  return null;
}

/* ═══════════════════════════════════════════════════
   Main scene
   ═══════════════════════════════════════════════════ */

function WorkspaceScene({ externalPhase }: { externalPhase: Phase | null }) {
  const [phase, setPhase] = useState<Phase>("chaos");
  const [userInteracted, setUserInteracted] = useState(false);
  const phaseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // External phase override
  useEffect(() => {
    if (externalPhase) {
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
      setPhase(externalPhase);
    }
  }, [externalPhase]);

  const startAnimation = useCallback(() => {
    if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);

    phaseTimerRef.current = setTimeout(() => {
      setPhase("cleanup");
      phaseTimerRef.current = setTimeout(() => {
        setPhase("mila");
      }, 3000);
    }, 4000);
  }, []);

  useEffect(() => {
    if (externalPhase) return; // Don't auto-start if manually controlled
    const autoStart = setTimeout(() => {
      if (!userInteracted) {
        startAnimation();
      }
    }, 3000);

    return () => {
      clearTimeout(autoStart);
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
    };
  }, [userInteracted, startAnimation, externalPhase]);

  const handleInteraction = () => {
    if (!userInteracted) {
      setUserInteracted(true);
      if (!externalPhase) {
        setTimeout(() => startAnimation(), 3000);
      }
    }
  };

  const screenContent = useMemo(() => {
    return phase === "mila" ? <MilaScreen /> : <ChaosScreen />;
  }, [phase]);

  return (
    <>
      <CameraRig phase={phase} />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[4, 6, 3]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        color="#FFF5E6"
      />
      <directionalLight position={[-3, 4, -2]} intensity={0.3} color="#E0E8FF" />
      <pointLight position={[-1.5, 1.5, 1]} intensity={0.5} color="#FFE4C4" distance={5} />

      {/* Floor */}
      <mesh position={[0, -1.06, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#E8DDD0" roughness={0.9} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 1.5, -3]} receiveShadow>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial color="#F0EBE3" roughness={0.95} />
      </mesh>

      {/* Desk */}
      <Desk />

      {/* Laptop (always visible) */}
      <Laptop screenContent={screenContent} />

      {/* Mug (always visible) */}
      <group position={[1.5, 0.06, 0.6]}>
        <Mug />
      </group>

      {/* Headphones (always visible) */}
      <group position={[-1.6, 0.1, 0.8]}>
        <Headphones />
      </group>

      {/* Cat (always visible, sleeping on desk edge) */}
      <group position={[2, 0.06, -0.3]}>
        <Float speed={0.5} floatIntensity={0.05} rotationIntensity={0}>
          <Cat />
        </Float>
      </group>

      {/* Plant (background, always visible) */}
      <group position={[-2.8, 0, -2]}>
        <Plant />
      </group>

      {/* ─── CHAOS ITEMS (fly away in phase 2) ─── */}

      <ChaosItem
        phase={phase}
        delay={0}
        flyDirection={[-1, 0.5, 0.3]}
        tooltip="15 минут после каждой сессии"
        position={[-0.9, 0.09, 0.5]}
      >
        <group rotation={[0, 0.15, 0]} onClick={handleInteraction}>
          <Notebook />
        </group>
      </ChaosItem>

      <ChaosItem
        phase={phase}
        delay={0.15}
        flyDirection={[1.2, 0.8, 0.5]}
        tooltip="Перенесём на четверг?.. Опять переписка"
        position={[1.1, 0.06, 0.1]}
      >
        <group rotation={[0, -0.2, 0]} onClick={handleInteraction}>
          <Phone />
        </group>
      </ChaosItem>

      <ChaosItem
        phase={phase}
        delay={0.3}
        flyDirection={[0, 1, -0.5]}
        tooltip="Анна М. — перезвонить!"
        position={[-0.1, 0.85, -0.72]}
      >
        <group onClick={handleInteraction}>
          <StickyNote color="#FBBF24" rotation={0.05} />
        </group>
      </ChaosItem>

      <ChaosItem
        phase={phase}
        delay={0.4}
        flyDirection={[0.3, 1.2, -0.3]}
        tooltip="Дмитрий — не оплатил 2 сессии"
        position={[0.25, 0.92, -0.71]}
      >
        <group onClick={handleInteraction}>
          <StickyNote color="#FB923C" rotation={-0.08} />
        </group>
      </ChaosItem>

      <ChaosItem
        phase={phase}
        delay={0.5}
        flyDirection={[-0.5, 1, 0.2]}
        tooltip="3 клиента забыли про запись на этой неделе"
        position={[-0.35, 0.88, -0.7]}
      >
        <group onClick={handleInteraction}>
          <StickyNote color="#A78BFA" rotation={0.12} />
        </group>
      </ChaosItem>

      <ChaosItem
        phase={phase}
        delay={0.6}
        flyDirection={[1, 0.3, 0.8]}
        tooltip="До лимита 2.4 млн осталось... а сколько?"
        position={[0.9, 0.09, 0.85]}
      >
        <group rotation={[0, 0.4, 0]} onClick={handleInteraction}>
          <Envelope />
        </group>
      </ChaosItem>

      <ChaosItem
        phase={phase}
        delay={0.7}
        flyDirection={[-1, 0.5, 0.6]}
        tooltip="Ручной подсчёт — 40 минут каждый месяц"
        position={[-1.5, 0.09, 0.2]}
      >
        <group rotation={[0, -0.3, 0]} onClick={handleInteraction}>
          <Calculator />
        </group>
      </ChaosItem>

      <ChaosItem
        phase={phase}
        delay={0.8}
        flyDirection={[-1.2, 0.8, -0.3]}
        tooltip="70% практиков ведут базу в бумаге"
        position={[-1.2, 0.09, -0.5]}
      >
        <group rotation={[0, 0.25, 0]} onClick={handleInteraction}>
          <ClientFolder />
        </group>
      </ChaosItem>

      {/* Background: bookshelf */}
      <group position={[2.5, 0.8, -2.8]}>
        {/* Shelf board */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.2, 0.04, 0.25]} />
          <meshStandardMaterial color={C.woodDark} roughness={0.8} />
        </mesh>
        {/* Books */}
        {[
          { x: -0.4, h: 0.3, c: C.tealDark },
          { x: -0.25, h: 0.28, c: "#8B4513" },
          { x: -0.1, h: 0.35, c: C.coral },
          { x: 0.05, h: 0.26, c: "#4B5563" },
          { x: 0.2, h: 0.32, c: C.sage },
          { x: 0.35, h: 0.29, c: "#7C3AED" },
        ].map((book, i) => (
          <mesh key={i} position={[book.x, book.h / 2 + 0.02, 0]}>
            <boxGeometry args={[0.08, book.h, 0.18]} />
            <meshStandardMaterial color={book.c} roughness={0.8} />
          </mesh>
        ))}
      </group>

      {/* Certificate on wall (blurred rectangle) */}
      <group position={[-1.5, 1.5, -2.95]}>
        <mesh>
          <boxGeometry args={[0.5, 0.65, 0.02]} />
          <meshStandardMaterial color="#D4C5B0" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0, 0.012]}>
          <boxGeometry args={[0.42, 0.57, 0.003]} />
          <meshStandardMaterial color={C.warmWhite} roughness={0.95} />
        </mesh>
      </group>
    </>
  );
}

/* ═══════════════════════════════════════════════════
   Phase controls + Page wrapper
   ═══════════════════════════════════════════════════ */

export default function Scene3D() {
  const [manualPhase, setManualPhase] = useState<Phase | null>(null);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#F0EBE3" }}>
      <Canvas
        camera={{ position: [3, 2.5, 3.5], fov: 45 }}
        shadows
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.1;
        }}
      >
        <WorkspaceScene externalPhase={manualPhase} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 6}
          autoRotate={false}
        />
      </Canvas>

      {/* UI overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 8,
          fontFamily: "Onest, sans-serif",
        }}
      >
        {(["chaos", "cleanup", "mila"] as Phase[]).map((p) => (
          <button
            key={p}
            onClick={() => setManualPhase(p)}
            style={{
              padding: "8px 20px",
              borderRadius: 6,
              border: "1px solid #E5E7EB",
              background: "#fff",
              color: C.ink,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            {p === "chaos"
              ? "① Хаос"
              : p === "cleanup"
                ? "② Уборка"
                : "③ Мила.Практис"}
          </button>
        ))}
      </div>

      {/* Back link */}
      <a
        href="/"
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          fontFamily: "Onest, sans-serif",
          fontSize: 14,
          color: C.ink,
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "#fff",
          padding: "8px 16px",
          borderRadius: 6,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        ← На главную
      </a>
    </div>
  );
}
