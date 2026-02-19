import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// motion/react をモック（アニメーション要素を通常のHTML要素に変換）
vi.mock("motion/react", () => {
  const motion = new Proxy(
    {},
    {
      get: (_target, prop: string) => {
        return ({
          children,
          ...props
        }: { children?: React.ReactNode } & Record<string, unknown>) => {
          const filteredProps: Record<string, unknown> = {};
          for (const [key, value] of Object.entries(props)) {
            if (
              !key.startsWith("initial") &&
              !key.startsWith("animate") &&
              !key.startsWith("exit") &&
              !key.startsWith("transition") &&
              !key.startsWith("whileHover") &&
              !key.startsWith("whileTap") &&
              !key.startsWith("whileInView") &&
              !key.startsWith("viewport") &&
              key !== "variants" &&
              key !== "layout" &&
              key !== "layoutId"
            ) {
              filteredProps[key] = value;
            }
          }
          const { createElement } = require("react");
          return createElement(prop, filteredProps, children);
        };
      },
    },
  );

  return {
    motion,
    AnimatePresence: ({ children }: { children?: React.ReactNode }) =>
      children,
  };
});

// next/image → <img> タグに変換
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { createElement } = require("react");
    return createElement("img", props);
  },
}));

// next/link → <a> タグに変換
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: { children?: React.ReactNode; href: string } & Record<
    string,
    unknown
  >) => {
    const { createElement } = require("react");
    return createElement("a", { href, ...props }, children);
  },
}));
