import sa from 'superagent';
import cryptoJS from 'crypto-js';

/**
 * 密钥配置结构
 */
export interface GuanyiCerpConfig {
  apiUrl: string;
  appkey: string;
  sessionkey: string;
  secret: string;
}

/**
 * 金蝶管易云C-ERP API 客户端
 * @param config 密钥配置
 * @param method 接口方法
 * @param params 业务参数
 * @throws {Error} 接口调用时发生传输层异常
 */
export async function cerpRequest({config, method, params}: {
  config: GuanyiCerpConfig,
  method: string, params: any
}): Promise<any> {
  const {appkey, sessionkey, secret, apiUrl} = config;
  // 构造签名前的请求参数
  const data = {
    appkey, sessionkey, method,
    ...params,
  };
  // 签名并将签名结果放入请求参数
  data.sign = sign(JSON.stringify(data), secret);
  // 发送请求，请求时发生的传输层异常会被抛出
  const {text} = await sa.post(apiUrl).send(data);
  // 解析并返回响应结果，可能包含业务功能错误信息
  return Promise.resolve(JSON.parse(text));
}

/**
 * 签名
 * 拼接密钥和请求参数，然后进行MD5加密
 * @param str
 * @param secret
 */
export function sign(str: string, secret: string): string {
  return encryptByMD5(`${secret}${str}${secret}`);
}

export function encryptByMD5(data: any): string {
  return cryptoJS.MD5(data).toString().toUpperCase();
}
