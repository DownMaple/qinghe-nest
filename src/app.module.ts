import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '@/auth/auth.module'
import { APP_FILTER, APP_GUARD } from '@nestjs/core'
import { jwtAuthGuard } from '@/common/public/jwt-auth.grard'
import { DatabaseExceptionFilter } from '@/common/filter/all-exception.filter'
import { ArticleModule } from '@/article/article.module'
import { BannerModule } from '@/banner/banner.module'
import { ArticleClassModule } from '@/article-class/article-class.module'
import { ClassifyModule } from '@/classify/classify.module'
import { EnterpriseModule } from './enterprise/enterprise.module';
import { VipModule } from './vip/vip.module';
import { DictionaryModule } from './dictionary/dictionary.module';

import { configuration } from '@/common/config/configuration'
configuration.getTypeORMConfig()
/**
 *   host: '82.157.29.198', // 主机名
 *   port: 3306, // 端口
 *   username: 'tmp', // 用户名
 *   password: 'Tmp123#@!', // 密码
 */

@Module({
  // imports: [
  //   TypeOrmModule.forRoot({
  //     type: 'mysql', // 数据库类型
  //     host: 'localhost', // 主机名
  //     port: 3306, // 端口
  //     username: 'root', // 用户名
  //     password: 'root', // 密码
  //     database: 'project_test', // 数据库名称
  //     synchronize: true,
  //     retryDelay: 500, //重试连接数据库间隔
  //     retryAttempts: 10,//重试连接数据库的次数
  //     autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
  //   }),
  //   AuthModule,
  //   BannerModule,
  //   ArticleModule,
  //   ArticleClassModule,
  //   ClassifyModule,
  //   EnterpriseModule,
  //   VipModule,
  //   DictionaryModule,
  // ],
  imports:[TypeOrmModule.forRoot(configuration.getTypeORMConfig()),
      AuthModule,
      BannerModule,
      ArticleModule,
      ArticleClassModule,
      ClassifyModule,
      EnterpriseModule,
      VipModule,
      DictionaryModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: jwtAuthGuard,
    }, {
      provide: APP_FILTER,
      useClass: DatabaseExceptionFilter,
    }],
})
export class AppModule {
}
