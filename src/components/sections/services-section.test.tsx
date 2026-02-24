import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServicesSection } from "./services-section";
import type { Service } from "@/lib/microcms/types";

const mockServices: Service[] = [
  {
    id: "service-1",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    publishedAt: "2024-01-01T00:00:00.000Z",
    revisedAt: "2024-01-01T00:00:00.000Z",
    title: "動画制作",
    slug: "video-production",
    description: "高品質な動画を制作します",
    icon: ["video"],
    image: { url: "https://example.com/video.jpg", height: 600, width: 800 },
  },
  {
    id: "service-2",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    publishedAt: "2024-01-01T00:00:00.000Z",
    revisedAt: "2024-01-01T00:00:00.000Z",
    title: "ライティング",
    slug: "writing",
    description: "魅力的な記事を執筆します",
    icon: ["pen"],
    image: { url: "https://example.com/writing.jpg", height: 600, width: 800 },
  },
];

describe("ServicesSection", () => {
  it("セクションが描画される", () => {
    const { container } = render(<ServicesSection services={mockServices} />);
    expect(container.querySelector("#services")).toBeInTheDocument();
  });

  it("全てのサービスカードが表示される", () => {
    render(<ServicesSection services={mockServices} />);
    expect(screen.getByText("動画制作")).toBeInTheDocument();
    expect(screen.getByText("ライティング")).toBeInTheDocument();
  });

  it("サービス説明文が表示される", () => {
    render(<ServicesSection services={mockServices} />);
    expect(screen.getByText("高品質な動画を制作します")).toBeInTheDocument();
    expect(screen.getByText("魅力的な記事を執筆します")).toBeInTheDocument();
  });

  it("空のサービス配列でもクラッシュしない", () => {
    expect(() =>
      render(<ServicesSection services={[]} />),
    ).not.toThrow();
  });

  it("全てのサービスに詳細ページリンクが生成される", () => {
    render(<ServicesSection services={mockServices} />);
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/services/video-production");
    expect(hrefs).toContain("/services/writing");
  });
});
