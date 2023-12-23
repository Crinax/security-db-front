import { ElNotification } from "element-plus";
import type { VNode } from "vue";

export const showError = (vnodeOrMessage: VNode | string) => {
  return ElNotification({
    message: vnodeOrMessage,
    position: 'bottom-right',
    type: 'error'
  })
}
