# 金蝶管易ERP openAPI Node SDK

- [金蝶管易ERP openAPI 文档](https://vip.kingdee.com/article/310063754421419776?productLineId=3&isKnowledge=2)
- [使用 NodeJS 调用金蝶管易云 C-ERP 的 openAPI](https://atlassc.net/2022/11/18/guanyi-erp-openapi-with-nodejs)

## 使用

```ts
/**
 * 封装业务接口：调用店铺接口
 * 
 * https://vip.kingdee.com/article/308992849255546624
 * 
 * @param config
 * @param params
 * @throws {Error} 接口调用时发生传输层异常，需要从调用栈中捕获
 */
export async function gyErpShopGet(config: GuanyiCerpConfig, params: GyErpShopGetParam): Promise<GyErpShopGetResponse> {
  return cerpRequest({config, method: 'gy.erp.shop.get', params});
}

/**
 * 密钥配置结构
 */
export interface GuanyiCerpConfig {
  apiUrl: string;
  appkey: string;
  sessionkey: string;
  secret: string;
}

```
