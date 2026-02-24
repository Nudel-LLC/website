import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceCard } from "./service-card";
import type { Service } from "@/lib/microcms/types";

/** テスト用のサービスデータ */
const mockService: Service = {
  id: "service-1",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  publishedAt: "2024-01-01T00:00:00.000Z",
  revisedAt: "2024-01-01T00:00:00.000Z",
  title: "動画制作",
  slug: "video-production",
  description: "高品質な動画コンテンツを制作します",
  icon: ["video"],
  image: {
    url: "https://example.com/image.jpg",
    height: 600,
    width: 800,
  },
};

describe("ServiceCard", () => {
  it("サービスタイトルが表示される", () => {
    render(<ServiceCard service={mockService} index={0} />);
    expect(screen.getByText("動画制作")).toBeInTheDocument();
  });

  it("サービス説明文が表示される", () => {
    render(<ServiceCard service={mockService} index={0} />);
    expect(
      screen.getByText("高品質な動画コンテンツを制作します"),
    ).toBeInTheDocument();
  });

  it("サービス詳細ページへのリンクが正しい", () => {
    render(<ServiceCard service={mockService} index={0} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/services/video-production");
  });

  it("サービス画像が表示される", () => {
    render(<ServiceCard service={mockService} index={0} />);
    const img = screen.getByAltText("動画制作");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  it('"Details" テキストが表示される', () => {
    render(<ServiceCard service={mockService} index={0} />);
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
  });

  it("icon が未設定の場合もクラッシュしない", () => {
    const serviceWithoutIcon: Service = { ...mockService, icon: [] };
    expect(() =>
      render(<ServiceCard service={serviceWithoutIcon} index={0} />),
    ).not.toThrow();
  });

  it("index に応じたコンテンツが変わらない（index は delay にのみ影響）", () => {
    const { unmount } = render(<ServiceCard service={mockService} index={0} />);
    expect(screen.getByText("動画制作")).toBeInTheDocument();
    unmount();

    render(<ServiceCard service={mockService} index={3} />);
    expect(screen.getByText("動画制作")).toBeInTheDocument();
  });
});
