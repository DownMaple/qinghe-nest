import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm'
import { Injectable } from '@nestjs/common'

@EventSubscriber()
@Injectable()
export class EntitySubscriber implements EntitySubscriberInterface {


  listenTo() {
    // 你可以指定这个订阅者需要监听哪些实体的事件
    // 例如: return ['User', 'Post'];
    return 'any'; // 监听所有实体的事件
  }

  /**
   * 在实体插入之前调用。
   */
  beforeInsert(event: InsertEvent<any>) {
    console.log(`BEFORE ENTITY INSERTED: `, event.entity);
  }

  /**
   * 在实体更新之前调用。
   * @param event
   */
  beforeUpdate(event: UpdateEvent<any>): Promise<any> | void {
    console.log(`BEFORE ENTITY INSERTED: `, event.entity)
  }
}