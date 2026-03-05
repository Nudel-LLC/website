import { createClient } from "microcms-js-sdk";
import type { MicroCMSQueries } from "microcms-js-sdk";
import type { Service, Work } from "./types";

type Client = ReturnType<typeof createClient>;

let _client: Client | null = null;

function getClient(): Client {
  if (_client) return _client;

  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;

  if (!serviceDomain) {
    throw new Error("MICROCMS_SERVICE_DOMAIN が設定されていません");
  }
  if (!apiKey) {
    throw new Error("MICROCMS_API_KEY が設定されていません");
  }

  _client = createClient({ serviceDomain, apiKey });
  return _client;
}

/** microCMS の環境変数が設定されているかを返す */
export function isMicroCMSAvailable(): boolean {
  return !!(process.env.MICROCMS_SERVICE_DOMAIN && process.env.MICROCMS_API_KEY);
}

/** テスト用：シングルトンをリセットして次回呼び出し時に再初期化させる */
export function _resetClientForTesting(): void {
  _client = null;
}

/** サービス一覧取得（order昇順、未設定は末尾） */
export async function getServices(queries?: MicroCMSQueries) {
  return getClient().getList<Service>({
    endpoint: "services",
    queries: {
      orders: "order",
      limit: 100,
      ...queries,
    },
  });
}

/** スラッグでサービス1件取得 */
export async function getServiceBySlug(slug: string) {
  const data = await getClient().getList<Service>({
    endpoint: "services",
    queries: {
      filters: `slug[equals]${slug}`,
      limit: 1,
    },
  });
  return data.contents[0] ?? null;
}

/** サービスに紐づく実績一覧取得（order昇順、未設定は末尾） */
export async function getWorksByServiceId(
  serviceId: string,
  queries?: MicroCMSQueries,
) {
  return getClient().getList<Work>({
    endpoint: "works",
    queries: {
      filters: `service[equals]${serviceId}`,
      orders: "order",
      limit: 100,
      ...queries,
    },
  });
}
