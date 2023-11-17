import * as mod from "https://deno.land/std@0.119.0/hash/md5.ts";

const value = "ckczppom";

for (let i = 0; i < 1_000_000_000; i++) {
  const md5 = new mod.Md5();
  md5.update(`${value}${i}`);
  
  const hash = md5.toString('hex');

  if (hash.startsWith("00000")) {
    console.log(i);
    break;
  }
}