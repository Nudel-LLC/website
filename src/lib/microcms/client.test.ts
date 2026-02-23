import { describe, it, expect, vi, beforeEach } from "vitest";

// microcms-js-sdk をモック
const mockGetList = vi.fn();
vi.mock("microcms-js-sdk", () => ({
  createClient: () => ({
    getList: mockGetList,
  }),
}));

// 環境変数を設定
vi.stubEnv("MICROCMS_SERVICE_DOMAIN", "test-domain");
vi.stubEnv("MICROCMS_API_KEY", "test-api-key");

import {
  getServices,
  getServiceBySlug,
  getWorksByServiceId,
  _resetClientForTesting,
} from "./client";

describe("microCMS client", () => {
  beforeEach(() => {
    mockGetList.mockReset();
    // テスト間でシングルトンが残留しないようにリセット
    _resetClientForTesting();
  });

  describe("getServices", () => {
    it("order昇順でサービス一覧を取得する", async () => {
      const mockData = {
        contents: [{ id: "1", title: "Test Service" }],
        totalCount: 1,
        offset: 0,
        limit: 100,
      };
      mockGetList.mockResolvedValue(mockData);

      const result = await getServices();

      expect(mockGetList).toHaveBeenCalledWith({
        endpoint: "services",
        queries: { orders: "order", limit: 100 },
      });
      expect(result).toEqual(mockData);
    });

    it("追加クエリを渡せる", async () => {
      mockGetList.mockResolvedValue({ contents: [], totalCount: 0, offset: 0, limit: 10 });

      await getServices({ limit: 10 });

      expect(mockGetList).toHaveBeenCalledWith({
        endpoint: "services",
        queries: { orders: "order", limit: 10 },
      });
    });
  });

  describe("getServiceBySlug", () => {
    it("スラッグでサービスを1件取得する", async () => {
      const mockService = { id: "1", title: "Test", slug: "test" };
      mockGetList.mockResolvedValue({
        contents: [mockService],
        totalCount: 1,
        offset: 0,
        limit: 1,
      });

      const result = await getServiceBySlug("test");

      expect(mockGetList).toHaveBeenCalledWith({
        endpoint: "services",
        queries: { filters: "slug[equals]test", limit: 1 },
      });
      expect(result).toEqual(mockService);
    });

    it("見つからない場合はnullを返す", async () => {
      mockGetList.mockResolvedValue({
        contents: [],
        totalCount: 0,
        offset: 0,
        limit: 1,
      });

      const result = await getServiceBySlug("non-existent");

      expect(result).toBeNull();
    });
  });

  describe("getWorksByServiceId", () => {
    it("サービスIDで実績一覧を取得する", async () => {
      const mockData = {
        contents: [{ id: "w1", title: "Work 1" }],
        totalCount: 1,
        offset: 0,
        limit: 100,
      };
      mockGetList.mockResolvedValue(mockData);

      const result = await getWorksByServiceId("service-1");

      expect(mockGetList).toHaveBeenCalledWith({
        endpoint: "works",
        queries: {
          filters: "service[equals]service-1",
          orders: "order",
          limit: 100,
        },
      });
      expect(result).toEqual(mockData);
    });
  });
});
