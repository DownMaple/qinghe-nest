import Ioredis from 'ioredis'
import { configuration } from '@/common/config/configuration'

const ioredis = new Ioredis(configuration.getRedisConfig())
ioredis.on("error", (err) => {
  console.error("redis 连接错误:", err);
});
ioredis.on("connect", () => {
  console.log("redis:连接成功")
})
const setRedisString = (key:string, value:string , seconds : string|number = '') => {
  if (seconds !== '') {
    return ioredis.setex(key, seconds , value)
  } else {
    return ioredis.set(key, value)
  }
}


const getRedisString = (key:string) => {
  return ioredis.get(key)
}

// 添加元素到集合
const redisSadd = (key:string, array: [string|number]) => {
  return ioredis.sadd(key,...array)
}

// 从集合中移除元素
const redisSrem = (key:string, array: [string|number]) => {
  return ioredis.srem(key,...array)
}

// 检查元素是否存在于集合中
const redisSismember = (key:string, value:string) => {
  return ioredis.sismember(key, value)
}

// 获取集合中的所有元素
const redisSmembers = (key:string) => {
  return ioredis.smembers(key)
}



export {
  setRedisString,
  getRedisString,
  redisSadd,
  redisSrem,
  redisSismember,
  redisSmembers
}