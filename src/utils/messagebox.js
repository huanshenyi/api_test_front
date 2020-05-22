import {MessageBox} from "element-ui";

class ATMessagebox {
  constructor() {}
  confirm(params = {}) {
    const message = params.message || "実行しますか？";
    const confirmCallback = params.confirmCallback || null;
    const cancelCallback = params.cancelCallback || null;
    const type = params.type || "warning";
    MessageBox.confirm(message, "info", {
      confirmButtonText: '実 行',
      cancelButtonText: 'キャンセル',
      type: type
    }).then(() => {
      if (confirmCallback) {
        confirmCallback()
      }
    }).catch(() => {
      if (cancelCallback) {
        cancelCallback()
      }
    })
  }
}

export default new ATMessagebox();
