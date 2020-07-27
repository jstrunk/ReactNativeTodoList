import RNSimpleCrypto from "react-native-simple-crypto";

export default async function (text: string): Promise<string> {
  return await RNSimpleCrypto.SHA.sha1(text + global.performance.now().toString());
}