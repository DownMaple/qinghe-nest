import { configDotenv } from 'dotenv'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { RedisOptions } from 'ioredis'

console.log([__dirname + '/../**/*.entity{.ts,.js}'])
// 根据 NODE_ENV 环境变量动态选择 .env 文件
const envPath = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
let { parsed } = configDotenv({path: envPath ?? '.env'})
class MyConfiguration {


  /**
   * TypeORM 配置
   */
  public getTypeORMConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: parsed['MYSQL_HOST'],
      port: parseInt(parsed['MYSQL_PORT'], 10) || 5432,
      username: parsed['MYSQL_USER'],
      password: parsed['MYSQL_PASSWORD'],
      database:  parsed['MYSQL_DATABASE'],
      synchronize: true,
      retryDelay: 500, //重试连接数据库间隔
      retryAttempts: 10,//重试连接数据库的次数
      autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    }
  }


  /**
   * Redis 配置
   */
  public getRedisConfig(): RedisOptions {
    return {
      host: parsed['REDIS_HOST'],
      port: parseInt(parsed['REDIS_PORT'], 10) || 6379,
      password: parsed['REDIS_PASSWORD'],
      db: parseInt(parsed['REDIS_DB'], 10) || 0,
      connectTimeout: 5000,
    }
  }

}

const configuration = new MyConfiguration()


export { configuration }