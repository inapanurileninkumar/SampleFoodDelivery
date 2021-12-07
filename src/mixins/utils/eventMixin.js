import { EventBus } from "../../eventBus";
import { promiseMixin } from "./promiseMixin";

export const eventMixin = {
  mixins: [promiseMixin],
  methods: {
    emitGlobalSignal: function (action, payload = null, timeout = null) {
      let resolvablePromise = this.getResolvablePromise();
      EventBus.$emit(action, resolvablePromise, payload);
      if (timeout) {
        Promise.race([
          resolvablePromise["promise"],
          new Promise((_r, rej) => setTimeout(rej, timeout)),
        ]);
      }
      return resolvablePromise["promise"];
    },
    addGlobalEventListener: function (eventName, handler) {
      EventBus.$on(eventName, handler);
    },
    addGlobalEventListeners: function (eventListeners) {
      for (let [eventName, handler] of Object.entries(eventListeners)) {
        this.addGlobalEventListener(eventName, handler);
      }
    },
    removeGlobalEventListener: function (eventName, handler = null) {
      if (handler) {
        EventBus.$off(eventName, handler);
      } else {
        EventBus.$off(eventName);
      }
    },
    removeGlobalEventListeners: function (eventListeners) {
      for (let [eventName, handler] of Object.entries(eventListeners)) {
        this.removeGlobalEventListener(eventName, handler);
      }
    },
    emitGlobalEvent: function (eventName, payload) {
      EventBus.$emit(eventName, payload);
    },
    emitEvent: function (action, payload) {
      this.$emit("event-emitted", action, payload);
    },
  },
};
